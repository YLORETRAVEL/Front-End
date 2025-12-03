import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { MenuItemProps } from "@/app/types/profile";



export default function MenuItem({
  icon,
  iconBg,
  title,
  description,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full group hover:bg-gray-50 transition-colors py-1"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-[54px] h-[54px] rounded-full flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-medium text-ylore-gray-400">{title}</p>
          <p className="text-base font-normal text-ylore-gray-300">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-8 h-8 text-ylore-gray-300" strokeWidth={2} />
    </button>
  );
}
