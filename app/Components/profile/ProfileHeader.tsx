import { Mic, Search } from "lucide-react";
import SearchBar from "../Dashboard/SearchBar";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1a49ba1fb473d8aa04056a6709e4fd501efad5a8?width=260"
          alt="Profile"
          className="w-[130px] h-[130px] rounded-full object-cover"
        />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-semibold text-black">MrFranceEU</h1>
          <div className="flex flex-col items-center">
            <p className="text-lg text-ylore-gray-200">
              NewYork, United States
            </p>
            <p className="text-lg text-ylore-gray-200">55 Followers</p>
          </div>
        </div>
      </div>

    <SearchBar/>
    </div>
  );
}
