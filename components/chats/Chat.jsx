"use client";

import { useEffect, useState } from "react";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [userId, setUserId] = useState(""); // Replace with dynamic user ID
  const [recipientId, setRecipientId] = useState(""); // Replace with dynamic recipient ID

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/api/websocket");
    setSocket(ws);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "register", userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, `${data.from}: ${data.message}`]);
    };

    return () => ws.close();
  }, [userId, recipientId]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(
        JSON.stringify({
          type: "message",
          from: userId,
          to: recipientId,
          message: input,
        })
      );
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Type a your userId"
      />
      <input
        type="text"
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="Type a friend userId"
      />
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
