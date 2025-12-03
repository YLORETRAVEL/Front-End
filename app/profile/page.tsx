"use client";

import Image from "next/image";
import Navbar from "@/app/Components/profile/Navbar";
import ProfileHeader from "@/app/Components/profile/ProfileHeader";
import StatsCard from "@/app/Components/profile/StatsCard";
import MenuItem from "@/app/Components/profile/MenuItem";

// Local PNG imports (correct)
import FollowersIcon from "@/public/icons/profile/followersicon.png";
import RatingIcon from "@/public/icons/profile/tourrating.png";
import ToursCreatedIcon from "@/public/icons/profile/tourscreatedicon.png";
import PlacesAddedIcon from "@/public/icons/profile/placesadded.png";

import ToursMenuIcon from "@/public/icons/profile/tours.png";
import PlacesMenuIcon from "@/public/icons/profile/places.png";
import MiStoryIcon from "@/public/icons/profile/mistory.png";

import CreatorStudioIcon from "@/public/icons/profile/creatorstudioicon.png";
import AccountSettingsIcon from "@/public/icons/profile/accountsetingsicon.png";
import PerformanceIcon from "@/public/icons/profile/performance.png";

import CreatorResourcesIcon from "@/public/icons/profile/creatorresourceicon.png";
import SupportIcon from "@/public/icons/profile/support.png";

import LogoutIcon from "@/public/icons/profile/signout.png";

import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-16">
      <Navbar />

      <div className="pt-28 flex flex-col items-center gap-8 max-w-[893px] mx-auto px-4">
        <ProfileHeader />

        {/* ================= OVERVIEW ================= */}
        <div className="flex flex-wrap justify-center gap-7 w-full">
          {/* Followers */}
          <StatsCard
            icon={
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <Image
                  src={FollowersIcon}
                  alt="Followers"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            }
            label="Followers"
            value="8.4k"
          />

          {/* Rating */}
          <StatsCard
            icon={
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <Image
                  src={RatingIcon}
                  alt="Rating"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            }
            label="Avg Tour Rating"
            value="4.8"
          />

          {/* Tours Created */}
          <StatsCard
            icon={
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <Image
                  src={ToursCreatedIcon}
                  alt="Tours Created"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            }
            label="Tours Created"
            value="2.1k"
          />

          {/* Places Added */}
          <StatsCard
            icon={
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <Image
                  src={PlacesAddedIcon}
                  alt="Places Added"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            }
            label="Places Added"
            value="48"
          />
        </div>

        {/* ================= CONTENT & ACTIVITY ================= */}
        <div className="flex flex-col items-start gap-5 w-full">
          <h2 className="text-[30px] font-semibold text-ylore-text-primary w-full">
            Content & Activity
          </h2>

          <div className="flex flex-col gap-6 w-full bg-white">
            <MenuItem
              icon={
                <Image src={ToursMenuIcon} alt="Tours" width={28} height={28} />
              }
              iconBg="bg-ylore-blue-40"
              title="Tours"
              description="Your Purchased Tours"
            />

            <MenuItem
              icon={
                <Image
                  src={PlacesMenuIcon}
                  alt="Places"
                  width={28}
                  height={28}
                />
              }
              iconBg="bg-ylore-blue-40"
              title="Places"
              description="Find your Favorites"
            />

            <MenuItem
              icon={
                <Image src={MiStoryIcon} alt="MiStory" width={28} height={28} />
              }
              iconBg="bg-ylore-blue-40"
              title="MiStory"
              description="Find your favorite saved posts"
            />
          </div>
        </div>

        {/* ================= CONTENT & MANAGEMENT ================= */}
        <div className="flex flex-col items-start gap-5 w-full">
          <h2 className="text-[30px] font-semibold text-ylore-text-primary w-full">
            Content & Management
          </h2>

          <div className="flex flex-col gap-6 w-full bg-white">
            <MenuItem
              icon={
                <Image
                  src={CreatorStudioIcon}
                  alt="Creator Studio"
                  width={28}
                  height={28}
                />
              }
              iconBg="bg-ylore-yellow-bg"
              title="Creator Studio"
              description="Create all content here"
            />

            <MenuItem
              icon={
                <Image
                  src={AccountSettingsIcon}
                  alt="Account Settings"
                  width={28}
                  height={28}
                />
              }
              iconBg="bg-ylore-yellow-bg"
              title="Account Settings"
              description="Personal Settings & Preferences"
              onClick={() => router.push("/profile/account-settings")}
            />

            <MenuItem
              icon={
                <Image
                  src={PerformanceIcon}
                  alt="Performance"
                  width={28}
                  height={28}
                />
              }
              iconBg="bg-ylore-yellow-bg"
              title="Performance"
              description="Analytics & Insights"
            />
          </div>
        </div>

        {/* ================= HELP & RESOURCES ================= */}
        <div className="flex flex-col items-start gap-5 w-full">
          <h2 className="text-[30px] font-semibold text-ylore-text-primary w-full">
            Help & Resources
          </h2>

          <div className="flex flex-col gap-6 w-full bg-white">
            <MenuItem
              icon={
                <Image
                  src={CreatorResourcesIcon}
                  alt="Creator Resources"
                  width={28}
                  height={28}
                />
              }
              iconBg="bg-ylore-indigo-bg"
              title="Creator Resources"
              description="Tips, guides and tutorials"
            />

            <MenuItem
              icon={
                <Image src={SupportIcon} alt="Support" width={28} height={28} />
              }
              iconBg="bg-ylore-indigo-bg"
              title="Support"
              description="Get help when you need it most"
            />
          </div>
        </div>

        {/* ================= SESSION ================= */}
        <div className="flex flex-col items-start gap-5 w-full">
          <h2 className="text-[30px] font-semibold text-ylore-text-primary w-full">
            Session
          </h2>

          <div className="flex flex-col gap-6 w-full bg-white">
            <MenuItem
              icon={
                <Image src={LogoutIcon} alt="Sign Out" width={28} height={28} />
              }
              iconBg="bg-ylore-red-bg"
              title="Sign Out"
              description="Sign out of your account on this device"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
