// const WebSocket = require("ws");

// const server = new WebSocket.Server({ port: 4000 });

// console.log("WebSocket server running on ws://localhost:4000");

// const clients = new Map();

// server.on("connection", (socket) => {
//   console.log("New connection established.");

//   socket.on("message", (message) => {
//     try {
//       const data = JSON.parse(message);
//       console.log("Received:", data);

//       if (data.type === "register") {
//         if (data.userId) {
//           clients.set(data.userId, socket);
//           console.log(`User ${data.userId} registered.`);
//         } else {
//           console.error("Registration failed: userId is undefined.");
//         }
//       } else if (data.type === "message") {
//         const recipientSocket = clients.get(data.to);
//         if (recipientSocket) {
//           recipientSocket.send(
//             JSON.stringify({ from: data.from, message: data.message })
//           );
//         } else {
//           console.error(`Message delivery failed: User ${data.to} not found.`);
//         }
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   });

//   socket.on("close", () => {
//     for (const [userId, clientSocket] of clients.entries()) {
//       if (clientSocket === socket) {
//         clients.delete(userId);
//         console.log(`User ${userId} disconnected.`);
//       }
//     }
//   });

//   socket.on("error", (error) => {
//     console.error("WebSocket error:", error);
//   });
// });


const prisma = require('@/lib/db');

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    if (data.type === "message") {
      const recipientSocket = clients.get(data.to);

      // Save message and notification to the database
      const newMessage = await prisma.message.create({
        data: {
          content: data.message,
          senderId: data.from,
          receiverId: data.to,
        },
      });

      await prisma.notification.create({
        data: {
          user_id: data.to,
          message_id: newMessage.id,
        },
      });

      // Notify the recipient in real-time
      if (recipientSocket) {
        recipientSocket.send(
          JSON.stringify({
            type: "notification",
            message: data.message,
            senderId: data.from,
            messageId: newMessage.id,
          })
        );
      }
    }
  });
});
