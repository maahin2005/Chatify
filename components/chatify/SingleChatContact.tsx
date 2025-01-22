import Image from "next/image";
import React from "react";

interface ChatContactProps {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };

  toggleFunc: Function;
}
const SingleChatContact: React.FC<ChatContactProps> = ({
  data,
  toggleFunc,
}: any) => {
  return (
    <div
      className="flex cursor-pointer justify-between w-full h-fit min-h-20 items-center px-5 text-gray-300 border-b border-chatSection-bg-dark hover:bg-chatSection-bg-dark"
      onClick={() => toggleFunc(data.id, data.username)}
    >
      <div className="flex gap-10 items-center">
        <div>
          <Image
            src={"https://randomuser.me/api/portraits/lego/2.jpg"}
            alt={data.firstName}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <h1 className="text-lg font-spaceGro">
          {data.firstName} {data.lastName}
        </h1>
      </div>
      <h1 className="text-sm font-kanit text-left">@{data.username}</h1>
    </div>
  );
};

export default SingleChatContact;
