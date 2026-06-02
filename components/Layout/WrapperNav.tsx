"use client";
import MoblieNavBar from "@/components/Layout/MoblieNavBar";
import Navbar from "@/components/Layout/NavBar";
import React, { use, useState } from "react";

const WrapperNav = () => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);
  return (
    <div>
      <Navbar openNav={openNavHandler} />
      <MoblieNavBar showNav={showNav} closeNav={closeNavHandler} />
    </div>
  );
};

export default WrapperNav;
