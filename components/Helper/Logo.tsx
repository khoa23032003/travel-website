import React from "react";
import { AiOutlineSketch } from "react-icons/ai";

const Logo = () => {
  return (
    <div className="group flex items-center gap-4 cursor-pointer">
      <div
        className="
      flex items-center justify-center  rounded-full p-2 bg-brand-dark shadow-lg transition-all duration-300 group-hover:scale-110
    "
      >
        <AiOutlineSketch className="text-white text-3xl " />
      </div>

      <div>
        <div className="text-2xl lg:text-xl md:text-2xl font-extrabold tracking-wide text-brand-dark">
          MK Travel
        </div>

        <p className="hidden lg:flex md:text-xs uppercase tracking-[3px] text-text-muted">
          Du lịch Việt Nam
        </p>
      </div>
    </div>
  );
};

export default Logo;
