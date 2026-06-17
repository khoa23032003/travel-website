import Hero from "@/components/Home/Hero";
import ListLocationCard from "@/components/Home/ListLocationCard";
import LocationCard from "@/components/Home/ListLocationCard";
import Hero1 from "@/components/Home/Test";
import WeatherList from "@/components/Home/WeatherList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[2200px]">
      <Hero />
      <ListLocationCard />
      <WeatherList />
    </div>
  );
}
