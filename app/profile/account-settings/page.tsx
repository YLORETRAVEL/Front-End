"use client";
import Navbar from "@/app/Components/profile/Navbar";
import DeleteAccountModal from "@/app/modals/DeleteAccountModal";
import SignOutModal from "@/app/modals/SignOutModal";
import { SectionProps, SettingItemProps } from "@/app/types/dashboard";
import {
  User,
  Mail,
  CreditCard,
  UserCircle as UserSound,
  Languages,
  Lock,
  Shield,
  Bell,
  Trash2,
  LogOut,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  const handleSignOut = () => {
    console.log("Signed out");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full max-w-[644px] mx-auto px-4 py-8 md:py-14">
        <div className="space-y-8">
          {/* Manage Account Section */}
          <Section title="Manage Account">
            <SettingItem
              icon={<User className="w-7 h-7" strokeWidth={1.5} />}
              title="Profile"
              description="Manage your profile information"
              actionType="navigate"
              onClick={() =>
                router.push("/profile/account-settings/profile-settings")
              }
            />

            <div className="pt-6">
              <SettingItem
                icon={<Mail className="w-7 h-7" strokeWidth={1.5} />}
                title="JamesBrown@gmail.com"
                description={
                  <div className="flex items-center gap-1.5">
                    <CheckCircle
                      className="w-6 h-6 text-[#636363]"
                      strokeWidth={1.5}
                    />
                    <span>Verified</span>
                  </div>
                }
                actionType="button"
                actionLabel="Change"
                onClick={() =>
                  router.push("/profile/account-settings/email-settings")
                }
              />
            </div>
          </Section>

          {/* Payment & Earnings Section */}
          <Section title="Payment & Earnings">
            <SettingItem
              icon={<CreditCard className="w-7 h-7" strokeWidth={1.5} />}
              title="Stripe Account"
              description={
                <div className="flex items-center gap-1.5">
                  <XCircle
                    className="w-6 h-6 text-[#636363]"
                    strokeWidth={1.5}
                  />
                  <span>Not Coneected</span>
                </div>
              }
              actionType="button"
              actionLabel="Connect"
            />
          </Section>

          {/* Content Setting Section */}
          <Section title="Content Setting">
            <SettingItem
              icon={<UserSound className="w-7 h-7" strokeWidth={1.5} />}
              title="Narrator Voice"
              description="Set narrators voice"
              actionType="dropdown"
              actionLabel="Default"
            />

            <div className="pt-6">
              <SettingItem
                icon={<Languages className="w-7 h-7" strokeWidth={1.5} />}
                title="Language"
                description="App and Content Language"
                actionType="dropdown"
                actionLabel="English"
              />
            </div>
          </Section>

          {/* Security Section */}
          <Section title="Security">
            <SettingItem
              icon={<Lock className="w-7 h-7" strokeWidth={1.5} />}
              title="Change Password"
              description="Update your password"
              actionType="navigate"
              onClick={() =>
                router.push("/profile/account-settings/password-settings")
              }
            />

            <div className="pt-6">
              <SettingItem
                icon={<Shield className="w-7 h-7" strokeWidth={1.5} />}
                title="Two-Factor Authentication"
                description={
                  <div className="flex items-center gap-1.5">
                    <XCircle
                      className="w-6 h-6 text-[#636363]"
                      strokeWidth={1.5}
                    />
                    <span>Not Enabled</span>
                  </div>
                }
                actionType="navigate"
              />
            </div>
          </Section>

          {/* Notifications Section */}
          <Section title="Notifications">
            <SettingItem
              icon={<Bell className="w-7 h-7" strokeWidth={1.5} />}
              title="Notifications"
              description="Customize your notifications"
              actionType="navigate"
            />
          </Section>

          {/* Session Section */}
          <Section title="Session">
            <SettingItem
              icon={
                <Trash2 className="w-7 h-7 text-[#AD0303]" strokeWidth={1.5} />
              }
              title="Delete Account"
              description="Permanently remove your account and data"
              actionType="navigate"
              iconBgColor="bg-[#FBDDDD]"
              onClick={() => setIsDeleteModalOpen(true)}
            />

            <div className="pt-6">
              <SettingItem
                icon={
                  <LogOut
                    className="w-7 h-7 text-[#AD0303]"
                    strokeWidth={1.5}
                  />
                }
                title="Sign Out"
                description="Sign out of your account on this device"
                actionType="navigate"
                iconBgColor="bg-[#FBDDDD]"
                onClick={() => setIsSignOutModalOpen(true)}
              />
            </div>
            <DeleteAccountModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDeleteAccount}
            />

            <SignOutModal
              isOpen={isSignOutModalOpen}
              onClose={() => setIsSignOutModalOpen(false)}
              onSignOut={handleSignOut}
            />
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-[30px] font-semibold leading-[150%] text-[#1A1A1A]">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function SettingItem({
  icon,
  title,
  description,
  actionType,
  onClick,
  actionLabel,
  iconBgColor = "bg-[#EAEAEA]",
}: SettingItemProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        actionType === "navigate" ? "cursor-pointer" : ""
      }`}
      onClick={actionType === "navigate" ? onClick : undefined}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div
          className={`flex items-center justify-center w-[54px] h-[54px] rounded-full flex-shrink-0 ${iconBgColor}`}
        >
          {icon}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h3 className="text-lg font-medium leading-[150%] text-[#3F3F3F]">
            {title}
          </h3>
          <div className="text-base font-normal leading-[150%] text-[#636363]">
            {description}
          </div>
        </div>
      </div>

      {actionType === "navigate" && (
        <ChevronRight
          className="w-8 h-8 text-[#636363] flex-shrink-0"
          strokeWidth={2}
        />
      )}

      {actionType === "button" && actionLabel && (
        <button
          className="flex items-center justify-center gap-1 px-7 py-2.5 rounded-full bg-[#F6F5F5] hover:bg-[#EAEAEA] transition-colors flex-shrink-0"
          onClick={onClick}
        >
          <span className="text-lg font-medium leading-[150%] text-[#1A1A1A] whitespace-nowrap">
            {actionLabel}
          </span>
        </button>
      )}

      {actionType === "dropdown" && actionLabel && (
        <button className="flex items-center justify-center gap-1 px-7 py-2.5 rounded-full bg-[#F6F5F5] hover:bg-[#EAEAEA] transition-colors flex-shrink-0">
          <span className="text-lg font-medium leading-[150%] text-[#1A1A1A] whitespace-nowrap">
            {actionLabel}
          </span>
          <ChevronDown className="w-7 h-7 text-[#343330]" />
        </button>
      )}
    </div>
  );
}
