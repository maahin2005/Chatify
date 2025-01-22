"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatMsgs from "./ChatMsgs";
import SendMsgForm from "./SendMsgForm";
import { useSelector } from "react-redux";

interface MainChatSectionProps {
  hideMainChatFunc?: () => void;
}

const MainChatSection: React.FC<MainChatSectionProps> = ({
  hideMainChatFunc,
}) => {
  const receiver = useSelector((state:any)=>state.receiver)
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  
  return (
    <div className="bg-chatSection-bg-light w-full h-screen grid grid-rows-[80px_auto_min-content]">
      <div className="flex justify-between items-center bg-chatSection-bg-med px-8 z-30">
        <IoMdArrowRoundBack
          className="text-3xl md:hidden z-30"
          onClick={hideMainChatFunc}
        />
        <h1 className="text-3xl z-30">{receiver?.username ?? "Select User"}</h1>
      </div>

      <div
        className="bg-chatSection-bg-dark overflow-y-scroll px-8 z-20"
        style={{ scrollbarWidth: "none" }}
      >
        <div>
          {chatMsgs?.map((el: any) => (
            <ChatMsgs msg={el} key={el.id} />
          ))}
        </div>
        {chatMsgs.length===0 &&<div className="h-3/4 w-full text-center flex justify-center items-center">
        <h1 className="text-3xl font-kanit">No any chats yet</h1>
        </div>}
      </div>

      <div className="self-end sticky w-full bottom-0">
        {receiver?.userId && (
          <SendMsgForm recipientId={receiver?.userId} setChatMsgs={setChatMsgs} />
        )}
      </div>
    </div>
  );
};

export default MainChatSection;
