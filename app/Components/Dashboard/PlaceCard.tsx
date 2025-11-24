import { PlaceCardProps } from "@/app/types/dashboard";
import { Star, MapPin } from "lucide-react";

export default function PlaceCard({
  title,
  location,
  description,
  rating,
  reviews,
  category,
  image,
}: PlaceCardProps) {
  return (
    <div className="relative w-full md:w-[410px] h-[250px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
      
      <div className="absolute top-3.5 right-4 flex gap-2">
        <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V14M8 2L3 7M8 2L13 7"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13L2.5 7.5C1.5 6.5 1 5 1.5 3.5C2 2 3.5 1 5 1C6 1 7 1.5 8 2.5C9 1.5 10 1 11 1C12.5 1 14 2 14.5 3.5C15 5 14.5 6.5 13.5 7.5L8 13Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-3.5 left-4 right-4 flex flex-col gap-1">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
          <p className="text-white/90 text-sm mb-1">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-white/70">({reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="text-white/90">{category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
