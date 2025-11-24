import { auth } from "./auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Email signup
export const emailSignup = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user.user);
  return user;
};

// Email login
export const emailLogin = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

// Google login
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

// Password reset
export const resetPassword = async (email: string) =>
  await sendPasswordResetEmail(auth, email);
