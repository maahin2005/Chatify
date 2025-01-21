"use client";

import React from "react";
import { IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { chatMsgs } from "@/utils/letschat/chatMsgs";
import ChatMsgs from "./ChatMsgs";
import SendMsgForm from "./SendMsgForm";
interface MainChatSectionProps {
  hideMainChatFunc?: () => void;
}

const MainChatSection: React.FC<MainChatSectionProps> = ({
  hideMainChatFunc,
}) => {
  return (
    <div className="bg-chatSection-bg-light w-full h-screen grid grid-rows-[80px_auto_min-content] ">
      {/* Header */}
      <div className="flex justify-between items-center bg-chatSection-bg-med px-8 z-30">
        <IoMdArrowRoundBack
          className="text-3xl md:hidden z-30"
          onClick={hideMainChatFunc}
        />
        <h1 className="text-3xl z-30">Friend Name</h1>
        <div className="flex gap-10 text-2xl">
          <IoVideocam />
          <HiDotsVertical />
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="bg-chatSection-bg-dark overflow-y-scroll px-8 z-20"
        style={{ scrollbarWidth: "none" }}
      >
        <div>
          {chatMsgs?.map((el: any) => (
            <ChatMsgs msg={el} key={el.id} />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="self-end sticky w-full bottom-0">
        <SendMsgForm />
      </div>
    </div>
  );
};

export default MainChatSection;
