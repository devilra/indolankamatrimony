"use client";

import {
  icons,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DASHBOARD_BASE_PATH = "/dashboard";

const navItems = [
  {
    href: `${DASHBOARD_BASE_PATH}`,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: `${DASHBOARD_BASE_PATH}/profiles`,
    label: "Profiles List",
    icon: User,
  },
  {
    href: `${DASHBOARD_BASE_PATH}/settings`,
    label: "Settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => {
    if (href === DASHBOARD_BASE_PATH) {
      return pathname === href;
    }

    return pathname.startsWith(href) && href !== DASHBOARD_BASE_PATH;
  };

  const handleLogout = () => {
    setIsOpen(false);
    alert("Logout Logic Here (e.g., dispatch(adminLogout()))");
  };

  return (
    <>
      {/* ======================================================= */}
      {/* 1. Mobile Menu Toggle Button */}
      {/* ======================================================= */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ======================================================= */}
      {/* 2. Mobile Overlay */}
      {/* ======================================================= */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ======================================================= */}
      {/* 3. The Actual Sidebar */}
      {/* ======================================================= */}

      <aside
        className={`w-64 bg-gray-800 text-white min-h-screen p-4 shadow-2xl fixed top-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <h2 className="text-3xl font-extrabold  mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Admin Panel
        </h2>

        <nav>
          <ul>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-xl transition duration-200 ${
                      active
                        ? "bg-gray-200 text-gray-900 shadow-md font-semibold"
                        : "hover:bg-gray-700 hover:text-indigo-300 text-gray-300"
                    }`}
                  >
                    <IconComponent size={20} className="mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full p-3 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-xl transition shadow-lg"
          >
            <LogOut size={20} className="mr-2" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
