import React from "react";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-[500px]">
      <div className="flex justify-between items-center w-full">
        <div className=" animate-slideDown w-4/5 m-auto md:w-1/2  text-center">
          <h1 className="text-6xl text-gray-800 mb-4 font-kanit font-medium tracking-wide">
            Start chatting with anyone, anytime, with <br />
          </h1>
          <h2 className="text-8xl text-purple-900 my-5 font-spaceGro">
            Chatify
          </h2>
          <p className="text-base lg:text-lg text-purple-900  mb-5 w-3/4 m-auto tracking-wide">
            Great software that allows you to chat from any place at any time
            without any interruption.
          </p>
          <Link href="/letschat">
            <button className=" px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg">
              Start Chatting Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
