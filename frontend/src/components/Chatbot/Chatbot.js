import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowUp, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ───────────────────────────── helpers ───────────────────────────── */

/**
 * Render a message string that may contain:
 *   - Markdown links  [text](url)
 *   - **bold**
 *   - Line-breaks (\n)
 *   - List items (- item / * item)
 */
function renderMessageContent(content, isUser = false, onNavigate = null) {
  if (!content) return null;

  const linkClass = isUser
    ? "underline text-[#FEF8E6] hover:opacity-80"
    : "text-[#510609] font-medium underline underline-offset-2 hover:text-brand-navy transition-colors";

  // Split on markdown link pattern, bold, or newlines
  const parts = content.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\n)/g);

  return parts.map((part, i) => {
    // Markdown link
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, text, url] = linkMatch;
      const isInternal =
        url.startsWith("/") || url.includes("ecellbphc.in");

      const handleClick = (e) => {
        if (isInternal && onNavigate) {
          e.preventDefault();
          let path = url;
          if (url.includes("ecellbphc.in")) {
            try {
              path = new URL(url).pathname;
            } catch {
              path = url.replace(/https?:\/\/(www\.)?ecellbphc\.in/, "");
            }
          }
          onNavigate(path || "/");
        }
      };

      return (
        <a
          key={i}
          href={url}
          onClick={handleClick}
          className={linkClass}
          {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {text}
        </a>
      );
    }

    // Bold
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return <strong key={i} className="font-semibold">{boldMatch[1]}</strong>;
    }

    // Newline
    if (part === "\n") return <br key={i} />;

    // List items (- or *)
    if (/^[-*]\s/.test(part)) {
      return (
        <span key={i} className="block pl-3 my-0.5 before:content-['•'] before:mr-1.5 before:text-brand-navy/60">
          {part.replace(/^[-*]\s/, "")}
        </span>
      );
    }

    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/* ──────────────────────── typing indicator ───────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="px-4 py-3 rounded-[16px_16px_16px_4px] bg-[#f5f5f0]">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <motion.span
              key={idx}
              className="block w-1.5 h-1.5 rounded-full bg-brand-navy/50"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: idx * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── quick suggestions ──────────────────────── */

const QUICK_SUGGESTIONS = [
  "Founder's First Mentorship",
  "Community Meet",
  "What is Launchpad?",
  "Ground Reality registration",
  "How to contact E-Cell",
];

