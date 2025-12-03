
import { StatsCardProps } from "@/app/types/profile";
import { ReactNode } from "react";



export default function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
   <div className="flex flex-col items-center justify-center gap-4 px-6 py-5 w-[150px] h-[150px] rounded-xl border border-ylore-gray-40 bg-white shadow-[0_0_8px_0_#DDE6E8]">


      <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full bg-ylore-blue-50">
        {icon}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-base font-medium text-ylore-gray-200 text-center leading-tight">
          {label}
        </p>
        <p className="text-2xl font-semibold text-ylore-text-primary text-center">
          {value}
        </p>
      </div>
    </div>
  );
}
