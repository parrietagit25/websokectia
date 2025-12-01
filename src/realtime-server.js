import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const PORT = process.env.PORT || 3000;

// Servidor HTTP simple para evitar errores
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running 🚀");
});

// Crear WebSocket server sobre HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔵 Nuevo cliente conectado");

  ws.send("👋 Bienvenido al servidor WebSocket!");

  ws.on("message", (msg) => {
    console.log("📩 Mensaje recibido:", msg.toString());
    ws.send("Echo: " + msg);
  });

  ws.on("close", () => console.log("🔴 Cliente desconectado"));
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log("🚀 Servidor WebSocket en puerto:", PORT);
});
