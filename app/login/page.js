"use client";

import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingIndicators from "@/components/LoadingIndicators";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleInputChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", credentials);

      if (res.data.success) {
        setLoading(false);
        router.push("/profile");
        toast({
          title: "Login Succefully",
          description: `hey there! Welcome back to Chatify.`,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-fit min-h-screen bg-slate-900">
      <div className="m-auto w-4/5 md:border-r-2 border-white my-20 md:my-auto md:w-[60%] lg:w-[45%] sm:p-3 md:p-5 flex flex-col h-fit md:min-h-screen md:bg-slate-950 md:bg-opacity-70">
        <div className="animate-slideRight h-[80%] md:ml-10 my-auto md:w-[80%] lg:w-[70%]">
          <header className="mb-10 text-white">
            <h1 className="text-5xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 mt-2">To</p>
            <h2 className="text-5xl font-bold mt-2">
              Chatify<span className="text-purple-500">.</span>
            </h2>
            <p className="text-sm text-purple-200 mt-1">
              Not a member?{" "}
              <Link href="/signup" className="text-purple-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <Link
              href="/"
              className="text-purple-600 underline hover:no-underline text-sm"
            >
              <span className="text-sm font-bold">GO BACK</span>
            </Link>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="w-full bg-slate-800 bg-opacity-70 flex items-center gap-3 px-4 py-3 rounded-lg">
              <input
                type="text"
                name="username"
                placeholder="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
              <FiUser className="w-5 h-5 text-gray-500" />
            </div>
            <div className="my-5 w-full bg-slate-800 bg-opacity-70 flex items-center gap-3 px-4 py-3 rounded-lg">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
              {isPasswordVisible ? (
                <FiEye
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FiEyeOff
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button
              type="submit"
              className="text-white w-full bg-purple-700 flex justify-center items-center rounded-lg h-10 p-2 py-3"
            >
              {loading ? <LoadingIndicators /> : "Login"}
            </button>
          </form>
          <div className="flex justify-center items-center gap-4 my-8">
            <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
            <p className="text-sm text-gray-300">OR</p>
            <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
          </div>
        </div>
      </div>
      <div className="hidden md:inline-block flex-1"></div>
    </div>
  );
};
export default Login;
