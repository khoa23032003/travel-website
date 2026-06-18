import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { userReview } from "@/data/user-review";
import { MapPin, Quote } from "lucide-react"; // Đừng quên cài lucide-react nếu chưa có nhé
import Image from "next/image";

const UserReview = () => {
  return (
    <div className="w-full bg-brand-medium py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Phần Tiêu Đề Khối Review */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white  mb-4">
            Trải nghiệm du lịch Việt Nam
          </h2>
          <p className="text-white text-lg">
            Những trải nghiệm chân thực từ những bước chân khám phá khắp mọi
            miền tổ quốc.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full">
          {userReview.map((item) => (
            <Card
              key={item.id}
              className="break-inside-avoid mb-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                {/* Avatar bọc tròn tinh tế */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-medium/20 group-hover:ring-brand-medium transition-all">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Thông tin User */}
                <div className="flex flex-col min-w-0">
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 truncate text-base leading-tight">
                    {item.name}
                    <span className="text-xs font-normal text-zinc-400 ml-2">
                      ({item.age}t)
                    </span>
                  </h3>

                  {/* Địa điểm check-in */}
                  <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative pt-2">
                <Quote className="absolute right-4 bottom-4 w-12 h-12 text-zinc-100 dark:text-zinc-800/50 -z-0 pointer-events-none transform rotate-180" />

                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed relative z-10 italic">
                  {item.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReview;
