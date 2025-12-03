

"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Components/profile/Navbar";
import { ValidationItem } from "@/app/Components/auth/ValidationItem";
import { updateUserPassword } from "@/firebase/auth-actions";

export default function PasswordSettings() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const valid = Object.values(rules).every(Boolean);

  const handleSave = async () => {
    if (!valid) return alert("Password does not meet requirements.");
    if (password !== confirm) return alert("Passwords do not match.");

    setSaving(true);
    try {
      await updateUserPassword(password);
      alert("Password updated successfully!");
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
          <h1 className="text-2xl font-bold">Password</h1>
        </div>

        <div className="mt-8 space-y-6">

          <div>
            <label>New Password *</label>
            <input
              type="password"
              className="w-full h-12 px-4 rounded-full bg-gray-100 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Validation */}
            <div className="mt-2">
              <ValidationItem title="At least 8 characters" valid={rules.length} />
              <ValidationItem title="Uppercase letter" valid={rules.upper} />
              <ValidationItem title="Lowercase letter" valid={rules.lower} />
              <ValidationItem title="Number" valid={rules.number} />
              <ValidationItem title="Special character" valid={rules.special} />
            </div>
          </div>

          <div>
            <label>Confirm Password *</label>
            <input
              type="password"
              className="w-full h-12 px-4 rounded-full bg-gray-100 mt-1"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="h-12 w-full rounded-full bg-[#4DB9C8] text-white font-semibold"
          >
            {saving ? "Saving..." : "Save Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
