import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="h-20 py-3 flex items-center">
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <h1 className="font-kanit text-2xl sm:text-4xl tracking-wide text-purple-950">
            Chatify
          </h1>
        </Link>
        <div className="flex gap-3 items-center">
          <Link href="/login">
            <button className="px-5 text-purple-950 hover:bg-purple-100 rounded-md cursor-pointer p-2">
              Login
            </button>
          </Link>
          <Link href="/signup" className="hidden md:inline-block">
            <button className="px-5 hover:bg-purple-600 bg-purple-700 text-white rounded-md p-2">
              Start for free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
