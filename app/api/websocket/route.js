import websocketServer from "../../../websocketServer";

export const GET = async (req, res) => {
  if (!res.socket.server.websocketServer) {
    res.socket.server.websocketServer = websocketServer;

    res.socket.server.on("upgrade", (request, socket, head) => {
      websocketServer.handleUpgrade(request, socket, head, (ws) => {
        websocketServer.emit("connection", ws, request);
      });
    });

    console.log("WebSocket server initialized");
  }

  res.end();
};
