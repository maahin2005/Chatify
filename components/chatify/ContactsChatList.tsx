"use client";

import React, { useEffect } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SingleChatContact from "./SingleChatContact";
import { useState } from "react";
import MainChatSection from "./MainChatSection";
import Link from "next/link";
import axios from "axios";
import LoadingIndicators from "../LoadingIndicators";
import { useDispatch } from "react-redux";
import { addReceiver } from "@/lib/features/receiver/receiverSlice";
const ContactsChatList: React.FC = () => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const toggleSection = (userId: string, username: string) => {
    dispatch(addReceiver({userId,username}))
    setIsVisible(!isVisible);
  };

  const hideMainChatSection = () => {
    setIsVisible(!isVisible);
  };

  const getUsers = async () => {
    if (users.length > 0) {
      return;
    }
    try {
      const res = await axios.get("/api/users");
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-chatSection-bg-med flex flex-col">
      <div className="sticky top-0 z-0 ">
        <div className="flex justify-between bg-chatSection-bg-dark h-20 items-center px-5">
          <Link href="/dashboard">
            <h1 className="text-2xl">User Name</h1>
          </Link>
          <TfiMenuAlt className="text-2xl" />
        </div>
        <div className="w-full bg-chatSection-bg-med z-10 h-20 grid items-center">
          <div className="flex justify-center items-center bg-chatSection-bg-dark mx-5 px-3 m-auto rounded-md">
            <FaMagnifyingGlass />
            <input
              placeholder="search contacts and conversations"
              className="w-[90%] m-auto p-2 bg-transparent outline-none text-white"
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          isVisible ? "hidden md:block" : "block"
        } flex-1 max-h-[70%] overflow-y-scroll`}
        style={{ scrollbarWidth: "none" }}
      >
        {users?.length === 0 && <LoadingIndicators />}
        {users?.map((el): any => (
          <SingleChatContact data={el} key={el.id} toggleFunc={toggleSection} />
        ))}
      </div>

      <div
        className={`block md:hidden fixed top-0 right-0 h-full w-screen bg-gray-200 shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MainChatSection
          hideMainChatFunc={hideMainChatSection}
        />
      </div>
    </div>
  );
};

export default ContactsChatList;
