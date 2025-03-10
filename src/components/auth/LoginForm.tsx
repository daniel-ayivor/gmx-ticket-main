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
import { API_URL } from "../../../common"
import { useLoginModal } from "@/lib/context/AuthContext";

type FormData = {
  username: string; // Change from `email` to `username`
  password: string;
};

export const LoginForm = () => {
  const [cookies, setCookie] = useCookies(["user", "accesstoken"]);
  const [showPassword, setShowPassword] = useState(false);
  const { openRegisterModal } = useLoginModal();

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
      const response = await axios.post(
        `${API_URL.BASE_URL}auth/login/`,
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

      if (response.data?.access && response.data?.refresh) {
        const { access, refresh } = response.data;

        const res = await fetch(`${API_URL.BASE_URL}users/profile/`, {
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
        };

        setCookie("user", userData, {
          path: "/",
          maxAge: 2592000,
          secure: true,
          sameSite: "strict",
        });

        setCookie("accesstoken", access, {
          path: "/",
          maxAge: 2592000,
          secure: true,
          sameSite: "strict",
        });

        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 backdrop-blur-xl bg-black/90 rounded-xl border border-white/10 shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Image
          src={gmxLogo}
          alt="GMX Logo"
          className="h-16 w-28 animate-fadeIn"
          priority
        />
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-gray-400 text-sm text-center">
          Sign in to access your account and manage your tickets
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("username", {
                required: "Username is required",
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
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#e30045]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-[#e30045] focus:ring-[#e30045]/50"
              {...register("password", {
                required: "Password is required",
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

        <Button
          type="submit"
          className="w-full bg-[#e30045] hover:bg-[#e30045]/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#e30045]/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={openRegisterModal}
          className="text-[#e30045] hover:text-[#e30045]/80 font-medium transition-colors duration-300 focus:outline-none hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};