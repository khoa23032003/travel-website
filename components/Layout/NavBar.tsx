"use client";
import Logo from "@/components/Helper/Logo";
import { NAVLINKS } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import Image from "next/image";

type Props = { openNav: () => void };

const Navbar = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className={`transition-all ${navBg ? "bg-white shadow-md" : "fixed"} duration-200 h-[12vh] z-100 fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:[80%] mx-auto">
        {/* LOGO */}
        <Logo />
        {/* NAVLINKS */}
        <div className="hidden lg:flex items-center space-x-10 font-bold text-xl">
          {NAVLINKS.map((link) => {
            return (
              <Link
                href={link.url}
                key={link.id}
                className={` ${navBg ? "text-brand-dark" : "text-white"} hover:text-brand-dark font-medium transition-all duration-200 `}
              >
                <p>{link.label}</p>
              </Link>
            );
          })}
        </div>
        {/* BUTTON  */}
        <button className="px-6 py-3 rounded-full font-semibold text-sm cursor-pointer hover:bg-white hover:text-brand-dark hover:border hover:border-brand-medium transition-all duration-200 bg-brand-medium text-white hidden md:flex">
          Get Started For Free
        </button>
        {/* Burger menu  */}
        <HiBars3BottomRight
          className="w-8 h-8 cursor-pointer text-black lg:hidden"
          onClick={openNav}
        />
      </div>
    </div>
  );
};

export default Navbar;
