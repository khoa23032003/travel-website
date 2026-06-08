"use client";

import React, { useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/constant/destinations";

const Hero1 = () => {
  // Quản lý index của địa điểm đang hiển thị chính
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  // Lấy dữ liệu của địa điểm hiện tại
  const currentData = destinations[currentIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-black select-none">
      {/* 1. LỚP ĐÁY: Ảnh nền chuyển động mượt mà */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentData.id} // key thay đổi sẽ kích hoạt hiệu ứng fade ảnh nền
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            alt={currentData.location}
            src={currentData.bgImage}
            fill // Dùng fill thay cho width/height cố định để ảnh responsive toàn màn hình
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* LỚP PHỦ: Làm tối nền */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />

      {/* LỚP TRÊN CÙNG: Khung lưới 12 cột */}
      <div className="relative z-20 grid grid-cols-12 h-full items-center px-12">
        {/* Cột 1: Thanh số dọc (Hiển thị số thứ tự động) */}
        <div className="col-span-1 flex flex-col items-center gap-3 font-bold opacity-60">
          <span>0{currentData.id}</span>
          <div className="h-20 w-[2px] bg-white/30 relative">
            {/* Thanh tiến trình chạy theo slide */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-white"
              animate={{
                height: `${(currentData.id / destinations.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span>0{destinations.length}</span>
        </div>

        {/* Cột 2: Nội dung chữ bên trái (Hiệu ứng bay từ dưới lên) */}
        <div className="col-span-5 flex flex-col justify-center items-start gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentData.id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <h1 className="font-black text-7xl text-white tracking-wider uppercase drop-shadow-lg">
                {currentData.location}
              </h1>
              <h2 className="font-bold text-2xl text-amber-400">
                {currentData.title}
              </h2>
              <p className="text-start text-sm leading-relaxed text-gray-300 max-w-md">
                {currentData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 my-2 shadow-lg shadow-orange-600/30 transition-all">
            Khám phá ngay
          </button>
        </div>

        <div className="col-span-1"></div>

        {/* Cột 4: Khu vực danh sách hình ảnh bên phải */}
        <div className="col-span-5 flex flex-col gap-6 items-start w-full">
          {/* Hàng chứa các thẻ card nhỏ */}
          <div className="flex gap-4 items-center overflow-x-auto no-scrollbar w-full py-4">
            {destinations.map((dest, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.div
                  key={dest.id}
                  layout // Giúp các card tự động di chuyển mượt mà khi vị trí thay đổi
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ y: -8 }}
                  className={`relative w-40 h-60 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-2xl transition-all duration-300 ${
                    isActive
                      ? "ring-4 ring-orange-500 scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={dest.cardImage}
                    alt={dest.title}
                    fill
                    className="object-cover"
                  />
                  {/* Lớp phủ mờ trong thẻ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Tên địa danh nhỏ dưới đáy thẻ */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      {dest.location}
                    </p>
                    <p className="text-xs font-bold line-clamp-1">
                      {dest.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hàng chứa nút bấm chuyển đổi */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
