import { ReactNode } from "react";

interface TrendingSectionProps {
  title: string;
  children: ReactNode;
}

export default function TrendingSection({ title, children }: TrendingSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">{title}</h2>
        <button className="px-6 md:px-8 py-2.5 bg-ylore-bg rounded-full text-ylore-gray-500 text-base md:text-lg font-medium hover:bg-gray-200 transition-colors">
          See All
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
