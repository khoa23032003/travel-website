import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { locations } from "@/data/a";
import LocalCard from "@/components/commom/LocalCard";
const ListLocationCard = () => {
  return (
    <div className="flex flex-col w-full container mx-auto mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mx-4 sm:mx-2 sm:items-center py-6 border-b border-gray-100 gap-4">
        {/* Khối bên trái: Tiêu đề chính + Subtitle nhỏ để tăng chiều sâu */}
        <div className="space-y-1">
          <h2 className="text-center font-black text-2xl md:text-3xl tracking-tight text-brand-medium ">
            Danh sách các tỉnh thành Việt Nam
          </h2>
          <p className="text-center sm:text-left text-sm text-gray-500 font-medium">
            Tìm kiếm và lựa chọn điểm đến lý tưởng cho chuyến đi của bạn
          </p>
        </div>

        {/* Khối bên phải: Biến thành một nút bấm (Call to Action) có hiệu ứng mượt mà */}
        <button className="group flex items-center gap-2 font-bold text-base md:text-lg text-accent-orange hover:text-orange-600 transition-colors duration-300 bg-orange-50 hover:bg-orange-100/70 px-4 py-2.5 rounded-full shadow-sm shadow-orange-500/5 active:scale-95">
          Khám phá thêm tại đây
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full  "
      >
        <CarouselContent>
          {locations.map((location, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4 "
            >
              <div className="p-1 h-full">
                <LocalCard location={location} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ListLocationCard;
