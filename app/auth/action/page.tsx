"use client";

import { useSearchParams } from "next/navigation";
import AuthForm from "@/app/Components/auth/AuthForm";

export default function ActionPage() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");

  if (!mode) return <p>Invalid request.</p>;

  switch (mode) {
    case "resetPassword":
      return <AuthForm type="reset-password" />;

    case "verifyEmail":
      return <AuthForm type="verify-email" />;

    default:
      return <p>Unsupported action.</p>;
  }
}
