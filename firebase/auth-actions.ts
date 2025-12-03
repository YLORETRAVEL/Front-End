import { auth } from "./auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
  applyActionCode,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { UserProfile } from "@/app/types/auth";

export const emailSignup = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  await sendEmailVerification(user);

  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    photoURL: "",
    address: "",
    location: "",
    createdAt: new Date(),
  });

  return user;
};

export const confirmEmailVerification = async (oobCode: string) => {
  return await applyActionCode(auth, oobCode);
};

// export const emailLogin = async (
//   email: string,
//   password: string,
//   keepSignedIn: boolean
// ) => {
//   await setPersistence(
//     auth,
//     keepSignedIn ? browserLocalPersistence : browserSessionPersistence
//   );

//   return await signInWithEmailAndPassword(auth, email, password);
// };


export const emailLogin = async (
  email: string,
  password: string,
  keepSignedIn: boolean
) => {
  await setPersistence(
    auth,
    keepSignedIn ? browserLocalPersistence : browserSessionPersistence
  );

  const userCred = await signInWithEmailAndPassword(auth, email, password);

  if (!userCred.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email before logging in.");
  }

  return userCred;
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

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    displayName: user.displayName || "",
    username: data.username || "",
    email: data.email || user.email || "",
    address: data.address || "",
    location: data.location || "",
    photoURL: data.photoURL || "",
  };
};

/**
 * Update display name & profile photo
 */
export const updateUserProfile = async (profile: UserProfile) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const user = auth.currentUser;

  // 1️⃣ Update Firebase Auth (only name + photo allowed)
  await updateProfile(user, {
    displayName: profile.displayName,
    photoURL: profile.photoURL,
  });

  // 2️⃣ Update Firestore
  const ref = doc(db, "users", user.uid);

  await updateDoc(ref, {
    displayName: profile.displayName,
    username: profile.username,
    photoURL: profile.photoURL,
    address: profile.address,
    location: profile.location,
    updatedAt: new Date(),
  });

  return true;
};

/**
 * Update email
 */
export const updateUserEmail = async (email: string) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  await updateEmail(auth.currentUser, email);
  return auth.currentUser;
};

/**
 * Update password
 */
export const updateUserPassword = async (newPassword: string) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  await updatePassword(auth.currentUser, newPassword);
  return auth.currentUser;
};
