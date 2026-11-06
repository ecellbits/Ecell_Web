const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  // Automatically parse JSON for /api/chat
  const express = require("express");
  app.use("/api/chat", express.json());

  app.post("/api/chat", async (req, res) => {
    // 1. Ensure environment variables from root .env and frontend/.env are loaded
    const loadEnvFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        content.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const idx = trimmed.indexOf("=");
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim();
            if (val) {
              process.env[key] = val;
            }
          }
        });
      }
    };

    loadEnvFile(path.resolve(__dirname, "../../.env"));
    loadEnvFile(path.resolve(__dirname, "../.env"));

    // 2. Delegate to the serverless function handler
    try {
      const handlerPath = path.resolve(__dirname, "../../api/chat.js");
      delete require.cache[require.resolve(handlerPath)];
      const handler = require(handlerPath);
      await handler(req, res);
    } catch (err) {
      console.error("Local dev /api/chat error:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });
};
