// "use client";

// import  { useState, useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// import authFormImage from "../../../public/images/authform.png";
// import logo from "../../../public/icons/logo.svg";
// import EyeIcon from "../../../public/icons/EyeClosed.svg";
// import CheckIcon from "../../../public/icons/Checkbox.svg";
// import GoogleIcon from "../../../public/icons/googlelogin.svg";

// import { ValidationItem } from "./ValidationItem";

// import {
//   emailSignup,
//   emailLogin,
//   googleLogin,
//   sendResetEmail,
//   confirmPasswordResetAction,
//   confirmEmailVerification,
// } from "@/firebase/auth-actions";

// import {
//   setPersistence,
//   browserLocalPersistence,
//   browserSessionPersistence,
// } from "firebase/auth";
// import { auth } from "@/firebase/auth";

// import type { AuthFormProps, AuthFormType } from "@/app/types/auth";

// import { useFormik } from "formik";
// import * as Yup from "yup";

// function getErrorMessage(err: unknown): string {
//   if (err instanceof Error) return err.message;
//   if (typeof err === "string") return err;
//   return "An unexpected error occurred";
// }

// export default function AuthForm({ type }: AuthFormProps) {
//   const router = useRouter();
//   const params = useSearchParams();
//   const oobCode = params.get("oobCode");

//   const [keepSignedIn, setKeepSignedIn] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const titles: Record<AuthFormType, string> = {
//     signin: "Sign in",
//     signup: "Create account",
//     "forgot-password": "Forgot password",
//     "reset-password": "Reset password",
//     "verify-email": "Verify Email",
//   };

//   const buttonLabels: Record<AuthFormType, string> = {
//     signin: "Sign In",
//     signup: "Sign Up",
//     "forgot-password": "Send Reset Link",
//     "reset-password": "Reset Password",
//     "verify-email": "Verify Email",
//   };

//   // ----------------------
//   // Yup validation schemas
//   // ----------------------

//   const passwordYup = Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "At least 1 uppercase letter")
//     .matches(/[a-z]/, "At least 1 lowercase letter")
//     .matches(/\d/, "At least 1 number")
//     .matches(/[!@#$%^&*(),.?":{}|<>]/, "At least 1 special character")
//     .required("Password is required");

//   const schemas: Record<AuthFormType, Yup.ObjectSchema<any>> = {
//     signin: Yup.object({
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//     signup: Yup.object({
//       username: Yup.string().required("Username is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: passwordYup,
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password")], "Passwords must match")
//         .required("Confirm password is required"),
//     }),
//     "forgot-password": Yup.object({
//       email: Yup.string().email("Invalid email").required("Email is required"),
//     }),
//     "reset-password": Yup.object({
//       password: passwordYup,
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password")], "Passwords must match")
//         .required("Confirm password is required"),
//     }),
//     "verify-email": Yup.object({}), // no fields needed
//   };

//   // ----------------------
//   // Formik setup
//   // ----------------------
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: schemas[type],
//     validateOnMount: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         // persist session based on keepSignedIn
//         await setPersistence(
//           auth,
//           keepSignedIn ? browserLocalPersistence : browserSessionPersistence
//         );

//         switch (type) {
//           case "signin": {
//             const user = await emailLogin(values.email, values.password, keepSignedIn);
//             console.log("Logged in user:", user.user);
//             router.push("/dashboard");
//             break;
//           }

//           case "verify-email": {
//             if (!oobCode) {
//               alert("Invalid verification link.");
//               return;
//             }
//             await confirmEmailVerification(oobCode);
//             alert("Email verified successfully!");
//             router.push("/auth/signin");
//             break;
//           }

//           case "signup": {
//             await emailSignup(values.username, values.email, values.password, values.confirmPassword);
//             alert("Account created! Please verify your email.");
//             router.push("/auth/signin");
//             break;
//           }

//           case "forgot-password": {
//             await sendResetEmail(values.email);
//             alert("Reset password link sent! Check your email.");
//             break;
//           }

//           case "reset-password": {
//             if (!oobCode) {
//               alert("Invalid or missing reset token.");
//               return;
//             }

//             if (values.password !== values.confirmPassword) {
//               alert("Passwords do not match.");
//               return;
//             }

