
// components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authFormImage from "../../../public/images/authform.png";

type AuthType = "signin" | "signup" | "forgot-password" | "reset-password";

interface AuthFormProps {
  type: AuthType;
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const titles: Record<AuthType, string> = {
    signin: "Sign in",
    signup: "Create account",
    "forgot-password": "Forgot password",
    "reset-password": "Reset password",
  };

  const buttonLabels: Record<AuthType, string> = {
    signin: "Sign In",
    signup: "Sign Up",
    "forgot-password": "Send Reset Link",
    "reset-password": "Reset Password",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    switch (type) {
      case "signin": {
        const payload = { username, password, keepSignedIn };
        console.log("Sign In payload:", payload);
        break;
      }
      case "signup": {
        const payload = { username, email, password, confirmPassword };
        console.log("Sign Up payload:", payload);
        break;
      }
      case "forgot-password": {
        const payload = { email };
        console.log("Forgot Password payload:", payload);
        break;
      }
      case "reset-password": {
        const payload = { password, confirmPassword };
        console.log("Reset Password payload:", payload);
        break;
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in (mock)");
  };

  const handleAppleSignIn = () => {
    console.log("Apple sign in (mock)");
  };

  return (
    <div className="h-full bg-white flex items-center justify-center p-4 md:p-8 lg:p-14">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-stretch">
          {/* Logo - Top Left */}
            <div className="self-start mb-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/53e632b8476eade06866657efdcc6db41f6774ea?width=56"
                alt="Logo"
                className="w-8 h-10 lg:w-10 lg:h-12 object-contain"
              />
            </div>
        {/* Left Side - Form */}
        <div className="flex-1 bg-white p-6 lg:p-8 flex flex-col justify-center items-center mt-10">
          <div className="w-full max-w-[400px] flex flex-col gap-8">
          

            {/* Header */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-black leading-[150%]">
                {titles[type]}
              </h1>
              <p className="text-sm lg:text-base font-normal text-gray-500 leading-[150%]">
                {type === "signin" || type === "signup"
                  ? "Welcome back! Sign in to continue."
                  : type === "forgot-password"
                  ? "Enter the email to receive reset instructions."
                  : "Set your new password below."}
              </p>
            </div>

            {/* Actual Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username for signin/signup */}
              {(type === "signin" || type === "signup") && (
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-1 text-sm font-medium text-black leading-[150%]">
                    Username
                    <span className="text-ylore-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="h-14 px-4 py-3 rounded-full bg-ylore-background-fill text-base font-medium text-gray-500 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-ylore-blue transition-all"
                    required
                  />
                </div>
              )}

              {/* Email for signup and forgot-password */}
              {(type === "signup" || type === "forgot-password") && (
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-1 text-sm font-medium text-black leading-[150%]">
                    Email
                    <span className="text-ylore-error">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-14 px-4 py-3 rounded-full bg-ylore-background-fill text-base font-medium text-gray-500 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-ylore-blue transition-all"
                    required
                  />
                </div>
              )}

              {/* Password field (not shown for forgot-password) */}
              {type !== "forgot-password" && (
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-1 text-sm font-medium text-black leading-[150%]">
                    Password
                    <span className="text-ylore-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full h-14 px-4 py-3 pr-12 rounded-full bg-ylore-background-fill text-base font-medium text-gray-500 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-ylore-blue transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-ylore-text-primary transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M3 9.75C4.57594 11.7009 7.46531 14.25 12 14.25C16.5347 14.25 19.4241 11.7009 21 9.75"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 15.7504L18.8081 11.915"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password for signup & reset-password */}
              {(type === "signup" || type === "reset-password") && (
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-1 text-sm font-medium text-black leading-[150%]">
                    Confirm password
                    <span className="text-ylore-error">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="h-14 px-4 py-3 rounded-full bg-ylore-background-fill text-base font-medium text-gray-500 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-ylore-blue transition-all"
                    required
                  />
                </div>
              )}

              {/* Keep Signed In & Forgot link (only when signin) */}
              {type === "signin" && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setKeepSignedIn((k) => !k)}
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                        keepSignedIn
                          ? "bg-ylore-blue"
                          : "bg-ylore-background-fill border border-gray-300"
                      }`}
                    >
                      {keepSignedIn && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5595 4.24727L5.55953 11.2473C5.5189 11.288 5.47065 11.3202 5.41754 11.3422C5.36442 11.3643 5.30749 11.3756 5.25 11.3756C5.1925 11.3756 5.13557 11.3643 5.08246 11.3422C5.02935 11.3202 4.9811 11.288 4.94047 11.2473L1.87797 8.18477C1.79588 8.10268 1.74976 7.99134 1.74976 7.87524C1.74976 7.75915 1.79588 7.6478 1.87797 7.56571C1.96006 7.48362 2.0714 7.4375 2.1875 7.4375C2.3036 7.4375 2.41494 7.48362 2.49703 7.56571L5.25 10.3192L11.9405 3.62821C12.0226 3.54612 12.1339 3.5 12.25 3.5C12.3661 3.5 12.4774 3.54612 12.5595 3.62821C12.6416 3.7103 12.6877 3.82165 12.6877 3.93774C12.6877 4.05384 12.6416 4.16518 12.5595 4.24727Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-black leading-[150%]">
                      Keep me signed in
                    </span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-normal text-gray-500 underline hover:text-black transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="h-12 px-4 rounded-full bg-ylore-blue text-black text-lg font-semibold shadow-[0_0_8px_0_#DDE6E8] hover:bg-opacity-90 transition-all leading-[150%] mt-2"
              >
                {buttonLabels[type]}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs font-medium text-gray-500">
                  OR
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 h-auto py-3 px-4 rounded-full bg-ylore-background-fill shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-opacity-80 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_google)">
                    <path
                      d="M9.99985 8.18164V12.0544H15.3817C15.1453 13.2998 14.4361 14.3544 13.3725 15.0635L16.618 17.5817C18.5089 15.8363 19.5998 13.2726 19.5998 10.2272C19.5998 9.51812 19.5362 8.83623 19.418 8.18175L9.99985 8.18164Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M4.39557 11.9033L3.6636 12.4636L1.07265 14.4818C2.7181 17.7454 6.09057 20 9.99963 20C12.6996 20 14.9632 19.1091 16.6178 17.5818L13.3723 15.0636C12.4814 15.6636 11.345 16.0273 9.99963 16.0273C7.39965 16.0273 5.19062 14.2728 4.39966 11.9091L4.39557 11.9033Z"
                      fill="#34A853"
                    />
                    <path
                      d="M1.07265 5.51758C0.390868 6.86298 0 8.38118 0 9.99933C0 11.6175 0.390868 13.1357 1.07265 14.4811C1.07265 14.4901 4.39998 11.8993 4.39998 11.8993C4.19998 11.2993 4.08177 10.663 4.08177 9.99923C4.08177 9.33551 4.19998 8.69918 4.39998 8.09919L1.07265 5.51758Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.99984 3.98182C11.4726 3.98182 12.7817 4.49089 13.8271 5.47272L16.6907 2.60912C14.9543 0.990971 12.6999 0 9.99984 0C6.09078 0 2.7181 2.24545 1.07265 5.51819L4.39987 8.10001C5.19074 5.73635 7.39985 3.98182 9.99984 3.98182Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_google">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-sm font-medium text-gray-500 leading-[150%]">
                  Continue with Google
                </span>
              </button>

              <button
                onClick={handleAppleSignIn}
                className="flex items-center justify-center gap-2 h-auto py-3 px-4 rounded-full bg-ylore-background-fill shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-opacity-80 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_apple)">
                    <path
                      d="M18.16 15.5861C17.8575 16.2848 17.4995 16.928 17.0847 17.5194C16.5193 18.3255 16.0563 18.8835 15.6996 19.1934C15.1465 19.702 14.5539 19.9625 13.9194 19.9773C13.4638 19.9773 12.9145 19.8477 12.275 19.5847C11.6334 19.323 11.0438 19.1934 10.5047 19.1934C9.93925 19.1934 9.33285 19.323 8.68422 19.5847C8.03462 19.8477 7.5113 19.9847 7.11119 19.9983C6.50269 20.0242 5.89617 19.7563 5.29075 19.1934C4.90435 18.8563 4.42103 18.2786 3.84203 17.4601C3.22082 16.586 2.7101 15.5725 2.30998 14.417C1.88148 13.1689 1.66667 11.9603 1.66667 10.7902C1.66667 9.44984 1.95629 8.29383 2.5364 7.32509C2.99231 6.54697 3.59883 5.93316 4.35794 5.48255C5.11705 5.03195 5.93728 4.80233 6.82058 4.78764C7.3039 4.78764 7.93771 4.93714 8.72533 5.23096C9.51074 5.52576 10.015 5.67526 10.2361 5.67526C10.4015 5.67526 10.9617 5.50045 11.9114 5.15195C12.8095 4.82875 13.5675 4.69492 14.1885 4.74764C15.8712 4.88344 17.1353 5.54675 17.976 6.74177C16.4711 7.6536 15.7267 8.93072 15.7415 10.5691C15.7551 11.8452 16.2181 12.9071 17.1279 13.7503C17.5402 14.1417 18.0007 14.4441 18.513 14.6589C18.4019 14.9812 18.2847 15.2898 18.16 15.5861V15.5861ZM14.3008 0.400114C14.3008 1.40034 13.9354 2.33425 13.207 3.19867C12.3281 4.22629 11.2649 4.8201 10.112 4.7264C10.0973 4.60641 10.0887 4.48011 10.0887 4.3474C10.0887 3.38718 10.5068 2.35956 11.2491 1.51934C11.6197 1.09392 12.091 0.74019 12.6626 0.458013C13.233 0.180046 13.7725 0.0263242 14.2798 0C14.2947 0.133715 14.3008 0.267438 14.3008 0.400101V0.400114Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_apple">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-sm font-medium text-gray-500 leading-[150%]">
                  Continue with Apple
                </span>
              </button>
            </div>

            {/* Sign Up / Sign In link */}
            <div className="flex justify-center items-center gap-1 text-sm leading-[150%] mt-4">
              {type === "signin" ? (
                <>
                  <span className="text-gray-500 font-normal">
                    Don't have an account?
                  </span>
                  <Link
                    href="/auth/signup"
                    className="text-black font-normal underline hover:text-ylore-blue transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : type === "signup" ? (
                <>
                  <span className="text-gray-500 font-normal">
                    Already have an account?
                  </span>
                  <Link
                    href="/auth/signin"
                    className="text-black font-normal underline hover:text-ylore-blue transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-black font-normal underline hover:text-ylore-blue transition-colors"
                >
                  Back to Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 min-h-[400px] lg:min-h-[80vh] rounded-[14px] relative overflow-hidden">
          <img
            src={authFormImage.src}
            alt="Auth Form Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}