"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, UserCircle } from "lucide-react";

// Local Icons
import LogoIcon from "@/public/icons/profile/ylorTravels.png";
import HomeIcon from "@/public/icons/profile/home.png";
import ToursIcon from "@/public/icons/profile/Earth-e.png";
import PlacesIcon from "@/public/icons/profile/Mappin-ai.png";
import MiStoryIcon from "@/public/images/closed-book-icon-1.png";
import { NavItemProps } from "@/app/types/profile";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-3.5">
        <div className="flex items-center justify-between">

          {/* LEFT SECTION — LOGO */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <div className=" flex-shrink-0">
              <Image 
                src={LogoIcon}
                alt="Ylore Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* CENTER SECTION — NAVIGATION */}
          <div className="hidden md:flex items-center justify-center gap-12 flex-grow">
            <NavItem icon={HomeIcon} label="Home" to="/dashboard" />
            <NavItem icon={ToursIcon} label="Tours" to="/tours" />
            <NavItem icon={PlacesIcon} label="Places" to="/places" />
            <NavItem icon={MiStoryIcon} label="MiStory" to="/mistory" />
          </div>
  
          {/* RIGHT SECTION — CART & PROFILE */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center justify-center p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <ShoppingCart className="w-7 h-7 text-[#1A1A1A]" strokeWidth={1.5} />
            </button>

            <button className="flex items-center justify-center p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <UserCircle className="w-7 h-7 text-[#1A1A1A]" strokeWidth={1.5} />
            </button>
          </div>
  
        </div>
      </div>
    </nav>
  );
}



function NavItem({ icon, label, to }: NavItemProps) {
  return (
    <Link href={to} className="flex flex-col items-center gap-0 group">
      <div className="w-8 h-8 flex items-center justify-center mb-[-4px]">
        <Image src={icon} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="text-base font-medium text-[#888888] group-hover:text-[#1A1A1A] transition-colors">
        {label}
      </span>
    </Link>
  );
}
