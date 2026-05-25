import React from "react";
import Image from "next/image";

interface TechCardProps {
  id: number;
  main: string;
  alt: string;
  changeId: (id: number) => void;
  lightIcon?: string;
  darkIcon?: string;
}

const TechCard: React.FC<TechCardProps> = ({ id, main, alt, changeId }) => {
  return (
    <div
      className="tech group relative h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-md sm:rounded-lg md:rounded-xl transition-all duration-300 bg-black/5 lg:bg-none lg:hover:bg-black/10 dark:bg-white/25 dark:lg:bg-none dark:lg:hover:bg-slate-50/50 cursor-pointer"
      onClick={() => {
        changeId(id);
      }}
    >
      <div className="h-full w-full p-2 md:p-3 lg:p-4 relative">
        <Image
          src={main}
          fill
          className="select-none group-hover:scale-[1.1] transition-all duration-700 object-contain p-2 md:p-3 rounded-lg md:rounded-xl lg:rounded-2xl"
          alt={alt}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </div>
    </div>
  );
};

export default TechCard;