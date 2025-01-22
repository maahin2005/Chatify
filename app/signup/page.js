"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoadingIndicators from "@/components/LoadingIndicators";

function Signup() {
  const { toast } = useToast();
  const router = useRouter();
  const [isUniqueUsername, setIsUniqueUsername] = useState(true);
  const [otpSendLoading, setOtpSendLoading] = useState(false);
  const [otpSendVarLoading, setOtpSendVarLoading] = useState(false);
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [isUniqueEmail, setIsUniqueEmail] = useState(true);
  const [emails, setEmails] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUsernames = async () => {
    try {
      const res = await axios.get("/api/users/avail/usernames");

      setUsernames(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchEmails = async () => {
    try {
      const res = await axios.get("/api/users/avail/emails");

      setEmails(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendOTP = async () => {
    if (!formData.email) {
      toast({
        title: "Enter your Email",
        description: "Enter your email for varification",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email Format",
        description: "Please enter a valid email address",
      });
      return;
    }
    setOtpSendLoading(true);
    try {
      const res = await axios.post("/api/otp/send", { email: formData.email });

      if (res.data.success) {
        setIsOTPSend(true);
        setOtpSendLoading(false);
        toast({
          title: "OTP has been sending",
          description: "Please check your inbox of entered email.",
        });
      }
    } catch (error) {
      console.log(error.message);
      setOtpSendLoading(false);
      toast({
        title: "Failed to send OTP, Please try again",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const varifyEmail = async () => {
    if (!formData.email || !OTP) {
      toast({
        title: "Enter your Email and OTP",
        description: "Enter your email and OTP for varification",
      });
      return;
    }
    setOtpSendVarLoading(true);
    try {
      const res = await axios.post("/api/otp/check", {
        email: formData.email,
        otp: OTP,
      });

      if (res.data.success) {
        setIsEmailVerified(true);
        setOtpSendVarLoading(false);
        toast({
          title: "OTP has been verified",
          description: "Great! Yout Email has been verified. GO Ahead!",
        });
      }
    } catch (error) {
      console.log(error.message);
      setOtpSendVarLoading(false);
      toast({
        title: "Failed to varify OTP, Please try again",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const varifyUniqueCredentials = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (emails.includes(value)) {
        setIsUniqueEmail(false);
      } else {
        setIsUniqueEmail(true);
      }
    }

    if (name === "username") {
      if (usernames.includes(value)) {
        setIsUniqueUsername(false);
      } else {
        setIsUniqueUsername(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("api/users/signup", formData);

      if (res.data.success) {
        setLoading(false);
        toast({
          title: "Account has been created Succefully",
          description: "hey there! Thanks for Joining Chatify.",
        });
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast({
        title: "Oops! Error while creating your account",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEmails();
    fetchUsernames();
  }, []);
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
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              <input
                type="text"
                className="p-2 bg-slate-100 outline-none border-0 rounded-md w-full"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Last Name"
                type="text"
                className="p-2 bg-slate-100 outline-none border-0 rounded-md w-full"
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`p-2 flex items-center bg-slate-100 rounded-md ${
                !isUniqueEmail ? "border border-red-600 bg-red-200" : "border-0"
              }`}
            >
              <input
                placeholder="Email"
                type="email"
                disabled={isEmailVerified}
                className={`flex-1 bg-transparent outline-none border-0`}
                name="email"
                onChange={(e) => {
                  handleChange(e);
                  varifyUniqueCredentials(e);
                }}
                required
              />
              <button
                className={`text-sm w-20 font-semibold  justify-between ${
                  !isUniqueEmail ||
                  !formData.email ||
                  isOTPSend ||
                  isEmailVerified
                    ? "text-slate-500"
                    : "text-blue-600 underline hover:no-underline"
                }`}
                disabled={
                  !isUniqueEmail ||
                  !formData.email ||
                  isOTPSend ||
                  isEmailVerified
                }
                onClick={sendOTP}
              >
                {isOTPSend && !otpSendLoading
                  ? "OTP sent"
                  : otpSendLoading
                  ? "sending.."
                  : "send otp"}
              </button>
            </div>
            {!isUniqueEmail && (
              <p className="m-0 p-0 text-sm text-slate-500 text-left">
                Email is already in used. use another or try to login.
              </p>
            )}
            <div className={`p-2 flex items-center bg-slate-100 rounded-md`}>
              <input
                placeholder="Enter OTP"
                type="text"
                className={`flex-1 bg-transparent outline-none border-0`}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
              <button
                className={`text-sm w-20 font-semibold  justify-between ${
                  !isUniqueEmail ||
                  !formData.email ||
                  !isOTPSend ||
                  isEmailVerified
                    ? "text-slate-500"
                    : "text-blue-600 underline hover:no-underline"
                }`}
                disabled={
                  !isUniqueEmail ||
                  !formData.email ||
                  !isOTPSend ||
                  isEmailVerified
                }
                onClick={varifyEmail}
              >
                {isEmailVerified && !otpSendVarLoading
                  ? "Verified"
                  : otpSendVarLoading
                  ? "hold on.."
                  : "varify"}
              </button>
            </div>
            <input
              placeholder="Username"
              type="string"
              className={`p-2 bg-slate-100 outline-none rounded-md ${
                !isUniqueUsername
                  ? "border border-red-600 bg-red-200"
                  : "border-0"
              }`}
              name="username"
              onChange={(e) => {
                handleChange(e);
                varifyUniqueCredentials(e);
              }}
              required
            />
            {!isUniqueUsername && (
              <p className="m-0 p-0 text-sm text-slate-500 text-left">
                Oops! Username is not available. Think something else.
              </p>
            )}
            <input
              placeholder="Password"
              type="password"
              className="p-2 bg-slate-100 outline-none border-0 rounded-md"
              name="password"
              onChange={handleChange}
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-purple-800 hover:bg-purple-700 text-white p-2 rounded-md"
            >
              {loading ? <LoadingIndicators /> : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