//             await confirmPasswordResetAction(oobCode, values.password);
//             alert("Password reset successfully!");
//             router.push("/auth/signin");
//             break;
//           }
//         }
//       } catch (err) {
//         console.error(err);
//         alert(getErrorMessage(err));
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   // compute password rules for live UI (ValidationItem)
//   const passwordRules = useMemo(() => {
//     const pw = formik.values.password || "";
//     return {
//       length: pw.length >= 8,
//       uppercase: /[A-Z]/.test(pw),
//       lowercase: /[a-z]/.test(pw),
//       number: /\d/.test(pw),
//       special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
//     };
//   }, [formik.values.password]);

//   const allValid = Object.values(passwordRules).every(Boolean);


//   const isPasswordStep = type === "signup" || type === "reset-password";

 
//   const handleGoogle = async () => {
//     try {
//       await googleLogin();
//       router.push("/dashboard");
//     } catch (err) {
//       alert(getErrorMessage(err));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center">
//         {/* Logo - Top Left */}
//         <div className="absolute top-4 left-12 lg:top-20 lg:left-24">
//           <Image
//             src={logo}
//             alt="Logo"
//             className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
//           />
//         </div>

//         {/* Left Side - Form */}
//         <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center py-8 lg:py-12">
//           <div className="w-full max-w-sm flex flex-col gap-6">
//             {/* Header */}
//             <div className="flex flex-col gap-3 text-center">
//               <h1 className="text-2xl font-bold text-black">{titles[type]}</h1>
//               <p className="text-sm text-gray-500">
//                 {type === "signin" || type === "signup"
//                   ? "Welcome back! Sign in to continue."
//                   : type === "forgot-password"
//                   ? "Enter the email to receive reset instructions."
//                   : "Set your new password below."}
//               </p>
//             </div>

//             {/* Actual Form (now Formik-managed) */}
//             <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//               {/* VERIFY EMAIL */}
//               {type === "verify-email" && (
//                 <div className="flex flex-col items-center gap-4">
//                   <p className="text-gray-600 text-sm">
//                     Click the button below to verify your email.
//                   </p>

//                   <button
//                     type="submit"
//                     className="h-12 w-full rounded-full text-white font-semibold bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
//                     disabled={formik.isSubmitting}
//                   >
//                     Verify Email
//                   </button>
//                 </div>
//               )}

//               {/* SIGNUP */}
//               {type === "signup" && (
//                 <>
//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Username <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="username"
//                       type="text"
//                       value={formik.values.username}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       placeholder="Username"
//                       className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="email"
//                       type="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       placeholder="Email Address"
//                       className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Password <span className="text-red-500">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         placeholder="Password"
//                         className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         required
//                       />

//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((s) => !s)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
//                       >
//                         <Image src={EyeIcon} alt="Toggle password visibility" className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="mt-2">
//                       <label className="flex items-center gap-1 text-sm font-medium text-black">
//                         Confirm Password <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         name="confirmPassword"
//                         type={showPassword ? "text" : "password"}
//                         value={formik.values.confirmPassword}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         placeholder="Confirm Password"
//                         className="w-full h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1"
//                         required
//                       />
//                     </div>

//                     <div className="mt-2 space-y-1 text-xs">
//                       <ValidationItem title="At least 8 characters" valid={passwordRules.length} />
//                       <ValidationItem title="At least 1 uppercase letter" valid={passwordRules.uppercase} />
//                       <ValidationItem title="At least 1 lowercase letter" valid={passwordRules.lowercase} />
//                       <ValidationItem title="At least 1 number" valid={passwordRules.number} />
//                       <ValidationItem title="At least 1 special character" valid={passwordRules.special} />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className={`h-12 rounded-full text-white font-semibold shadow-sm mt-2 transition-all ${
//                       allValid ? "bg-[#4DB9C8] hover:bg-[#50b0bd]" : "bg-[#4DB9C8]/60 cursor-not-allowed"
//                     }`}
//                     disabled={!allValid || formik.isSubmitting || !formik.isValid}
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               )}

//               {/* SIGNIN */}
//               {type === "signin" && (
//                 <>
//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="email"
//                       type="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       placeholder="Email Address"
//                       className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Password <span className="text-red-500">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         placeholder="Password"
//                         className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         required
//                       />

//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((s) => !s)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
//                       >
//                         <Image src={EyeIcon} alt="Toggle" className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <div
//                           onClick={() => setKeepSignedIn((k) => !k)}
//                           className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
//                             keepSignedIn ? "bg-gray-100" : "bg-gray-50 border border-gray-300"
//                           }`}
//                         >
//                           {keepSignedIn && (
//                             <Image src={CheckIcon} alt="Checked" className="w-3 h-3 text-white" />
//                           )}
//                         </div>
//                         <span className="text-sm font-medium text-black">Keep me signed in</span>
//                       </label>