/* ─────────────────────── welcome message ─────────────────────────── */

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm the E-Cell concierge. Ask me anything about our events, programs, Founder's First mentorship, or how to get involved!",
};

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Rate-limiting cooldown state
  const lastSendTimeRef = useRef(0);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  // Resizing state
  const [dimensions, setDimensions] = useState({
    width: 430,
    height: 590,
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const isResizingRef = useRef(false);
  const resizeOriginRef = useRef({
    startX: 0,
    startY: 0,
    startW: 430,
    startH: 590,
    direction: "",
  });

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  /* ─── auto-scroll inside chat window only ─── */
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  /* ─── focus input when window opens ─── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ─── Edge Drag-to-Resize Logic ─── */
  const startResizing = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    setIsMaximized(false);

    resizeOriginRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: dimensions.width,
      startH: dimensions.height,
      direction,
    };

    const handleMouseMove = (moveEvent) => {
      if (!isResizingRef.current) return;
      const { startX, startY, startW, startH, direction: dir } =
        resizeOriginRef.current;
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Generous resizing limits:
      // Minimum: 360px width, 440px height
      // Maximum: up to 850px width, 850px height (or screen boundary)
      const minW = 360;
      const maxW = Math.min(850, window.innerWidth - 36);
      const minH = 440;
      const maxH = Math.min(850, window.innerHeight - 120);

      let nextW = startW;
      let nextH = startH;

      // Pinned to bottom-right, so dragging LEFT increases width, dragging UP increases height
      if (dir === "left" || dir === "corner") {
        nextW = Math.max(minW, Math.min(maxW, startW - deltaX));
      }
      if (dir === "top" || dir === "corner") {
        nextH = Math.max(minH, Math.min(maxH, startH - deltaY));
      }

      setDimensions({ width: nextW, height: nextH });
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  /* ─── Toggle Maximize Mode ─── */
  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  /* ─── Isolated Wheel / Scroll Handler (Never scrolls page) ─── */
  const handleMessagesWheel = (e) => {
    e.stopPropagation();
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const delta = e.deltaY;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent scroll chaining to the homepage when hitting the ends
    if ((delta < 0 && isAtTop) || (delta > 0 && isAtBottom)) {
      e.preventDefault();
    }
  };

  /* ─── send message with rate limiting ─── */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || isLoading) return;

      // Client-side rate-limit: minimum 1.5 seconds between messages
      const now = Date.now();
      if (now - lastSendTimeRef.current < 1500) {
        setRateLimitMessage("Please pause a moment before sending another message.");
        setTimeout(() => setRateLimitMessage(""), 2500);
        return;
      }
      lastSendTimeRef.current = now;

      // Hide chips after first user message
      setShowSuggestions(false);

      const userMsg = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        // Build history (prior conversation, excluding client welcome greeting)
        const history = messages
          .filter((m) => m && m.content && m !== WELCOME_MESSAGE)
          .slice(-10)
          .map(({ role, content }) => ({ role, content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          if (errData && errData.error) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: `⚠️ ${errData.error}` },
            ]);
            return;
          }
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.reply ??
              data.message ??
              data.response ??
              "Hmm, I didn't get a proper response. Try again?",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I couldn't reach the server right now. If running locally, make sure your backend is running and `GEMINI_API_KEY` is configured in `.env`.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Compute active dimensions
  const activeWidth = isMaximized
    ? Math.min(780, window.innerWidth - 36)
    : dimensions.width;
  const activeHeight = isMaximized
    ? Math.min(800, window.innerHeight - 120)
    : dimensions.height;

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <>
      {/* ─── chat window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            style={{
              width: `${activeWidth}px`,
              height: `${activeHeight}px`,
              overscrollBehavior: "contain",
            }}
            className="fixed z-[9998] flex flex-col
                       bottom-[96px] right-6
                       max-sm:!left-3 max-sm:!right-3 max-sm:!w-auto max-sm:!bottom-20 max-sm:!h-[75vh]
                       rounded-[22px] bg-white
                       border border-brand-navy/[0.12]
                       shadow-[0_25px_50px_-12px_rgba(15,23,84,0.3)]
                       overflow-hidden select-text"
          >
            {/* ── Drag Resize Handles (desktop) ── */}
            {/* Top edge handle */}
            <div
              onMouseDown={startResizing("top")}
              title="Drag up/down to resize"
              className="hidden sm:block absolute top-0 left-8 right-16 h-2 cursor-ns-resize z-40 group"
            >
              <div className="w-12 h-1 bg-white/25 rounded-full mx-auto mt-0.5 group-hover:bg-white/60 transition-colors" />
            </div>

            {/* Left edge handle */}
            <div
              onMouseDown={startResizing("left")}
              title="Drag left/right to resize"
              className="hidden sm:block absolute top-8 bottom-6 left-0 w-2.5 cursor-ew-resize z-40 group"
            >
              <div className="w-1 h-12 bg-black/10 rounded-full my-auto ml-0.5 group-hover:bg-brand-navy/40 transition-colors" />
            </div>

            {/* Top-Left Corner handle */}
            <div
              onMouseDown={startResizing("corner")}
              title="Drag corner to resize both width and height"
              className="hidden sm:flex absolute top-0 left-0 w-7 h-7 cursor-nwse-resize z-50 items-center justify-center group"
            >
              <span className="w-2.5 h-2.5 rounded-tl-md border-t-2 border-l-2 border-brand-cream/40 group-hover:border-brand-cream transition-colors" />
            </div>

            {/* ── header ── */}
            <div className="flex items-center justify-between px-4 h-14 bg-brand-navy rounded-t-[20px] shrink-0 border-b border-brand-cream/10 select-none">
              <div className="flex items-center gap-2.5 pl-2">
                <span className="block w-2.5 h-2.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                <div>
                  <span className="text-brand-cream text-sm font-semibold font-syne tracking-wide block leading-none">
                    E-Cell Concierge
                  </span>
                  <span className="text-brand-cream/60 text-[10px] font-copy tracking-wider uppercase block mt-0.5">
                    BITS Pilani Hyderabad
                  </span>
                </div>
              </div>

              {/* Action buttons (Maximize & Close) */}
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMaximize}
                  title={isMaximized ? "Restore size" : "Expand size"}
                  aria-label={isMaximized ? "Restore size" : "Expand size"}
                  className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-cream hover:bg-white/10 transition-colors"
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-cream hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── messages area (isolated scroll) ── */}
            <div
              ref={messagesContainerRef}
              role="log"
              aria-live="polite"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={handleMessagesWheel}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FCFBF8] overscroll-contain
                         scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
              style={{
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
                scrollbarColor: "#e5e5e5 transparent",
              }}
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const isFirstBot =
                  msg.role === "assistant" &&
                  (idx === 0 || messages[idx - 1]?.role !== "assistant");

                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[85%]">
                      {/* label */}
                      {isFirstBot && (
                        <span className="block text-[11px] text-gray-400 mb-1 ml-1 font-copy">
                          E-Cell Concierge
                        </span>
                      )}

                      {/* bubble */}
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`px-3.5 py-2.5 text-sm leading-relaxed font-copy break-words ${
                          isUser
                            ? "bg-brand-navy text-brand-cream rounded-[16px_16px_4px_16px] shadow-sm"
                            : "bg-[#F3EFE6] text-brand-ink rounded-[16px_16px_16px_4px] border border-black/5"
                        }`}
                      >
                        {renderMessageContent(msg.content, isUser, navigate)}
                      </motion.div>
                    </div>
                  </div>
                );
              })}

              {/* typing indicator */}
              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* ── rate-limit notification toast ── */}
            <AnimatePresence>
              {rateLimitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 py-1.5 bg-brand-maroon text-brand-cream text-xs text-center font-copy font-medium"
                >
                  {rateLimitMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── quick suggestion chips ── */}
            {showSuggestions && (
              <div
                data-lenis-prevent="true"
                className="flex gap-2 px-4 py-2.5 overflow-x-auto border-t border-[#f0f0ec] bg-white shrink-0"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                }}
              >
                {QUICK_SUGGESTIONS.map((text) => (
                  <button
                    key={text}
                    onClick={() => sendMessage(text)}
                    className="whitespace-nowrap rounded-full border border-brand-navy/20
                               px-3 py-1.5 text-xs text-brand-navy font-copy font-medium
                               bg-brand-cream/40 hover:bg-brand-navy hover:text-brand-cream
                               transition-all shrink-0"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}

            {/* ── input area ── */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#f0f0ec] bg-white rounded-b-[20px] shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask about events, mentorship, registration..."
                aria-label="Type your message"
                className="flex-1 min-w-0 bg-transparent text-sm font-copy text-brand-ink
                           placeholder:text-gray-400 outline-none disabled:opacity-50"
              />

              {/* send button */}
              <AnimatePresence>
                {input.trim().length > 0 && (
                  <motion.button
                    key="send"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    onClick={() => sendMessage()}
                    disabled={isLoading}
                    aria-label="Send message"
                    className="flex items-center justify-center w-9 h-9 rounded-full
                               bg-brand-navy text-brand-cream hover:bg-brand-maroon hover:shadow-md
                               transition-all disabled:opacity-50 shrink-0"
                  >
                    <ArrowUp size={16} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── floating toggle button ─── */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed z-[9999] bottom-6 right-6
                   w-14 h-14 max-sm:w-12 max-sm:h-12
                   flex items-center justify-center rounded-full
                   bg-brand-navy text-brand-cream
                   border border-brand-cream/20
                   shadow-[0_8px_24px_-6px_rgba(15,23,84,0.45)]
                   hover:shadow-[0_12px_28px_-6px_rgba(15,23,84,0.65)]
                   hover:scale-105 active:scale-95
                   transition-all duration-200"
      >
        {!isOpen && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-brand-cream border-2 border-brand-navy animate-pulse" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
