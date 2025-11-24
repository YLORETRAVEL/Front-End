
import { MiStoryCardProps } from "@/app/types/dashboard";
import { Clock, Library } from "lucide-react";


export default function MiStoryCard({
  title,
  description,
  author,
  duration,
  category,
  image,
}: MiStoryCardProps) {
  return (
    <div className="relative w-full md:w-[410px] h-[250px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-3.5 left-4 right-4 flex flex-col gap-2">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">
                  {author.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <span className="font-medium">{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Library className="w-3 h-3" />
              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
