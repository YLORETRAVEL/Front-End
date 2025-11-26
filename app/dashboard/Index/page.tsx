import Header from "../../Components/Dashboard/Header";
import Footer from "../../Components/Dashboard/Footer";
import TrendingSection from "@/app/Components/Dashboard/TrendingSection";
import TourCard from "@/app/Components/Dashboard/TourCard";
import PlaceCard from "@/app/Components/Dashboard/PlaceCard";
import MiStoryCard from "@/app/Components/Dashboard/MistoryCard";
import Image from "next/image";
import mapImage from "../../../public/images/map.png";
import { tours, places, miStories } from "./indexPageDummyData";

export default function Index() {
 
  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="relative h-[550px] md:h-[683px] rounded-b-2xl overflow-hidden">
        <Header />
      </div>

      {/* ⭐ FIXED MAP BUTTON */}
      <button
        className="
          absolute left-1/2 -translate-x-1/2 
          top-[550px] md:top-[655px]
          z-50 
          flex items-center gap-2 
          px-4 py-2 md:px-3 md:py-2.5 
          bg-white 
          rounded-full shadow-lg 
          hover:shadow-xl transition-shadow
        "
      >
        <Image
          src={mapImage}
          alt="Map"
          width={40}
          height={40}
          className="w-8 h-8"
        />
        <span className="text-ylore-blue-dark font-medium text-base">Maps</span>
      </button>

      {/* MAIN CONTENT */}
      <main className="max-w-[1900px] mx-auto px-4 md:px-16 py-12 md:py-16 flex flex-col gap-10">
        <TrendingSection title="Trending Tours">
          {tours.map((tour, idx) => (
            <TourCard key={idx} {...tour} />
          ))}
        </TrendingSection>

        <TrendingSection title="Trending Places">
          {places.map((place, idx) => (
            <PlaceCard key={idx} {...place} />
          ))}
        </TrendingSection>

        <TrendingSection title="Trending MiStories">
          {miStories.map((story, idx) => (
            <MiStoryCard key={idx} {...story} />
          ))}
        </TrendingSection>
      </main>

      <Footer />
    </div>
  );
}
