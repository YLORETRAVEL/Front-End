import { auth } from "./auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
  applyActionCode

} from "firebase/auth";



export const emailSignup = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user.user);

  return user;
};


export const confirmEmailVerification = async (oobCode: string) => {
  return await applyActionCode(auth, oobCode);
};


export const emailLogin = async (
  email: string,
  password: string,
  keepSignedIn: boolean
) => {
  await setPersistence(
    auth,
    keepSignedIn ? browserLocalPersistence : browserSessionPersistence
  );

  return await signInWithEmailAndPassword(auth, email, password);
};



export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};



// ---------------- SEND RESET EMAIL ----------------
export const sendResetEmail = async (email: string) => {
  return await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/auth/reset-password`,
    handleCodeInApp: true,
  });
};


// ---------------- CONFIRM RESET PASSWORD ----------------
export const confirmPasswordResetAction = async (
  oobCode: string,
  newPassword: string
) => {
  return await confirmPasswordReset(auth, oobCode, newPassword);
};


// ---------------- LOGOUT ----------------
export const logoutUser = async () => {
  await signOut(auth);
};
