import Image from "next/image";
import React from "react";

interface ChatContactProps {
  data: {
    img: string;
    name: string;
    lastMsg: string;
    lastTime: string;
  };

  toggleFunc: Function;
}
const SingleChatContact: React.FC<ChatContactProps> = ({
  data,
  toggleFunc,
}: any) => {
  return (
    <div
      className="flex justify-between w-full h-fit min-h-20 items-center px-5 text-gray-300 border-b border-chatSection-bg-dark hover:bg-chatSection-bg-dark"
      onClick={toggleFunc}
    >
      <div className="flex gap-10">
        <div>
          <Image
            src={data.img}
            alt={data.name}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        <div className="">
          <h1>{data.name}</h1>
          <p className="text-slate-500 md:text-xs lg:text-sm w-[100px] line-clamp-1 overflow-hidden">
            {data.lastMsg}
          </p>
        </div>
      </div>
      <div className="justify-self-end">
        <p className="text-slate-500 md:text-xs lg:text-sm">{data.lastTime}</p>
      </div>
    </div>
  );
};

export default SingleChatContact;
