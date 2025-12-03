
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Components/profile/Navbar";

import {
  getUserProfile,
  updateUserEmail,
} from "@/firebase/auth-actions";

export default function EmailSettings() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getUserProfile();
      if (data) setEmail(data.email);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserEmail(email);
      alert("Email updated successfully!");
      router.push("/profile/account-settings");
    } catch (err: any) {
      alert(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[533px] mx-auto px-4 py-8">

        <div className="flex items-center gap-4">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-8 h-8" />
          </button>
          <h1 className="text-2xl font-bold">Email Address</h1>
        </div>

        <div className="mt-8">

          <label className="text-sm font-medium">
            New Email Address *
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 px-4 rounded-full bg-gray-100 border w-full mt-2"
          />

          <button
            onClick={handleSave}
            className="mt-6 h-12 w-full rounded-full bg-[#4DB9C8] text-white font-semibold"
          >
            {saving ? "Saving..." : "Save Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
