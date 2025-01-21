"use client";

import React, { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const SendMsgForm: React.FC = () => {
  const [msg, setMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
  };

  const handleSendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.trim() === "") return;
    console.log("Message sent:", msg); // Replace with actual send logic
    alert(msg);
    setMsg("");
  };

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
