"use client";

import { FieldProps } from "@/app/types/profile";



function Field({ label, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-1">
        <span className="text-sm font-medium text-[#1A1A1A] font-dm-sans">
          {label}
        </span>
        <span className="text-sm font-medium text-[#AD0303] font-dm-sans">*</span>
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="h-14 px-4 py-3 rounded-full border border-[#BFBFBF] bg-[#F6F5F5] 
                   text-base font-medium text-[#3F3F3F] font-dm-sans 
                   focus:outline-none focus:ring-2 focus:ring-main-blue-600 focus:border-transparent"
      />
    </div>
  );
}


export default Field;