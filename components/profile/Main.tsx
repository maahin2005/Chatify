"use client";

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { addProfileData } from "@/lib/features/profile/profileSlice";
import NotificationList from "../Notifications/NotificationList"

function Main() {
  const { toast } = useToast();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const profileData = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/users/me");
      if (res.data.success) {
        setUserData(res?.data?.data);
        dispatch(addProfileData(res?.data?.data))
        localStorage.setItem("profileId",JSON.stringify(res?.data?.data?.id))
        setLoading(false);
        toast({
          title: `Hello ${
            res?.data?.data.firstName + " " + res?.data?.data.lastName
          } Welcome to the Profile of Chatify`,
          description:
            "Click on start chat button to start conversations freely",
        });
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      toast({
        title: "Oops! Error while fetching your profile data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <>
    <div className="w-full flex justify-center items-center">
      <div className="flex justify-between items-center w-full">
        {loading ? (
          <Skeleton className="w-4/5 m-auto md:w-1/2  text-center h-[400px] p-5 my-14" />
        ) : (
          <div className="w-4/5 m-auto md:w-1/2  text-center shadow-md p-5 my-14">
            <h1 className="text-6xl text-gray-800 mb-4 font-kanit font-medium tracking-wide">
              Hello! {userData?.firstName} {userData?.lastName} <br />
            </h1>
            <h2 className="text-3xl text-purple-900 my-5 font-spaceGro">
              @{userData?.username}
            </h2>
            <h2 className="text-xl text-purple-900 my-5 font-spaceGro">
              Your varified email:{" "}
              <span className="font-semibold">{userData?.email}</span>
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
        )}
      </div>
    </div>
    <NotificationList />
    </>
  );
}

export default Main;
