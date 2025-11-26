import { Star, DollarSign, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import { TourCardProps } from "@/app/types/dashboard";
import HeartIcon from "@/public/icons/hearticon.svg";
import ShareIcon from "@/public/icons/shareicon.svg";

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
      <Image
        src={image}
        alt={title}
        width={800}
        height={800}
        className="absolute inset-0  object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <div className="absolute top-3.5 right-4 flex gap-2">
        <button>
          <Image src={HeartIcon.src} alt="heart" width={40} height={40} />
        </button>
        <button>
          <Image src={ShareIcon.src} alt="share" width={40} height={40} />
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
            {difficulty}
          </button>
        </div>
      </div>
    </div>
  );
}
