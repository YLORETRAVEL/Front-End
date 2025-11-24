import Image from "next/image";
import InstagramIcon from "@/public/icons/InstaIcon.svg";
import YoutubeIcon from "@/public/icons/YoutubeIcon.svg";
import LinkedinIcon from "@/public/icons/tiktok-fill-svgrepo-com 1.svg"; 

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            
            {/* Left Section */}
            <div className="flex flex-col gap-6 md:pr-12">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2a8040ebae531b151134a40aa4496b3439884d4b?width=234"
                alt="Ylore Travel"
                className="h-[84px] w-auto object-contain object-left"
              />

              <div className="flex flex-col gap-1">
                <p className="text-white font-geist text-base font-semibold">Need help?</p>
                <p className="text-white font-geist text-base">Contact Us</p>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-ylore-blue transition-colors">
                  <Image src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
                </a>

                <a href="#" className="hover:text-ylore-blue transition-colors">
                  <Image src={LinkedinIcon} alt="LinkedIn" className="w-6 h-6" />
                </a>

                <a href="#" className="hover:text-ylore-blue transition-colors">
                  <Image src={YoutubeIcon} alt="YouTube" className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-geist text-base font-semibold">Navigation</h3>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-white hover:text-ylore-blue">Places</a>
                <a href="#" className="text-white hover:text-ylore-blue">Tours</a>
                <a href="#" className="text-white hover:text-ylore-blue">Creators</a>
                <a href="#" className="text-white hover:text-ylore-blue">MiStory</a>
                <a href="#" className="text-white hover:text-ylore-blue">HUB</a>
              </nav>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-geist text-base font-semibold">Resources</h3>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-white hover:text-ylore-blue">Contact Us</a>
                <a href="#" className="text-white hover:text-ylore-blue">Our Story</a>
                <a href="#" className="text-white hover:text-ylore-blue">Work with Us</a>
                <a href="#" className="text-white hover:text-ylore-blue">Support</a>
              </nav>
            </div>

            {/* Account */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-geist text-base font-semibold">Account</h3>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-white hover:text-ylore-blue">Your Account</a>
                <a href="#" className="text-white hover:text-ylore-blue">Settings</a>
                <a href="#" className="text-white hover:text-ylore-blue">Accessibility</a>
              </nav>
            </div>
          </div>

          <div className="h-px bg-white/20" />

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-white text-base">Copyright © 2025 Ylore Travel.</p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="text-white hover:text-ylore-blue">Privacy Policy</a>
              <a href="#" className="text-white hover:text-ylore-blue">Terms of Service</a>
              <a href="#" className="text-white hover:text-ylore-blue">Cookies Settings</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
