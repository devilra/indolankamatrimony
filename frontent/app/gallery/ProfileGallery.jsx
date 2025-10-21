"use client";

import React, { useEffect, useState } from "react"; // ✅ useState added
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../redux/profileSlice";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;

const ProfileGallery = () => {
  const dispatch = useDispatch();
  const { profiles, loading, error } = useSelector((state) => state.profile);
  const router = useRouter();

  //console.log(profiles);

  // ✅ New State: Initial load mudinjirucha nu therinjukka
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    console.log("Today", today);
    const birthDate = new Date(dob);
    console.log("birthDate", birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Check if birthday has passed this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age.toString() : "";
  };

  // ✅ Initial data fetch logic
  useEffect(() => {
    // 1. Initial Load-la, oru thadavai API call pannunga
    console.log("API Called");
    if (profiles.length === 0 && !error && !isInitialLoadComplete) {
      dispatch(getAllProfiles());
    }
  }, [dispatch, profiles.length, error, isInitialLoadComplete]);

  // ✅ New useEffect: Loading mudinja udane InitialLoadComplete- true set pannunga.
  useEffect(() => {
    // Loading mudinjadhum (success/failure) isInitialLoadComplete true aagum
    if (!loading && !isInitialLoadComplete) {
      setIsInitialLoadComplete(true);
    }
  }, [loading, isInitialLoadComplete]);
  // 💡 Note: Indha logic, profiles.length == 0 aanaalum, API call-uku appuram dhaan true aagum.

  // Handle click on a profile card
  const handleProfileClick = (id) => {
    router.push(`/profile/${id}`);
  };

  const skeletonArray = Array.from({ length: 8 });

  // --- UI Content Logic ---
  let content;

  // 1. Loading State (Initial load aagum bodhum, data varum bodhum Skeleton kaatanum)
  // isInitialLoadComplete mudhal murai false-a irundha, loading kaatanum
  if (loading || !isInitialLoadComplete) {
    content = skeletonArray.map((_, index) => (
      <div key={index} className="p-2">
        <Card className="shadow-md border border-gray-200 rounded-lg h-full">
          <CardContent className="flex flex-col items-center p-4">
            <Skeleton className="h-48 w-full rounded-md mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      </div>
    ));
  } else if (error) {
    // 2. Error State (API call fail aanaal)
    content = (
      <div className="col-span-full text-center py-16">
        {/* <h3 className="text-2xl font-bold text-red-600 mb-2">
          Data Fetch Error
        </h3> */}
        <p className="text-gray-600">{error} - Please try again later.</p>
      </div>
    );
  } else if (profiles.length === 0 && isInitialLoadComplete) {
    // 3. ✅ FIX: No Profiles Found State
    // Initial load mudinjadhuku apuram, profiles zero-va irundha mattum kaatanum.
    content = (
      <div className="col-span-full text-center py-16">
        <h3 className="text-2xl font-bold text-neutral-600 mb-2">
          No Profiles Available
        </h3>
        <p className="text-gray-500">
          It looks like no profiles have been registered yet.
        </p>
      </div>
    );
  } else {
    // 4. Data Found State (Profile Cards)
    content = profiles.map((profile) => (
      <div key={profile.id} className="">
        <Card
          className="shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border border-gray-200 rounded-lg h-full"
          onClick={() => handleProfileClick(profile.id)}
        >
          <CardContent className="flex flex-col">
            {/* Image Section */}
            <div className="h-64 w-full mb-4">
              {console.log(profile.image)}
              <img
                src={
                  profile.image
                    ? profile.image
                    : profile.gender === "Female"
                    ? "/default-girl.jpg"
                    : "/default-boy.jpg"
                }
                alt={profile.pname}
                //className="h-full w-full rounded-md object-contain py-1 border-4 border-gray-100 shadow-sm"
                className="h-full w-full  object-contain rounded-md py-1 shadow-sm border-gray-100/15 "
              />
            </div>

            <div className=" text-center py-3 md:pt-12 lg:pt-5 ">
              {/* Profile Details */}
              <h3 className="text-xl font-bold  text-gray-800 truncate">
                {profile.pname}
              </h3>
              <p className="text-lg font-semibold  py-1 text-gray-600">
                {/* <strong className="font-bold text-black">Education: </strong> */}
                <span className="text-[12px]">{profile.education}</span>
              </p>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {/* <strong className="text-black font-bold">ID: </strong> */}
                {profile.id}
              </h3>

              {/* <p className="text-xs text-gray-500 mt-1">
              <strong className="text-black font-bold">Joined: </strong>
              {profile.created_day}-{profile.created_month}-
              {profile.created_year}
            </p> */}
            </div>
          </CardContent>
        </Card>
      </div>
    ));
  }

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4 mb-5 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Matrimony Profiles
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-y-10 lg:gap-x-4">
        {content}
      </div>
    </div>
  );
};

export default ProfileGallery;
