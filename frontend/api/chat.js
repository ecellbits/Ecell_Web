/**
 * Vercel Serverless Function — /api/chat
 *
 * Handles POST requests from the E-Cell chatbot frontend.
 * Uses Google Gemini 2.0 Flash with function calling (tools) to answer
 * questions about E-Cell BITS Pilani Hyderabad Campus.
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { toolDeclarations, executeFunction } = require("./_lib/knowledge");

// ── System instruction ──────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are the E-Cell BITS Pilani Hyderabad Campus virtual concierge. You help visitors navigate the E-Cell website and find information about events, programs, teams, and initiatives.

Guidelines:
- Be friendly, concise, and helpful. Use a warm but professional tone.
- Always provide relevant page links when applicable (format as markdown links).
- If you don't know something, say so honestly rather than making things up.
- Keep responses brief (2-4 sentences) unless the user asks for details.
- When mentioning events or programs, include registration links if available.
- The website base URL is https://www.ecellbphc.in
- You can use the available tools to look up specific information about events, programs, team, etc.
- Do NOT use markdown headers (# or ##) in responses. Use bold text instead for emphasis.
- When listing items, use bullet points or numbered lists sparingly.`;

// ── CORS helper ─────────────────────────────────────────────────────────────

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ── Rate limiter ────────────────────────────────────────────────────────────
// In-memory sliding window rate limiter:
// Allows up to 10 requests per minute per IP, with a 1.5s minimum gap between requests.
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 10; // max 10 requests per minute
  const MIN_INTERVAL_MS = 1500; // minimum 1.5 seconds between requests

  let record = rateLimitMap.get(ip);
  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(ip, record);
  }

  // Filter timestamps to only keep those within the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);

  // Check burst interval
  if (record.timestamps.length > 0) {
    const lastTimestamp = record.timestamps[record.timestamps.length - 1];
    if (now - lastTimestamp < MIN_INTERVAL_MS) {
      return {
        limited: true,
        reason: "You're sending messages too fast. Please pause for a moment.",
        retryAfterSec: Math.ceil((MIN_INTERVAL_MS - (now - lastTimestamp)) / 1000),
      };
    }
  }

  // Check window count
  if (record.timestamps.length >= MAX_REQUESTS) {
    const oldest = record.timestamps[0];
    const waitTime = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return {
      limited: true,
      reason: `Message limit reached (10 messages/minute). Please wait ${waitTime}s before sending another message.`,
      retryAfterSec: waitTime,
    };
  }

  // Record this request
  record.timestamps.push(now);

  // Periodically clean up old entries to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      val.timestamps = val.timestamps.filter((t) => now - t < WINDOW_MS);
      if (val.timestamps.length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { limited: false };
}

// ── Main handler ────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  // CORS headers on every response
  setCorsHeaders(res);

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // Rate limit check
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "local-user";

  const rateCheck = checkRateLimit(clientIp);
  if (rateCheck.limited) {
    res.setHeader("Retry-After", String(rateCheck.retryAfterSec || 2));
    return res.status(429).json({ error: rateCheck.reason });
  }

  // Validate API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error("GEMINI_API_KEY is not configured.");
    return res.status(500).json({
      error: "GEMINI_API_KEY is not set. Please add your Google Gemini API key to the .env file.",
    });
  }

  // Parse & validate request body
  const { message, history } = req.body || {};
  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "A non-empty 'message' string is required." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Active models for this API key in order of availability:
    const DEFAULT_CANDIDATES = [
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-flash-lite-latest",
      "gemini-2.5-pro",
    ];

    const userModel = process.env.GEMINI_MODEL;
    const candidateModels = userModel
      ? [userModel, ...DEFAULT_CANDIDATES.filter((m) => m !== userModel)]
      : DEFAULT_CANDIDATES;

    const chatHistory = buildHistory(history);

    async function attemptChat(modelName) {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: toolDeclarations }],
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      const chat = model.startChat({ history: chatHistory });
      let result = await chat.sendMessage(message);
      let response = result.response;

      const MAX_TOOL_ROUNDS = 5;
      let round = 0;

      while (round < MAX_TOOL_ROUNDS) {
        const candidate = response.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        const fnCalls = parts.filter((p) => p.functionCall);
        if (fnCalls.length === 0) break;

        const functionResponseParts = fnCalls.map((part) => {
          const { name, args } = part.functionCall;
          const fnResult = executeFunction(name, args);
          return {
            functionResponse: {
              name,
              response: { content: fnResult },
            },
          };
        });

        result = await chat.sendMessage(functionResponseParts);
        response = result.response;
        round++;
      }

      return response.text() || "Sorry, I couldn't generate a response right now.";
    }

    // Fast 8-second timeout per model so users never experience long hangs
    async function attemptChatWithTimeout(modelName, timeoutMs = 8000) {
      return Promise.race([
        attemptChat(modelName),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  `Model ${modelName} timed out after ${timeoutMs}ms`
                )
              ),
            timeoutMs
          )
        ),
      ]);
    }

    let reply = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        reply = await attemptChatWithTimeout(modelName);
        if (reply) {
          lastError = null;
          break;
        }
      } catch (modelErr) {
        lastError = modelErr;
        const msg = (modelErr.message || "").toLowerCase();

        // If it's an API key / auth error, abort immediately
        const isAuthError =
          modelErr.status === 401 ||
          modelErr.status === 403 ||
          msg.includes("api_key_invalid") ||
          msg.includes("api key not valid");

        if (isAuthError) {
          throw modelErr;
        }

        // For all other errors (503 Service Unavailable / high demand, 404, 429 Quota, timeouts, network issues):
        // Automatically try the next candidate model!
        console.warn(
          `Model ${modelName} encountered error: ${modelErr.message}. Trying next fallback model...`
        );
        continue;
      }
    }

    if (!reply && lastError) {
      throw lastError;
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);

    const errMsg = err.message || "";
    // Surface user-friendly messages for common errors
    if (errMsg.includes("API key not valid") || errMsg.includes("API_KEY_INVALID") || errMsg.includes("API key")) {
      return res.status(401).json({
        error: "Invalid Google Gemini API key. Please check your key from Google AI Studio (https://aistudio.google.com/app/apikey).",
      });
    }
    if (err.status === 429 || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
      return res
        .status(429)
        .json({ error: "Gemini quota or rate limit reached. Please try again shortly." });
    }

    return res
      .status(500)
      .json({ error: `Gemini error: ${errMsg || "Something went wrong. Please try again later."}` });
  }
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Convert the frontend history array into the format expected by
 * Gemini's Chat API.
 *
 * Frontend sends: [{ role: "user" | "assistant", content: string }]
 * Gemini expects:  [{ role: "user" | "model",    parts: [{ text }] }]
 */
function buildHistory(history) {
  if (!Array.isArray(history) || history.length === 0) return [];

  const formatted = [];
  for (const msg of history) {
    if (!msg || !msg.content || typeof msg.content !== "string") continue;
    const role =
      msg.role === "assistant" || msg.role === "model" ? "model" : "user";

    // Gemini history MUST start with role: 'user'
    if (formatted.length === 0 && role === "model") {
      continue;
    }

    // Merge consecutive messages with the same role to maintain strict alternation
    if (formatted.length > 0 && formatted[formatted.length - 1].role === role) {
      formatted[formatted.length - 1].parts[0].text += `\n${msg.content}`;
    } else {
      formatted.push({
        role,
        parts: [{ text: msg.content }],
      });
    }
  }

  // If history ends with a 'user' message, remove it because
  // chat.sendMessage(message) will send the current user message!
  if (formatted.length > 0 && formatted[formatted.length - 1].role === "user") {
    formatted.pop();
  }

  return formatted;
}
