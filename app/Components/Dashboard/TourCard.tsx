import { Star, DollarSign, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import HeartIcon from "@/public/icons/heart.svg";
import ShareIcon from "@/public/icons/share.svg";
import TrendingIcon from "@/public/icons/trending.svg";
import StarIcon from "@/public/icons/star.svg";
import DollarIcon from "@/public/icons/dollar.svg";
import ClockIcon from "@/public/icons/clock.svg";

interface TourCardProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  category: string;
  price: number;
  duration: string;
  difficulty: number;
  image: string;
}

export default function TourCard({
  title,
  location,
  rating,
  reviews,
  category,
  price,
  duration,
  difficulty,
  image,
}: TourCardProps) {
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
              d="M8 13L2.5 7.5C1.5 6.5 1 5 1.5 3.5C2 2 3.5 1 5 1C6 1 7 1.5 8 2.5C9 1.5 10 1 11 1C12.5 1 14 2 14.5 3.5C15 5 14.5 6.5 13.5 7.5L8 13Z"
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
              d="M8 2V14M8 2L3 7M8 2L13 7"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-3.5 left-4 right-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{category}</span>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
          <p className="text-white/90 text-sm">{location}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-white/70">({reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>
          <button className="px-4 py-1.5 bg-white text-ylore-gray-500 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
            {difficulty}/5
          </button>
        </div>
      </div>
    </div>
  );
}
