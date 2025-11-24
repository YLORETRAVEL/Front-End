
import Header from "../../Components/Dashboard/Header";
import Footer from "../../Components/Dashboard/Footer";
import TrendingSection from "@/app/Components/Dashboard/TrendingSection";
import TourCard from "@/app/Components/Dashboard/TourCard";
import PlaceCard from "@/app/Components/Dashboard/PlaceCard";
import MiStoryCard from "@/app/Components/Dashboard/MistoryCard";

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
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80",
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.6,
      reviews: 152,
      category: "History",
      price: 45,
      duration: "2h 15m",
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1519821172144-4f87d85de2a1?w=800&q=80",
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.9,
      reviews: 328,
      category: "History",
      price: 52,
      duration: "3h",
      difficulty: 3,
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    },
    {
      title: "Historic Downtown Walking",
      location: "Manhattan, NY",
      rating: 4.7,
      reviews: 189,
      category: "History",
      price: 48,
      duration: "2h 45m",
      difficulty: 2,
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
    },
    {
      title: "NYC Public Library",
      location: "Manhattan, NY",
      description: "Iconic Beaux-Arts building housing millions of books",
      rating: 4.8,
      reviews: 426,
      category: "Library",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800&q=80",
    },
  ];

  const miStories = [
    {
      title: "The new Sky Lights",
      description: "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    },
    {
      title: "The new Sky Lights",
      description: "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80",
    },
    {
      title: "The new Sky Lights",
      description: "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80",
    },
    {
      title: "The new Sky Lights",
      description: "These new sky lights are the most beautiful skylights in the northern region of",
      author: "Mirance EU",
      duration: "5 min read",
      category: "Library",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    },
  ]

  return (
  
<div className="min-h-screen bg-white relative">

  {/* HERO SECTION */}
 <div className="relative h-[550px] md:h-[683px] rounded-b-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2880&q=80"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <Header />

     
      </div>

  {/* ⭐ FIXED MAP BUTTON (works now because it's outside the hero wrapper) */}
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
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/e1644657b45824cb858d4546739a711ca40f1725?width=78"
      alt="Map"
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