//                       <Link href="/auth/forgot-password" className="text-sm text-gray-500 underline">
//                         Forgot password?
//                       </Link>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="h-12 rounded-full text-white font-semibold shadow-sm mt-2 bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
//                     disabled={formik.isSubmitting}
//                   >
//                     Sign In
//                   </button>
//                 </>
//               )}

//               {/* FORGOT PASSWORD */}
//               {type === "forgot-password" && (
//                 <>
//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="email"
//                       type="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       placeholder="Email Address"
//                       className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="h-12 rounded-full text-white font-semibold bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
//                     disabled={formik.isSubmitting}
//                   >
//                     Send Reset Link
//                   </button>
//                 </>
//               )}

//               {/* RESET PASSWORD */}
//               {type === "reset-password" && (
//                 <>
//                   <div className="flex flex-col gap-2">
//                     <label className="flex items-center gap-1 text-sm font-medium text-black">
//                       New Password <span className="text-red-500">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         placeholder="New Password"
//                         className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         required
//                       />

//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((s) => !s)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
//                       >
//                         <Image src={EyeIcon} alt="Toggle" className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="mt-2">
//                       <label className="flex items-center gap-1 text-sm font-medium text-black">
//                         Confirm Password <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         name="confirmPassword"
//                         type={showPassword ? "text" : "password"}
//                         value={formik.values.confirmPassword}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         placeholder="Confirm Password"
//                         className="w-full h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1"
//                         required
//                       />
//                     </div>

//                     <div className="mt-2 space-y-1 text-xs">
//                       <ValidationItem title="At least 8 characters" valid={passwordRules.length} />
//                       <ValidationItem title="1 uppercase letter" valid={passwordRules.uppercase} />
//                       <ValidationItem title="1 lowercase letter" valid={passwordRules.lowercase} />
//                       <ValidationItem title="1 number" valid={passwordRules.number} />
//                       <ValidationItem title="1 special character" valid={passwordRules.special} />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className={`h-12 rounded-full text-white font-semibold shadow-sm mt-2 transition-all ${
//                       allValid ? "bg-[#4DB9C8] hover:bg-[#50b0bd]" : "bg-[#4DB9C8]/60 cursor-not-allowed"
//                     }`}
//                     disabled={!allValid || formik.isSubmitting || !formik.isValid}
//                   >
//                     Reset Password
//                   </button>
//                 </>
//               )}
//             </form>

//             {/* Divider */}
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center">
//                 <span className="bg-white px-2 text-xs text-gray-500">OR</span>
//               </div>
//             </div>

//             {/* Social Buttons */}
//             {type !== "verify-email" && (
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={handleGoogle}
//                   className="flex items-center justify-center gap-2 h-12 rounded-full bg-gray-50 shadow-sm hover:bg-gray-100 transition-all"
//                   type="button"
//                 >
//                   <Image src={GoogleIcon} alt="Google" className="w-5 h-5" />
//                   <span className="text-sm font-medium text-gray-600">Continue with Google</span>
//                 </button>
//               </div>
//             )}

//             {/* Sign Up / Sign In link */}
//             <div className="flex justify-center items-center gap-1 text-sm mt-4">
//               {type === "signin" ? (
//                 <>
//                   <span className="text-gray-500">Don&apos;t have an account?</span>
//                   <Link href="/auth/signup" className="text-black underline hover:text-blue-500 transition-colors">
//                     Sign Up
//                   </Link>
//                 </>
//               ) : type === "signup" ? (
//                 <>
//                   <span className="text-gray-500">Already have an account?</span>
//                   <Link href="/auth/signin" className="text-black underline hover:text-blue-500 transition-colors">
//                     Sign In
//                   </Link>
//                 </>
//               ) : (
//                 <Link href="/auth/signin" className="text-black underline hover:text-blue-500 transition-colors">
//                   Back to Sign in
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Image */}
//         <div className="flex-1 hidden lg:flex items-center justify-center p-4">
//           <Image src={authFormImage} alt="Auth Form Hero" className="w-full max-w-lg object-contain" />
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  confirmEmailVerification,
} from "@/firebase/auth-actions";

import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/firebase/auth";

import type { AuthFormProps, AuthFormType } from "@/app/types/auth";

