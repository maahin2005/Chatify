"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const SendMsgForm = ({ recipientId, setChatMsgs }) => {
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState("");
  const socketRef = useRef(null);

  const handleInputChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMsg = (e) => {
    e.preventDefault();

    if (socketRef.current && msg.trim()) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          from: userId,
          to: recipientId,
          message: msg,
        })
      );

      setChatMsgs((prev) => [
        ...prev,
        { content: msg, senderId: userId, receiverId: recipientId },
      ]);
      setMsg("");
    }
  };

  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const response = await fetch(`/api/messages?recipientId=${recipientId}&userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setChatMsgs(data.messages);
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    const localData = localStorage.getItem("profileId");

    if (localData) {
      const parsedData = JSON.parse(localData);
      setUserId(parsedData);
    }

    const ws = new WebSocket("ws://localhost:4000");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected.");
      if (localData) {
        const parsedData = JSON.parse(localData);
        ws.send(JSON.stringify({ type: "register", userId: parsedData }));
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      setChatMsgs((prev) => [
        ...prev,
        { content: data.message, senderId: data.from, receiverId: data.to },
      ]);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);

    ws.onclose = () => console.log("WebSocket disconnected.");

    if (recipientId && userId) {
      fetchMessageHistory();
    }

    return () => {
      ws.close();
    };
  }, [recipientId, userId]);

  return (
    <form onSubmit={handleSendMsg}>
      <div className="bg-chatSection-bg-dark min-h-20 h-fit flex items-center gap-5 border-t-2 border-white px-8">
        <IoDocumentAttach
          className="text-2xl hover:text-chatSection-bg-light cursor-pointer transition-transform transform hover:scale-110"
          title="Attach Document"
          aria-label="Attach Document"
        />
        <MdEmojiEmotions
          className="text-2xl hover:text-chatSection-bg-light cursor-pointer transition-transform transform hover:scale-110"
          title="Insert Emoji"
          aria-label="Insert Emoji"
        />
        <textarea
          value={msg}
          onChange={handleInputChange}
          className="bg-transparent w-full max-h-40 h-10 outline-none text-white placeholder-gray-400 px-4 py-2 rounded-md border border-transparent focus:border-chatSection-bg-light resize-none overflow-auto transition-colors duration-200 scrollbar-hide"
          placeholder="Type a message..."
          aria-label="Type a message"
          style={{ scrollbarWidth: "none" }}
        ></textarea>
        <button
          type="submit"
          className="text-2xl hover:text-chatSection-bg-light cursor-pointer transition-transform transform hover:scale-110"
          title="Send Message"
          aria-label="Send Message"
          disabled={!msg}
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendMsgForm;
