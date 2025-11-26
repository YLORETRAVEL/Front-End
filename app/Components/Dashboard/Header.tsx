import { ShoppingCart, User } from "lucide-react";
import { NavItem } from "./NavItem";
import SearchBar from "./SearchBar";
import logo from "../../../public/images/logo.png";
import backgroundImage from "../../../public/images/background.png";
import earthImage from "../../../public/images/earthIcon.png";
import placeIcon from "../../../public/images/Mappin-ai.png";
import MistoryIcon from "../../../public/images/closed-book-icon-1.png";
import creatorsIcon from "../../../public/images/creator-plane.png";
import hubIcon from "../../../public/images/bulb-book.png";
import Image from "next/image";

export default function Header() {
  return (
    <div
      className="
        min-h-screen 
        bg-cover 
        bg-center 
        bg-no-repeat 
        relative 
        overflow-hidden
      "
      style={{
        backgroundImage: "url(" + backgroundImage.src + ")",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ⭐ FULL-WIDTH HEADER BAR */}
      <header
        className="
          absolute top-0 left-0 right-0 
          w-full 
          flex justify-between items-center 
          px-4 sm:px-8 lg:px-12 
          py-6 
          z-20
        "
      >
        {/* ✔ FIXED LOGO */}
        <Image
          src={logo}               // no .src
          alt="Ylore Icon"
          width={100}              // required
          height={100}             // required
          className="w-20 h-20 sm:w-50 sm:h-24 object-contain"
        />

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          <button className="text-white hover:text-gray-200 transition-colors">
            <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
          </button>

          <button className="text-white hover:text-gray-200 transition-colors">
            <User className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
          </button>

          <div className="absolute -top-1 right-0 bg-ylore-error text-white text-xs font-medium px-2 py-0.5 rounded-full">
            1
          </div>
        </div>
      </header>

      {/* HERO CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-12">
        <div className="flex flex-col items-center text-center mb-12 lg:mb-28">
          <div className="max-w-2xl mb-8 lg:mb-16">
            <h1 className="text-white font-semibold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-2">
              Discover your way
            </h1>
            <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-5xl leading-tight">
              with self guided travel
            </h2>
          </div>

          <div className="w-full max-w-2xl mb-8">
            <SearchBar />

            <nav className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12">
              <NavItem icon={earthImage.src} label="Tours" />
              <NavItem icon={placeIcon.src} label="Places" />
              <NavItem icon={MistoryIcon.src} label="MiStory" />
              <NavItem icon={creatorsIcon.src} label="Creators" />
              <NavItem icon={hubIcon.src} label="HUB" />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
