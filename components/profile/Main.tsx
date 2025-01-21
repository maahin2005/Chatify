import Link from "next/link";
import React from "react";

function Main() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex justify-between items-center w-full">
        <div className="w-4/5 m-auto md:w-1/2  text-center shadow-md p-5 my-14">
          <h1 className="text-6xl text-gray-800 mb-4 font-kanit font-medium tracking-wide">
            Hello! Gojo Saturo <br />
          </h1>
          <h2 className="text-3xl text-purple-900 my-5 font-spaceGro">
            @username
          </h2>
          <h2 className="text-xl text-purple-900 my-5 font-spaceGro">
            Your varified email:{" "}
            <span className="font-semibold">email.com</span>
          </h2>
          <p className="text-base lg:text-lg text-purple-900  mb-5 w-3/4 m-auto tracking-wide">
            You can chat with all varified users of{" "}
            <span className="text-purple-600 font-semibold">Chatify </span>
            without any cost! #freely
          </p>
          <Link href="/chats">
            <button className=" px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg">
              Start Chats
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
