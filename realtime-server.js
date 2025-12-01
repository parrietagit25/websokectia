// realtime-server.js
const http = require("http");
const { WebSocketServer } = require("ws");

const port = process.env.PORT || 8080;

// Servidor HTTP básico (para que Render tenga algo que servir en "/")
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running.\n");
});

// Crear WebSocketServer usando el mismo servidor HTTP
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("✔ Cliente conectado");

  ws.on("message", (message) => {
    console.log("📩 Mensaje recibido:", message.toString());
    ws.send("Echo: " + message.toString());
  });

  ws.on("close", () => {
    console.log("❌ Cliente desconectado");
  });
});

server.listen(port, () => {
  console.log("🚀 Server listening on port", port);
});
