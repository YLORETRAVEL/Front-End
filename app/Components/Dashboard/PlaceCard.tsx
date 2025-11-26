import { PlaceCardProps } from "@/app/types/dashboard";
import { Star, MapPin } from "lucide-react";

import ArrowDownIcon from "@/public/icons/shareicon.svg"
import HeartIcon from "@/public/icons/hearticon.svg";
import Image from "next/image";

export default function PlaceCard({
  title,
  description,
  rating,
  reviews,
  category,
  image,
}: PlaceCardProps) {
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
        <button >
          <Image src={ArrowDownIcon.src} alt="arrow" width={40} height={40} />
        </button>
        <button >
          <Image src={HeartIcon.src} alt="heart"  width={40} height={40} />
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
