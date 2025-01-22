"use client";

import Link from "next/link";
import React from "react";
import NotificationBell from './Notifications/NotificationBell';

function AuthNavbar() {
  return (
    <nav className="h-20 py-3 flex items-center md:px-20">
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <h1 className="font-kanit text-2xl sm:text-4xl tracking-wide text-purple-950">
            Chatify
          </h1>
        </Link>
        <div className="flex gap-3 items-center">
          <NotificationBell/>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
