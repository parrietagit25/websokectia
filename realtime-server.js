import express from "express";
import { WebSocketServer } from "ws";
import OpenAI from "openai";

const app = express();

// Render asigna el puerto en PORT
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log("🚀 Server listening on port", port);
});

// WebSocket server
const wss = new WebSocketServer({ server });

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("✔ Client connected");

  ws.on("message", async (data) => {
    console.log("📩 Received:", data.toString());

    // Example simple echo:
    ws.send("Echo: " + data.toString());
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});