import { Formik, Form } from "formik";
import * as Yup from "yup";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "An unexpected error occurred";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const oobCode = params.get("oobCode");

  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const titles: Record<AuthFormType, string> = {
    signin: "Sign in",
    signup: "Create account",
    "forgot-password": "Forgot password",
    "reset-password": "Reset password",
    "verify-email": "Verify Email",
  };

  const passwordYup = Yup.string()
    .min(8, "Must be 8+ characters")
    .matches(/[A-Z]/, "Needs 1 uppercase letter")
    .matches(/[a-z]/, "Needs 1 lowercase letter")
    .matches(/\d/, "Needs 1 number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Needs 1 special character")
    .required("Required");

  const schemas: Record<AuthFormType, Yup.ObjectSchema<any>> = {
    signin: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    signup: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: passwordYup,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required(),
    }),
    "forgot-password": Yup.object({
      email: Yup.string().email().required(),
    }),
    "reset-password": Yup.object({
      password: passwordYup,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required(),
    }),
    "verify-email": Yup.object({}),
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const passwordRules = (password: string) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const handleGoogle = async () => {
    try {
      await googleLogin();
      router.push("/dashboard");
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center">

        {/* Logo */}
        <div className="absolute top-4 left-12 lg:top-20 lg:left-24">
          <Image src={logo} alt="Logo" className="w-12 h-12 lg:w-14 lg:h-14" />
        </div>

        {/* LEFT SIDE */}
        <div className="flex-1 w-full max-w-md flex justify-center py-8 lg:py-12">
          <div className="w-full max-w-sm flex flex-col gap-6">

            {/* Header */}
            <div className="text-center flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-black">{titles[type]}</h1>
              <p className="text-sm text-gray-500">
                {type === "signin" || type === "signup"
                  ? "Welcome back! Sign in to continue."
                  : type === "forgot-password"
                  ? "Enter the email to receive reset instructions."
                  : type === "verify-email"
                  ? "Verify your email to continue."
                  : "Set your new password below."}
              </p>
            </div>

            {/* FORM STARTS */}
            <Formik
              initialValues={initialValues}
              validationSchema={schemas[type]}
              validateOnMount={true}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await setPersistence(
                    auth,
                    keepSignedIn ? browserLocalPersistence : browserSessionPersistence
                  );

                  switch (type) {
                    case "signin": {
                      await emailLogin(values.email, values.password, keepSignedIn);
                      router.push("/dashboard");
                      break;
                    }

                    case "signup": {
                      await emailSignup(
                        values.username,
                        values.email,
                        values.password,
                        values.confirmPassword
                      );
                      alert("Account created! Please verify your email.");
                      router.push("/auth/signin");
                      break;
                    }

                    case "forgot-password": {
                      await sendResetEmail(values.email);
                      alert("Reset link sent!");
                      break;
                    }

                    case "reset-password": {
                      if (!oobCode) {
                        alert("Invalid reset link.");
                        return;
                      }
                      await confirmPasswordResetAction(oobCode, values.password);
                      alert("Password reset successful!");
                      router.push("/auth/signin");
                      break;
                    }

                    case "verify-email": {
                      if (!oobCode) {
                        alert("Invalid verification link.");
                        return;
                      }
                      await confirmEmailVerification(oobCode);
                      alert("Email verified!");
                      router.push("/auth/signin");
                      break;
                    }
                  }
                } catch (err) {
                  alert(getErrorMessage(err));
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, handleChange, handleBlur, isSubmitting, isValid }) => {
                const rules = passwordRules(values.password);

                return (
                  <Form className="flex flex-col gap-4">

                    {/* -------------------------------- VERIFY EMAIL -------------------------------- */}
                    {type === "verify-email" && (
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-600 text-sm">
                          Click the button below to verify your email.
                        </p>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 w-full rounded-full text-white font-semibold bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
                        >
                          Verify Email
                        </button>
                      </div>
                    )}

                    {/* -------------------------------- SIGN UP -------------------------------- */}
                    {type === "signup" && (
                      <>
                        {/* USERNAME */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Username <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Username"
                            className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email address"
                            className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        {/* PASSWORD */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Password <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">
                            <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Password"
                              className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((s) => !s)}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <Image src={EyeIcon} alt="toggle" className="w-5 h-5" />
                            </button>
                          </div>

                          {/* CONFIRM PASSWORD */}
                          <div className="mt-2">
                            <label className="text-sm font-medium text-black">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Confirm Password"
                              className="w-full h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                              required
                            />
                          </div>

                          {/* VALIDATION UI */}
                          <div className="mt-2 space-y-1 text-xs">
                            <ValidationItem title="At least 8 characters" valid={rules.length} />
                            <ValidationItem title="1 uppercase letter" valid={rules.uppercase} />
                            <ValidationItem title="1 lowercase letter" valid={rules.lowercase} />
                            <ValidationItem title="1 number" valid={rules.number} />
                            <ValidationItem title="1 special character" valid={rules.special} />
                          </div>
                        </div>

                        {/* SUBMIT */}
                        <button
                          type="submit"
                          disabled={!Object.values(rules).every(Boolean) || !isValid || isSubmitting}
                          className={`h-12 rounded-full text-white font-semibold shadow-sm mt-2 transition-all ${
                            Object.values(rules).every(Boolean)
                              ? "bg-[#4DB9C8] hover:bg-[#50b0bd]"
                              : "bg-[#4DB9C8]/60 cursor-not-allowed"
                          }`}
                        >
                          Sign Up
                        </button>
                      </>
                    )}

                    {/* -------------------------------- SIGN IN -------------------------------- */}
                    {type === "signin" && (
                      <>
                        {/* EMAIL */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email address"
                            className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* PASSWORD */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Password <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">
                            <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Password"
                              className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((s) => !s)}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <Image src={EyeIcon} alt="toggle" className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Keep signed in */}
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
                                  <Image src={CheckIcon} alt="checked" className="w-3 h-3" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-black">
                                Keep me signed in
                              </span>
                            </label>

                            <Link
                              href="/auth/forgot-password"
                              className="text-sm text-gray-500 underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>

                        {/* SUBMIT */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 rounded-full text-white font-semibold mt-2 bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
                        >
                          Sign In
                        </button>
                      </>
                    )}

                    {/* -------------------------------- FORGOT PASSWORD -------------------------------- */}
                    {type === "forgot-password" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email address"
                            className="h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 rounded-full text-white font-semibold bg-[#4DB9C8] hover:bg-[#50b0bd] transition-all"
                        >
                          Send Reset Link
                        </button>
                      </>
                    )}

                    {/* -------------------------------- RESET PASSWORD -------------------------------- */}
                    {type === "reset-password" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-black">
                            New Password <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">
                            <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="New Password"
                              className="w-full h-12 px-4 pr-12 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((s) => !s)}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <Image src={EyeIcon} alt="toggle" className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="mt-2">
                            <label className="text-sm font-medium text-black">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Confirm Password"
                              className="w-full h-12 px-4 rounded-full bg-gray-50 text-base text-gray-600 outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                            />
                          </div>

                          {/* Rules */}
                          <div className="mt-2 space-y-1 text-xs">
                            <ValidationItem title="At least 8 characters" valid={rules.length} />
                            <ValidationItem title="1 uppercase letter" valid={rules.uppercase} />
                            <ValidationItem title="1 lowercase letter" valid={rules.lowercase} />
                            <ValidationItem title="1 number" valid={rules.number} />
                            <ValidationItem title="1 special character" valid={rules.special} />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!Object.values(rules).every(Boolean) || !isValid || isSubmitting}
                          className={`h-12 rounded-full text-white font-semibold mt-2 transition-all ${
                            Object.values(rules).every(Boolean)
                              ? "bg-[#4DB9C8] hover:bg-[#50b0bd]"
                              : "bg-[#4DB9C8]/60 cursor-not-allowed"
                          }`}
                        >
                          Reset Password
                        </button>
                      </>
                    )}
                  </Form>
                );
              }}
            </Formik>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">OR</span>
              </div>
            </div>

            {/* Google button */}
            {type !== "verify-email" && (
              <button
                onClick={handleGoogle}
                type="button"
                className="flex items-center justify-center gap-2 h-12 rounded-full bg-gray-50 shadow-sm hover:bg-gray-100 transition-all"
              >
                <Image src={GoogleIcon} alt="Google" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">
                  Continue with Google
                </span>
              </button>
            )}

            {/* Footer */}
            <div className="flex justify-center items-center gap-1 text-sm mt-4">
              {type === "signin" ? (
                <>
                  <span className="text-gray-500">Don't have an account?</span>
                  <Link href="/auth/signup" className="text-black underline">
                    Sign Up
                  </Link>
                </>
              ) : type === "signup" ? (
                <>
                  <span className="text-gray-500">Already have an account?</span>
                  <Link href="/auth/signin" className="text-black underline">
                    Sign In
                  </Link>
                </>
              ) : (
                <Link href="/auth/signin" className="text-black underline">
                  Back to Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 hidden lg:flex items-center justify-center p-4">
          <Image src={authFormImage} alt="Hero" className="w-full max-w-lg object-contain" />
        </div>
      </div>
    </div>
  );
}
