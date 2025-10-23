import React from "react";
import Sidebar from "./Components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />

        {/* Right Content Area */}
        {/* Sidebar width (w-64) ku equal-a margin (ml-64) kodukkanum */}
        <main
          className="flex-1 p-4 pt-20 lg:p-8 
                   lg:ml-64 
                   w-full"
        >
          <div className="max-w-7xl overflow-x-hidden mx-auto">
            {children} {/* 👈 Active route-oda content inga render aagum */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
