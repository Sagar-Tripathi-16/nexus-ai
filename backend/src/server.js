
import "dotenv/config";
import express from "express";
import cors from "cors";
import { runAgent } from "./agent/agent.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NEXUS AI backend is running!"
  });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required."
      });
    }

    const reply = await runAgent(message.trim());

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your request."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`NEXUS AI backend running at http://localhost:${PORT}`);
});
