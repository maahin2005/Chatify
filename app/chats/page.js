import React from "react";
// import Chat from "@/components/chats/Chat";
import ContactsChatList from "@/components/chatify/ContactsChatList";
import MainChatSection from "@/components/chatify/MainChatSection";

function page() {
  return (
    <div className="min-h-screen">
      <div className="flex h-full text-slate-300">
        <div className="w-full md:w-[40%] lg:w-[30%]">
          <ContactsChatList />
        </div>
        <div className="hidden md:inline-block lg:w-[70%] md:w-[60%] md:fixed md:left-[40%] lg:left-[30%]">
          <MainChatSection />
        </div>
      </div>
    </div>
  );
}

export default page;
