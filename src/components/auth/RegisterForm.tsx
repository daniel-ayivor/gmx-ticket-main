"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Loader2, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { registerSchema } from "@/utils/zod";
import {  BASE_URL } from "@/utils/api/authApi";
import gmxLogo from '../../../public/image/logoVerticalReverse.png'
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

type FormData = {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
};

export const RegisterForm = ({ onToggle }: { onToggle: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      const response = await axios.post(`${BASE_URL}auth/register/`, data, {
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
    <div className="w-full max-w-md p-8 backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center justify-center ">
        <Image src={gmxLogo} alt="" className="h-16 w-28" />
        <h2 className="text-xl font-bold text-white mb-6 text-center">Create Account</h2>

      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Username Field */}
        <div className="space-y-1">
          <Label htmlFor="username" className="text-white">
            User Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your user name"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>

        {/* First Name Field */}
        <div className="space-y-1">
          <Label htmlFor="first_name" className="text-white">
            First Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="first_name"
              type="text"
              placeholder="Enter your first name"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>
        </div>

        {/* Last Name Field */}
        <div className="space-y-1">
          <Label htmlFor="last_name" className="text-white">
            Last Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="last_name"
              type="text"
              placeholder="Enter your last name"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              {...register("last_name", {
                required: "Last name is required",
              })}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Password must contain at least one letter and one number",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <Label htmlFor="password_confirm" className="text-white">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password_confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 bg-white/10 border-white/20 mb-4 text-white placeholder:text-gray-400"
              {...register("password_confirm", {
                required: "Confirm password is required",
                validate: validateConfirmPassword,
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.password_confirm && <p className="text-red-500 text-sm">{errors.password_confirm.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-white hover:bg-white/70 text-black mt-2 transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
        </Button>
      </form>

      {/* Toggle to Login */}
      <p className="mt-6 text-center text-sm text-gray-300">
        Already have an account?{" "}
        <button onClick={onToggle} className="text-white hover:underline focus:outline-none">
          Sign in
        </button>
      </p>
    </div>
  );
};