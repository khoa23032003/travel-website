"use client";
import React, { useState } from "react";
import Image from "next/image";
import { destinations } from "@/constant/destinations";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  // currentIndex tăng giảm vô hạn để phục vụ vòng lặp trượt mượt mà
  const [currentIndex, setCurrentIndex] = useState(0);
  const N = destinations.length;

  // Quy đổi index vô hạn về index thực tế (0 đến N-1) bằng toán tử phần trăm %
  const activeDataIndex = ((currentIndex % N) + N) % N;
  const currentData = destinations[activeDataIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // Tạo một "Cửa sổ hiển thị" luôn chứa 6 hình liên tiếp tính từ vị trí hiện tại
  const visibleItems = Array.from({ length: 6 }, (_, i) => {
    const virtualIndex = currentIndex + i;
    const dataIndex = ((virtualIndex % N) + N) % N;
    return {
      ...destinations[dataIndex],
      virtualIndex, // Key định danh duy nhất cho từng lượt trượt
    };
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-black select-none">
      {/* 1. LỚP ĐÁY: Ảnh nền chuyển động mượt mà */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentData.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            alt={currentData.location}
            src={currentData.bgImage}
            fill
            sizes="160px"
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Lớp phủ Gradient làm tối nền */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 lg:bg-black/50" />

      <div className="relative z-10 flex flex-col justify-end lg:grid lg:grid-cols-12 h-full w-full px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 pb-10 pt-20 lg:py-0 lg:items-center gap-8 lg:gap-0">
        {/* KHU VỰC 1: Chữ và văn bản */}
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-none lg:col-span-5 xl:col-span-4 flex flex-col items-start gap-3 md:gap-4 order-1">
          <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-1.5 md:gap-3"
              >
                <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl tracking-wider uppercase drop-shadow-2xl leading-none text-white">
                  {currentData.location}
                </h1>

                <h2 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-amber-400 tracking-wide">
                  {currentData.title}
                </h2>

                <p className="text-start text-xs sm:text-sm leading-relaxed text-gray-300 max-w-md line-clamp-3 md:line-clamp-4 lg:line-clamp-none opacity-90">
                  {currentData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm md:text-base px-5 py-2.5 sm:px-6 sm:py-3 shadow-lg shadow-orange-600/30 active:scale-95 transition-all mt-1 md:mt-2">
            Khám phá ngay
          </button>
        </div>

        {/* Cột trống giữa chữ và hình */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* KHU VỰC 2: Slider Hình Ảnh Vô Tận */}
        <div className="w-full lg:col-span-5 xl:col-span-6 flex flex-col gap-4 md:gap-5 items-start overflow-hidden order-2">
          <div className="w-full overflow-hidden py-2 px-1">
            <motion.div
              className="flex md:p-6 p-0 gap-4 items-center w-max cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              dragMomentum={false}
              onDragEnd={(e, info) => {
                const offsetThreshold = 40;
                const velocityThreshold = 400;

                const isSwipeLeft =
                  info.offset.x < -offsetThreshold ||
                  info.velocity.x < -velocityThreshold;
                const isSwipeRight =
                  info.offset.x > offsetThreshold ||
                  info.velocity.x > velocityThreshold;

                if (isSwipeLeft) handleNext();
                if (isSwipeRight) handlePrev();
              }}
              // Luôn trả về tâm x: 0 vì Framer Motion layout sẽ lo phần chuyển động trượt của các phần tử con
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              {visibleItems.map((dest, index) => {
                // Thẻ đầu tiên trong mảng hiển thị luôn luôn là thẻ đang Active
                const isActive = index === 0;
                return (
                  <motion.div
                    key={dest.virtualIndex} // Bắt buộc dùng virtualIndex để kích hoạt hiệu ứng layout trượt
                    layout
                    onClick={() => setCurrentIndex(dest.virtualIndex)}
                    whileHover={{ y: -6 }}
                    className={`relative md:w-72 md:h-96 w-60 h-84 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-2xl transition-all duration-300 ${
                      isActive
                        ? "ring-4 ring-orange-500 scale-100 lg:scale-105 z-20"
                        : "opacity-40 sm:opacity-50 scale-95 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={dest.cardImage}
                      alt={dest.title}
                      fill
                      sizes="160px"
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                        {dest.location}
                      </p>
                      <p className="text-xs sm:text-sm font-bold line-clamp-1 text-white">
                        {dest.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Hàng chứa nút bấm và Số chỉ mục (01 / 05) */}
          <div className="w-full flex justify-between items-center gap-4 px-1">
            <div className="text-xs sm:text-sm font-medium tracking-widest text-white/50">
              <span className="text-white font-bold">
                {(activeDataIndex + 1).toString().padStart(2, "0")}
              </span>
              {" / "}
              {N.toString().padStart(2, "0")}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black active:scale-90 transition-all text-lg bg-black/20 backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black active:scale-90 transition-all text-lg bg-black/20 backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
