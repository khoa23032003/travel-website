import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
type Location = {
  id: string;
  name: string;
  image: string;
  seoDescription: string;
};

type LocationCardProps = {
  location: Location;
};

const LocalCard = ({ location }: LocationCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-lg bg-slate-900 aspect-[3/4] cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* 1. KHU VỰC HÌNH ẢNH */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          alt={location.name}
          src={location.image}
          fill /* Dùng fill để ảnh tự điền đầy khung aspect-[3/4] */
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none"
        />
        {/* Lớp phủ Gradient làm tối dần về phía đáy để text luôn luôn nổi bật, dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
      </div>

      {/* 2. KHU VỰC NỘI DUNG (Nằm đè lên ảnh) */}
      <CardContent className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-10 text-white select-none">
        {/* Tên tỉnh thành */}
        <h3 className="text-lg sm:text-xl font-bold tracking-wide drop-shadow-md uppercase line-clamp-1 group-hover:text-amber-400 transition-colors">
          {location.name}
        </h3>

        {/* Đoạn mô tả ngắn (SEO) - Giới hạn 2 dòng, ẩn hiện mượt mà khi hover */}
        <p className="mt-1 text-xs text-gray-300/90 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-12 transition-all duration-500 ease-in-out">
          {location.seoDescription}
        </p>

        {/* Nút Khám phá nhanh gọn, tinh tế */}
        <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <button className="w-full py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 active:scale-95 transition-all flex items-center justify-center gap-1">
            <span>Khám phá ngay</span>
            <svg
              className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalCard;
