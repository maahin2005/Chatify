"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/users/signup", formData);

      console.log(res.data);

      if (res.data.success) {
        router.push("/chats");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="px-5 md:px-20">
        <Navbar />
      </div>
      <div className="flex justify-center items-center my-10 ">
        <div className="text-center rounded-md p-5 md:p-10 m-auto shadow-xl border-t-4 border-t-purple-800">
          <h1 className="text-3xl md:text-5xl font-spaceGro font-semibold mb-10">
            Create a new account
          </h1>
          <form className="grid gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <input
                type="text"
                className="p-2 bg-slate-100 outline-none border-0 rounded-md"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Last Name"
                type="text"
                className="p-2 bg-slate-100 outline-none border-0 rounded-md"
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
            <input
              placeholder="Email"
              type="email"
              className="p-2 bg-slate-100 outline-none border-0 rounded-md"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              placeholder="Enter OTP"
              type="number"
              className="p-2 bg-slate-100 outline-none border-0 rounded-md"
              required
            />
            <input
              placeholder="Username"
              type="string"
              className="p-2 bg-slate-100 outline-none border-0 rounded-md"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="p-2 bg-slate-100 outline-none border-0 rounded-md"
              name="password"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-700 text-white p-2 rounded-md"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
