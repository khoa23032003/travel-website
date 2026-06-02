import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <Image
      src="/image/VinhHaLong.jpg"
      width={500}
      height={300}
      className="w-full h-auto"
      alt={"Vịnh Hạ Long"}
    />
  );
};

export default Hero;
