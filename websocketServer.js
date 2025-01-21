const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 4000 });

console.log("WebSocket server running on ws://localhost:4000");

const clients = new Map();

server.on("connection", (socket) => {
  console.log("New connection established.");

  socket.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received:", data);

    if (data.type === "register") {
      clients.set(data.userId, socket);
      console.log(`User ${data.userId} registered.`);
    } else if (data.type === "message") {
      const recipientSocket = clients.get(data.to);
      if (recipientSocket) {
        recipientSocket.send(
          JSON.stringify({ from: data.from, message: data.message })
        );
      }
    }
  });

  socket.on("close", () => {
    for (const [userId, clientSocket] of clients.entries()) {
      if (clientSocket === socket) {
        clients.delete(userId);
        console.log(`User ${userId} disconnected.`);
      }
    }
  });
});
