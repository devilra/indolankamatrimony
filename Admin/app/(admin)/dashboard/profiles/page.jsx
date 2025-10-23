"use client";

import { adminGetAllProfiles } from "@/app/redux/Slices/adminSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt, FaSearch, FaFilter } from "react-icons/fa";
import ProfileTableSkeleton from "../Components/ProfileTableSkeleton";

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
  // const [loading] = useState(true);

  const { profiles, loading, error, profileCount } = useSelector(
    (state) => state.admin
  );

  // ----------------------------------------------------
  // 1. Data Fetching
  // ----------------------------------------------------
  //   useEffect(() => {
  //     // Initial data load
  //     dispatch(adminGetAllProfiles());
  //   }, [dispatch]);

  // API Call function-a useCallback-la wrap pannuvom

  const fetchProfiles = useCallback(
    (filters) => {
      dispatch(adminGetAllProfiles(filters));
    },
    [dispatch]
  );

  // Effect for initial load
  useEffect(() => {
    fetchProfiles({
      search: searchTerm,
      gender: filterGender,
      maritalStatus: filterMaritalStatus,
    });
    // Empty dependency array-ku badhila, filters-a use pannalaam, aana adhu infinite loop-la vidalaam.
    // Naam filters change aana API call panna logic-a below useEffect-la serththirukkom.
    // Search term-a initial load-la vechchu call pannurathu correct
  }, []);

  useEffect(() => {
    // API call-a delay panna, debounce use pannanum.
    // Ippo simple-a, filter change aana immediate-a API call panna vendum.

    // Search input-la type pannum pothu API call aaganum.
    // Filter dropdown-a maathum pothum API call aaganum.

    const delayDebounceFn = setTimeout(() => {
      fetchProfiles({
        search: searchTerm,
        gender: filterGender,
        maritalStatus: filterMaritalStatus,
      });
    }, 500); // 500ms delay for search input
  }, [searchTerm, filterGender, filterMaritalStatus, fetchProfiles]);

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
            placeholder="Start typing to search..."
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
          value={filterMaritalStatus}
          onChange={(e) => setFilterMaritalStatus(e.target.value)}
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

      {/* Profile Counts Section */}
      <div className="mb-4 text-sm font-medium mt-5 text-gray-700">
        {loading ? (
          <span className="text-indigo-600">Fetching results...</span>
        ) : (
          <>
            Total Profiles Found:
            <span className="text-indigo-600 font-bold">{profileCount}</span>
            {searchTerm ||
            filterGender !== "All" ||
            filterMaritalStatus !== "All" ? (
              <span className="ml-4 text-gray-500">
                (Showing filtered results)
              </span>
            ) : (
              <span className="ml-4 text-gray-500">(Total profiles in DB)</span>
            )}
          </>
        )}
      </div>

      {/* Loading and Error States */}
      {loading && <ProfileTableSkeleton rows={10} />}

      {error && !loading && (
        <p className="p-4 text-red-500 bg-red-100 border border-red-400 rounded-lg">
          Error: {error}
        </p>
      )}

      {/* Profiles Data Table */}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg w-full mt-6">
          {profiles.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              No profiles found matching the criteria. 🔎
            </p>
          ) : (
            <div className="relative max-h-[600px] w-full overflow-y-auto overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-[2700px] divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Matrimony Profile
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      DOB
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Place of Birth
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Time of Birth
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rasi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Nakshatram
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Laknam
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Height
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Color
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Marital Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Education
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Occupation
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Annual Income
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Mother Tongue
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Religion
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Caste
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Subcaste
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Father's Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Father's Occupation
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Mother's Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Mother's Occupation
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Sister
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Brother
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Children
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Residing Place
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Whatsapp Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Address Details
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Profile Image
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {profiles.map((profile, index) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-indigo-600 font-medium">
                        {profile.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {profile.pname}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {profile.gender}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {profile.age} ({profile.dob})
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {profile.maritalstatus}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                        {profile.education}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {profile.phonenumber}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <button
                          onClick={() => handleEdit(profile.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 p-1"
                          title="Edit Profile"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Profile"
                        >
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProfiles;
