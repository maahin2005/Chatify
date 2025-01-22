"use client";

import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";

interface MsgChat {
  msg: { senderId: string; content: string; receiverId: string };
}

const ChatMsgs: React.FC<MsgChat> = ({ msg }) => {
  const [sId, setSId] = useState<string | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem("profileId");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setSId(parsedData);
    }
  }, []);
  const isUserMessage = msg.senderId === sId;

  return (
    <div className={`grid w-full my-5 min-h-12 h-fit `}>
      <div
        className={`max-w-[70%] w-fit
        ${isUserMessage ? "justify-self-end bg-blue-500 text-white" : "justify-self-start bg-gray-200 text-black"} rounded-md p-3`}
        >
        {/* {isUserMessage && <span className="text-xs inline-block text-left text-slate-200 mb-1 border-b-2 border-b-slate-200">You</span>} */}
        <p className="h-full">{msg.content}</p>
      </div>
    </div>
  );
};

export default ChatMsgs;
