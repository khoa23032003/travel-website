import Hero from "@/components/Home/Hero";
import Hero1 from "@/components/Home/Test";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[2200px]">
      <Hero />
      <Hero1 />
    </div>
  );
}
