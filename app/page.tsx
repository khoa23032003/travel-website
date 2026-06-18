import Hero from "@/components/Home/Hero";
import ListLocationCard from "@/components/Home/ListLocationCard";
import LocationCard from "@/components/Home/ListLocationCard";
import Hero1 from "@/components/Home/Test";
import UserReview from "@/components/Home/UserReview";
import WeatherList from "@/components/Home/WeatherList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <ListLocationCard />
      <UserReview />
      <WeatherList />
    </div>
  );
}
