"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Loader2, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { registerSchema } from "@/utils/zod"
import gmxLogo from '../../../public/image/logoVerticalReverse.png'
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { API_URL } from "../../../common"
import { useLoginModal } from "@/lib/context/AuthContext";

type FormData = {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
};

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { openLoginModal } = useLoginModal();

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    getValues,
  } = useForm<FormData>();

  const [cookies, setCookie] = useCookies(["user", "accesstoken"]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data); // Debugging: Log form data
    try {
      const response = await axios.post(`${API_URL.BASE_URL}auth/register/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.tokens?.access && response.data?.user) {
        toast.success("Registration successful");

        let userData = {
          ...response.data.user,
          accesstoken: response.data.tokens.access,
          refreshToken: response.data.tokens.refresh,
        };

        // Store user data and tokens in cookies
        setCookie("user", JSON.stringify(userData), {
          path: "/",
          maxAge: 2592000,
          secure: true,
          sameSite: "strict",
        });

        // Store tokens in local storage (optional)
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        // window.location.replace('/dashboard')
      } else {
        console.error("Invalid response from server:", response.data);
        toast.error("Registration failed: Invalid response from server.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        console.log("Registration failed:", error.response?.data);
        toast.error(`Registration failed: ${error.response?.data.message || "Unknown error"}`);
      } else {
        // Handle other errors
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // Validate password
  const validateConfirmPassword = (value: string) => {
    const password = getValues("password"); // Get the value of the `password` field
    return value === password || "Passwords do not match";
  };

  console.log("Form Errors:", errors); // Debugging: Log form errors

  return (
    <div className="w-full max-w-md p-8 backdrop-blur-xl bg-black/90 rounded-xl border border-white/10 shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Image
          src={gmxLogo}
          alt="GMX Logo"
          className="h-16 w-28 animate-fadeIn"
          priority
        />
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-gray-400 text-sm text-center">
          Join GMX Tickets and start your journey with us
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <div className="relative group">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 animate-slideIn">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-slideIn">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 animate-slideIn">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirm" className="text-white">
            Confirm Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="password_confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("password_confirm", {
                required: "Please confirm your password",
                validate: validateConfirmPassword,
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password_confirm && (
              <p className="text-red-500 text-sm mt-1 animate-slideIn">
                {errors.password_confirm.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#e30045] hover:bg-[#e30045]/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#e30045]/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={openLoginModal}
          className="text-[#e30045] hover:text-[#e30045]/80 font-medium transition-colors duration-300 focus:outline-none hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};