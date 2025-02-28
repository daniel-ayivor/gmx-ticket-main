'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import gmxLogo from '../../../public/image/logoVerticalReverse.png'
import Image from "next/image";
import { BASE_URL } from "@/utils/api/authApi";
type FormData = {
  username: string; // Change from `email` to `username`
  password: string;
};

export const LoginForm = ({ onToggle }: { onToggle: () => void }) => {
  const [cookies, setCookie] = useCookies(["user", "accesstoken"]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      password: "password",
      username: "admin"
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    try {
      // Make the API request using Axios
      const response = await axios.post(
        `${BASE_URL}auth/login/`,
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Store user data and tokens in cookies
      if (response.data?.access && response.data?.refresh) {
        const { access, refresh } = response.data;

        console.log("Access token:", access);
        const res = await fetch(`${BASE_URL}users/profile/`, {
          headers: {
            accept: "application/json",
            Authorization: `${access}`,
          },
          credentials: 'include'

        });

        const user = await res.json();

        let userData = {
          ...user,
          access_token: access,
          refresh_token: refresh
        }

        // Store user data in cookies
        setCookie("user", userData, {
          path: "/",
          maxAge: 2592000, // 30 days
          secure: true,
          sameSite: "strict",
        });

        setCookie("accesstoken", access, {
          path: "/",
          maxAge: 2592000, // 30 days
          secure: true,
          sameSite: "strict",
        });

        // // Store tokens in local storage (optional)
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        // Redirect to the dashboard
        window.location.replace("/dashboard");
      } else {
        // show toast
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // if (axios.isAxiosError(error)) {
      //   // Handle Axios errors
      //   console.log("Login failed:", error.response?.data);
      //   toast.error(`Login failed: ${error.response?.data.message || "Unknown error"}`);
      // } else {

      //   console.error("Unexpected error:", error);
      //   alert("An unexpected error occurred.");
      // }
    }
  };

  return (
    <div className="w-full max-w-md p-8 backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center justify-center ">
        <Image src={gmxLogo} alt="" className="h-16 w-28" />
        <h2 className="text-xl font-bold text-white mb-6 mt-2">Welcome Back</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">
            User name
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your user name"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
              {...register("password", {
                required: "Password is required",
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-white hover:bg-white/90 text-black transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
        </Button>
      </form>

      {/* Toggle to Sign Up */}
      <p className="mt-6 text-center text-sm text-gray-300">
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-white hover:underline focus:outline-none">
          Sign up
        </button>
      </p>
    </div>
  );
};