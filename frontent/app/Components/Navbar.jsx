"use client";
import { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

import { FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-500 ${
        isFixed
          ? "fixed top-0 left-0 w-full z-50 translate-y-0 shadow-md bg-white"
          : "relative bg-white"
      }`}
    >
      {/* 🔸 Top info bar */}
      <div
        className={`${
          isFixed
            ? "hidden"
            : "bg-[#714605] hidden md:hidden text-[#ecd7b9] font-semibold  text-sm lg:flex justify-between items-center px-20"
        }`}
      >
        <div className="flex items-center   ">
          <IoIosSearch size={40} className="px-[11px]" />
          <Link
            className="text-[12px] py-4 px-4 border-l border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-[12px] py-4 px-5  border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="#"
          >
            FAQ
          </Link>
          <Link
            className="text-[12px] py-4 px-4   hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="#"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center">
          <a
            className="text-[12px] flex items-center py-[14px] px-4  border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="tel:+918524054040"
          >
            <IoCall className="px-1" size={20} />
            +91 8524054040
          </a>

          <a
            className="text-[12px] py-4 px-4  border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="mailto:info@indolankamatrimony.com"
          >
            info@indolankamatrimony.com
          </a>
          <a
            className="text-[12px] py-4 px-4  border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="https://www.instagram.com/nagaboosaniammanaalayam"
            target="_blank"
          >
            <FaInstagram size={15} />
          </a>
          <a
            className="text-[12px] py-4 px-4  border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="https://www.youtube.com/@nagaboosaniammanaalayam"
            target="_blank"
          >
            <FaYoutube size={15} />
          </a>
        </div>
      </div>

      {/* 🔸 Main navbar */}
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Indolanka Matrimonial Logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-xl font-semibold text-[#5C3A00]">
            indolanka matrimonial services
          </h1>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex space-x-8 text-[#5C3A00] font-medium">
          <a href="#home" className="hover:text-black transition">
            HOME
          </a>
          <a href="#about" className="hover:text-black transition">
            ABOUT
          </a>
          <a href="#gallery" className="hover:text-black transition">
            GALLERY
          </a>
          <a href="#service" className="hover:text-black transition">
            SERVICE
          </a>
          <a href="#contact" className="hover:text-black transition">
            CONTACT
          </a>
          <a href="#register" className="hover:text-black transition">
            REGISTRY FREE
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
