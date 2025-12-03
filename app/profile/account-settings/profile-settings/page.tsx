

"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Components/profile/Navbar";

import {
  getUserProfile,
  updateUserProfile,
} from "@/firebase/auth-actions";
import Field from "@/app/Components/profile/Field";

export default function ProfileSettings() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    displayName: "",
    username: "",
    email: "",
    address: "",
    location: "",
    photoURL: "",
  });

 
  const [saving, setSaving] = useState(false);

  // LOAD USER DATA
  useEffect(() => {
    async function load() {
      const data = await getUserProfile();
      if (data) {
        setProfile({
          displayName: data.displayName,
          username: data.username,
          email: data.email,
          address: data.address,
          location: data.location,
          photoURL: data.photoURL,
        });
      }
      
    }
    load();
  }, []);

  // SAVE PROFILE
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(profile);
      alert("Profile updated successfully!");
      router.push("/profile/account-settings");
    } catch (err: any) {
      alert(err.message);
    }
    setSaving(false);
  };

 

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-[533px] flex flex-col gap-6">

          {/* BACK BUTTON */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/profile/account-settings")}
              className="flex-shrink-0"
            >
              <ChevronLeft className="w-8 h-8 text-[#1A1A1A]" strokeWidth={2} />
            </button>

            <h1 className="text-2xl font-bold text-[#1A1A1A] font-dm-sans">
              Profile
            </h1>
          </div>

          {/* AVATAR — SAME STYLING */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-[130px] h-[130px] rounded-full bg-[#E5E7EB] flex items-center justify-center">
                <span className="text-[30px] font-normal font-geist text-black leading-none">
                  {profile.displayName
                    ? profile.displayName.slice(0, 2).toUpperCase()
                    : "NA"}
                </span>
              </div>

              <button className="text-base font-medium text-[#636363] underline font-dm-sans hover:text-[#3F3F3F] transition-colors">
                Change Profile Picture
              </button>
            </div>

            {/* DISPLAY NAME — SAME STYLING */}
            <Field
              label="Display Name"
              value={profile.displayName}
              onChange={(e) =>
                setProfile({ ...profile, displayName: e.target.value })
              }
            />

            {/* USERNAME — SAME STYLING */}
            <Field
              label="Username"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>

          {/* SAVE BUTTON — SAME STYLING */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-12 px-4 py-3 rounded-full bg-[#4DB9C8] shadow-[0_0_8px_0_#DDE6E8] 
                       flex items-center justify-center gap-3 text-lg font-semibold text-white font-dm-sans 
                       hover:bg-[#4DB9C8]/90 transition-colors"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

