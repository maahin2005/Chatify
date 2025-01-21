import React from "react";

interface msgChat {
  msg: { id: number; message: "string"; self: number };
}
const ChatMsgs: React.FC<msgChat> = ({ msg }) => {
  return (
    <div className={`grid w-full my-5 min-h-12 h-fit`}>
      <div
        className={`h-fit max-w-[70%] w-fit bg-chatSection-bg-light rounded-md p-3 ${
          msg.self === 1 ? "justify-self-end" : "justify-self-start"
        }`}
      >
        <p className="h-full">{msg.message}</p>
      </div>
    </div>
  );
};

export default ChatMsgs;
