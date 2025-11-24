import Image from "next/image";
import MicIcon from "@/public/icons/Microphone.svg";
import SearchIcon from "@/public/icons/AI Search.svg";
import FilterIcon from "@/public/icons/voiceicon.svg";

export default function SearchBar() {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3 mb-8">

      {/* Search Icon */}
      <Image src={SearchIcon} alt="Search" className="w-6 h-6" />

      <input
        type="text"
        placeholder="Find things to do"
        className="flex-1 bg-transparent text-white placeholder:text-white outline-none text-base"
      />

      <button>
        <Image src={MicIcon} alt="Mic" className="w-4 h-4" />
      </button>

      <button className="w-8 h-8 bg-ylore-blue rounded-full flex items-center justify-center">
        <Image src={FilterIcon} alt="Filter" className="w-4 h-4" />
      </button>

    </div>
  );
}
