"use client";
import { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // 🔹 Scroll disable when menu open

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // ❌ Scroll disable
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  // 🔸 Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`transition-all z-50 duration-500 ${
        isFixed
          ? "fixed top-0 left-0 w-full z-[999]  shadow-md bg-white"
          : "relative bg-white z-[50]"
      }`}
    >
      {/* 🔸 Top info bar (hidden on mobile) */}
      <div
        className={`${
          isFixed
            ? "hidden"
            : "bg-[#714605] hidden md:hidden text-[#ecd7b9] font-semibold  text-sm lg:flex justify-between items-center px-20"
        }`}
      >
        <div className="flex items-center ">
          <IoIosSearch size={40} className="px-[11px]" />
          <Link
            className="text-[12px] py-4 px-4 border-l border-r border-[#8b6325] hover:bg-[#e3d3bc] hover:text-[#714605] transition-all duration-500"
            href="/about"
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
            href="/contact"
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
      <div className="flex justify-between items-center px-4 md:px-10  lg:px-20 py-4">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.webp"
            alt="Indolanka Matrimonial Logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-xl text-[#5C3A00]">
            indolanka matrimonial services
          </h1>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:hidden lg:flex space-x-8 text-[#5C3A00] font-semibold text-[14px]">
          <Link href="/" className="hover:text-black transition">
            HOME
          </Link>
          <Link href="/about" className="hover:text-black transition">
            ABOUT
          </Link>
          <Link href="/gallery" className="hover:text-black transition">
            GALLERY
          </Link>
          <Link href="/service" className="hover:text-black transition">
            SERVICE
          </Link>
          <Link href="/contact" className="hover:text-black transition">
            CONTACT
          </Link>
          <Link href="/register" className="hover:text-black transition">
            REGISTRY FREE
          </Link>
        </nav>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#5C3A00] focus:outline-none"
        >
          {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* 📱 Mobile Menu (Framer Motion Animation) */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed lg:hidden top-0 right-0 w-1/2 h-full z-[50] bg-white shadow-2xl  flex flex-col items-start px-5 pt-10 justify-start space-y-2 text-black font-semibold text-[15px]"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-[#5C3A00]"
            >
              <HiX size={30} />
            </button>
            <Link
              className="border-b w-full pb-3"
              href="/"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="border-b w-full pb-3"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="border-b w-full pb-3"
              onClick={toggleMenu}
            >
              Gallery
            </Link>
            <Link
              href="/service"
              className="border-b w-full pb-3"
              onClick={toggleMenu}
            >
              Service
            </Link>
            <Link
              href="/contact"
              className="border-b w-full pb-3"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              href="/register"
              className="border-b w-full pb-3"
              onClick={toggleMenu}
            >
              Registry Free
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
