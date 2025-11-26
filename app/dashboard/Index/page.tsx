import Header from "../../Components/Dashboard/Header";
import Footer from "../../Components/Dashboard/Footer";
import TrendingSection from "@/app/Components/Dashboard/TrendingSection";
import TourCard from "@/app/Components/Dashboard/TourCard";
import PlaceCard from "@/app/Components/Dashboard/PlaceCard";
import MiStoryCard from "@/app/Components/Dashboard/MistoryCard";
import Image from "next/image";
import tourImage from "../../../public/images/tour.jpg";
import placesImage from "../../../public/images/places.png";
import miStoryImage from "../../../public/images/mistories.jpg";
import mapImage from "../../../public/images/map.png";

export default function Index() {
  const tours = [
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.8,
      reviews: 243,
      category: "History",
      price: 49,
      duration: "2h 30m",
      difficulty:  "$25",
      image: tourImage,
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.6,
      reviews: 152,
      category: "History",
      price: 45,
      duration: "2h 15m",
      difficulty:  "$25",
      image: tourImage,
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.9,
      reviews: 328,
      category: "History",
      price: 52,
      duration: "3h",
      difficulty: "$25",
      image: tourImage,
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.7,
      reviews: 189,
      category: "History",
      price: 48,
      duration: "2h 45m",
      difficulty: "$25",
      image: tourImage,
    },
  ];

  const places = [
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: placesImage,
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: placesImage,
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: placesImage,
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: placesImage,
    },
  ];

  const miStories = [
    {
      title: "The new Sky Lights",
      description:
        "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: miStoryImage,
    },
    {
      title: "The new Sky Lights",
      description:
        "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: miStoryImage,
    },
    {
      title: "The new Sky Lights",
      description:
        "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: miStoryImage,
    },
    {
      title: "The new Sky Lights",
      description:
        "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: miStoryImage,
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* HERO WRAPPER */}
      <div className="relative h-[550px] md:h-[683px] rounded-b-2xl overflow-hidden">

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/20">
          <Header />
        </div>
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
