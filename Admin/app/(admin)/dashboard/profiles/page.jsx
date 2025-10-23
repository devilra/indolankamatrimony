"use client";

import { adminGetAllProfiles } from "@/app/redux/Slices/adminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt, FaSearch, FaFilter } from "react-icons/fa";

// ----------------------------------------------------
// Dummy Data for Filter Options (Backend data-va base panni maathikonga)
// ----------------------------------------------------
const MARITAL_STATUS_OPTIONS = [
  "All",
  "Single",
  "Married",
  "Divorced",
  "Widowed",
];
const GENDER_OPTIONS = ["All", "Male", "Female"];

const AllProfiles = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMaritalStatus, setFilterMaritalStatus] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  const { profiles, loading, error } = useSelector((state) => state.admin);

  // ----------------------------------------------------
  // 1. Data Fetching
  // ----------------------------------------------------
  useEffect(() => {
    // Initial data load
    dispatch(adminGetAllProfiles());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        👥 Profiles List
      </h1>

      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search (ID, Name, Email)
        </label>
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            className="w-full flex-1 min-w-0 block px-3 py-2  border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter ID, Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none flex items-center">
            <FaSearch className="mr-1" /> Search
          </button>
        </div>
      </div>

      {/* Marital Status Filter */}
      <div className="min-w-[150px] mt-5 ">
        <label
          htmlFor="marital-status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Marital Status
        </label>
        <select
          id="marital-status"
          className="block w-full md:w-1/2 lg:w-1/4  px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {MARITAL_STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Gender Filter */}
      <div className="min-w-[150px] mt-5">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Gender
        </label>
        <select className="block w-full md:w-1/2 lg:w-1/4  px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AllProfiles;
