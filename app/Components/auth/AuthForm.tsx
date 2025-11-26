"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import authFormImage from "../../../public/images/authform.png";
import logo from "../../../public/icons/logo.svg";
import EyeIcon from "../../../public/icons/EyeClosed.svg";
import CheckIcon from "../../../public/icons/Checkbox.svg";
import GoogleIcon from "../../../public/icons/googlelogin.svg";

import { ValidationItem } from "./ValidationItem";

import {
  emailSignup,
  emailLogin,
  googleLogin,
  sendResetEmail,
  confirmPasswordResetAction,
  confirmEmailVerification
} from "@/firebase/auth-actions";

import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/firebase/auth";

import type { AuthFormProps, AuthFormType } from "@/app/types/auth";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "An unexpected error occurred";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const params = useSearchParams();

  const oobCode = params.get("oobCode");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const titles: Record<AuthFormType, string> = {
    signin: "Sign in",
    signup: "Create account",
    "forgot-password": "Forgot password",
    "reset-password": "Reset password",
     "verify-email": "Verify Email", 
  };

  const buttonLabels: Record<AuthFormType, string> = {
    signin: "Sign In",
    signup: "Sign Up",
    "forgot-password": "Send Reset Link",
    "reset-password": "Reset Password",
     "verify-email": "Verify Email",
  };

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allValid = Object.values(passwordRules).every(Boolean);

  // ---------------------------- SUBMIT HANDLER ----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await setPersistence(
        auth,
        keepSignedIn ? browserLocalPersistence : browserSessionPersistence
      );

      switch (type) {
        // -------------------------------- SIGNIN --------------------------------
        case "signin": {
          const user = await emailLogin(email, password, keepSignedIn);
          console.log("Logged in user:", user.user);
          router.push("/dashboard/Index");
          break;
        }

        case "verify-email": {
          if (!oobCode) {
            alert("Invalid verification link.");
            return;
          }

          await confirmEmailVerification(oobCode);

          alert("Email verified successfully!");
          router.push("/auth/signin");
          break;
        }

        // -------------------------------- SIGNUP --------------------------------
        case "signup": {
          await emailSignup(email, password, confirmPassword);
          alert("Account created! Please verify your email.");
          router.push("/auth/signin");
          break;
        }

        // ----------------------------- FORGOT PASSWORD --------------------------
        case "forgot-password": {
          await sendResetEmail(email);
          alert("Reset password link sent! Check your email.");
          break;
        }

        // ----------------------------- RESET PASSWORD ---------------------------
        case "reset-password": {
          if (!oobCode) {
            alert("Invalid or missing reset token.");
            return;
          }

          if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
          }

          await confirmPasswordResetAction(oobCode, password);

          alert("Password reset successfully!");
          router.push("/auth/signin");
          break;
        }
      }
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err));
    }
  };

  // --------- GOOGLE LOGIN -----------
  const handleGoogle = async () => {
    try {
      await googleLogin();
      router.push("/dashboard/Index");
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center">
        {/* Logo - Top Left */}
        <div className="absolute top-4 left-12 lg:top-20 lg:left-24">
          <Image
            src={logo}
            alt="Logo"
            className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
          />
        </div>

        {/* Left Side - Form */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center py-8 lg:py-12">
          <div className="w-full max-w-sm flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-2xl font-bold text-black">{titles[type]}</h1>
              <p className="text-sm text-gray-500">
                {type === "signin" || type === "signup"
                  ? "Welcome back! Sign in to continue."
                  : type === "forgot-password"
                  ? "Enter the email to receive reset instructions."
                  : "Set your new password below."}
              </p>
            </div>

            {/* Actual Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username for signup only */}
              {type === "signup" && (
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1 text-sm font-medium text-black">
                    Username
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              )}

              {/* Email for signin/signup/forgot-password */}
              {(type === "signin" ||
                type === "signup" ||
                type === "forgot-password") && (
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1 text-sm font-medium text-black">
                    Email
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              )}

              {/* Password field (not for forgot-password) */}
              {type !== "forgot-password" && (
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1 text-sm font-medium text-black">
                    Password
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />

                    {/* Eye Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    >
                      <Image
                        src={EyeIcon}
                        alt="Toggle password visibility"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>

                  {/* Confirm Password for signup/reset-password */}
                  {(type === "signup" || type === "reset-password") && (
                    <div className="mt-2">
                      <label className="flex items-center gap-1 text-sm font-medium text-black">
                        Confirm Password
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1"
                        required
                      />
                    </div>
                  )}

                  {/* 🔥 Password Validation Rules */}
                  {(type === "signup" || type === "reset-password") && (
                    <div className="mt-2 space-y-1 text-xs">
                      <ValidationItem
                        title="At least 8 characters"
                        valid={passwordRules.length}
                      />
                      <ValidationItem
                        title="At least 1 uppercase letter"
                        valid={passwordRules.uppercase}
                      />
                      <ValidationItem
                        title="At least 1 lowercase letter"
                        valid={passwordRules.lowercase}
                      />
                      <ValidationItem
                        title="At least 1 number"
                        valid={passwordRules.number}
                      />
                      <ValidationItem
                        title="At least 1 special character"
                        valid={passwordRules.special}
                      />
                    </div>
                  )}
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
                          ? "bg-gray-100"
                          : "bg-gray-50 border border-gray-300"
                      }`}
                    >
                      {keepSignedIn && (
                        <Image
                          src={CheckIcon}
                          alt="Checked"
                          className="w-3 h-3 text-white"
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium text-black">
                      Keep me signed in
                    </span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-gray-500 underline hover:text-black transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={`h-12 rounded-full text-white font-semibold shadow-sm mt-2 transition-all ${
                  type === "signup" || type === "reset-password"
                    ? allValid
                      ? "bg-[#4DB9C8] hover:bg-[#50b0bd]"
                      : "bg-[#4DB9C8]/60 cursor-not-allowed"
                    : "bg-[#4DB9C8] hover:bg-[#50b0bd]"
                }`}
                disabled={
                  type === "signup" || type === "reset-password"
                    ? !allValid
                    : false
                }
              >
                {buttonLabels[type]}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleGoogle}
                className="flex items-center justify-center gap-2 h-12 rounded-full bg-gray-50 shadow-sm hover:bg-gray-100 transition-all"
                type="button"
              >
                <Image src={GoogleIcon} alt="Google" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Sign Up / Sign In link */}
            <div className="flex justify-center items-center gap-1 text-sm mt-4">
              {type === "signin" ? (
                <>
                  <span className="text-gray-500">
                    Don&apos;t have an account?
                  </span>
                  <Link
                    href="/auth/signup"
                    className="text-black underline hover:text-blue-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : type === "signup" ? (
                <>
                  <span className="text-gray-500">
                    Already have an account?
                  </span>
                  <Link
                    href="/auth/signin"
                    className="text-black underline hover:text-blue-500 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-black underline hover:text-blue-500 transition-colors"
                >
                  Back to Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 hidden lg:flex items-center justify-center p-4">
          <Image
            src={authFormImage}
            alt="Auth Form Hero"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}
