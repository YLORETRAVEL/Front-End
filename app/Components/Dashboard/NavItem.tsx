export function NavItem({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 group transition-transform hover:scale-105">
      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] flex items-center justify-center">
        <img
          src={icon}
          alt={label}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
      <span className="text-white text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}