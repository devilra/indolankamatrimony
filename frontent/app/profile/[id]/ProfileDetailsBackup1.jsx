"use client";

import { getProfileById } from "@/app/redux/profileSlice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultBoy from "@/public/default-boy.jpg";
import defaultGirl from "@/public/default-girl.jpg";

const page = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname(); // useDispatch initialize pannuvom

  // data-vum, error-um Redux store-la irundhu eduthukkalaam
  const {
    profiles,
    loading,
    data: singleProfileData,
    error,
  } = useSelector((state) => state.profile);

  // Helper function to format data display
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ") || "N/A";
    }
    return value || "N/A";
  };

  const DetailBox = ({ title, children }) => {
    return (
      <div className=" p-6 rounded-lg  mb-8 border border-neutral-300">
        {title && (
          <h2 className="text-2xl font-bold text-start text-gray-800 mb-4 border-b border-dashed pb-2">
            {title}
          </h2>
        )}
        {children}
      </div>
    );
  };

  useEffect(() => {
    //  URL-la irundhu ID-a edukkanum
    const pathSegments = pathname.split("/");
    // console.log(pathname);
    // console.log(pathSegments);
    const profileId = pathSegments[pathSegments.length - 1];
    //console.log(profileId);
    if (profiles.length > 0) {
      const foundProfile = profiles.find((p) => p.id === profileId);

      if (foundProfile) {
        setProfileData(foundProfile);
        setIsLoading(false);
        return; // Found in cache, so stop
      }
    }

    // profiles array-la data illai-naalum, illa kandupidikka mudiyala naalum
    // getProfileById API call panni data-va load pandrathuku
    if (profileId) {
      setIsLoading(true); // API call-ku munadi loading set pannuvom
      // Redux API call
      dispatch(getProfileById(profileId))
        .unwrap()
        .then((result) => {
          setProfileData(result.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Failed to fetch profile:", err);
          setProfileData(null); // Data va clear pannuvom
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [profiles, pathname, dispatch]);

  //console.log(profileData);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-28 items-center min-h-[85vh]">
        <Loader2 className="animate-spin h-8 w-8 text-neutral-600" />
        <span className="ml-2 text-lg">Loading Profile...</span>
      </div>
    );
  }

  if (!profileData || error) {
    return (
      <div className="text-center  flex flex-col justify-center mt-28 items-center min-h-[85vh]">
        <h1 className="text-3xl font-bold text-red-600">
          Profile Not Found 😞
        </h1>
        <p className="mt-4">
          Please check the link or go back to the profiles list.
        </p>
        <Button
          onClick={() => router.push("/partners")}
          className="mt-4 text-white cursor-pointer"
        >
          Go to Profiles
        </Button>
      </div>
    );
  }

  //console.log(singleProfileData);

  //   Details Display Logic
  const p = profileData;

  const personalDetails = [
    {
      label: "Age / Height",
      value: `${formatValue(p.age)} / ${formatValue(p.height)}"`,
    },
    { label: "Gender", value: formatValue(p.gender) },
    { label: "Date of birth", value: formatValue(p.dob) },
    { label: "Birth Place", value: formatValue(p.pbrith) },
    { label: "Time of Birth", value: formatValue(p.tbrith) },
    { label: "Color", value: formatValue(p.color) },
    { label: "Marital Status", value: formatValue(p.maritalstatus) },
    { label: "Rasi", value: formatValue(p.rasi) },
    { label: "Nakshatram", value: formatValue(p.nakshatram) },
    { label: "Laknam", value: formatValue(p.laknam) },
    { label: "Education", value: formatValue(p.education) },
    { label: "Occupation", value: formatValue(p.occupation) },
    { label: "Annual Income", value: formatValue(p.annualincome) },
    { label: "Mother Tongue", value: formatValue(p.mothertongue) },
    { label: "Religion", value: formatValue(p.religion) },
    { label: "Caste", value: formatValue(p.caste) },
    { label: "Sub Caste", value: formatValue(p.subcaste) },
  ];

  const parentDetails = [
    { label: "Father Name", value: formatValue(p.fname) },
    { label: "Father's Occupation", value: formatValue(p.foccupation) },
    { label: "Mother Name", value: formatValue(p.mname) },
    { label: "Mother's Occupation", value: formatValue(p.moccupation) },
    { label: "Sisters", value: formatValue(p.sister) },
    { label: "Brothers", value: formatValue(p.brother) },
    { label: "Children", value: formatValue(p.children) },
    { label: "Residence Place", value: formatValue(p.rplace) },
  ];
  const formatImageUrl = (imagePath, gender) => {
    // console.log(gender);
    // console.log(typeof imagePath, imagePath);
    // If imagePath is missing, "null" (string), or empty, use default gender-based image
    if (!imagePath || imagePath === "null" || imagePath.trim() === "") {
      return gender === "Female" ? "/default-girl.jpg" : "/default-boy.jpg";
    }

    // Otherwise, return actual backend image URL

    return imagePath;
  };

  // const imageSource =
  //   p.image && p.image !== "null"
  //     ? p.image // Actual remote URL (string)
  //     : p.gender === "Female"
  //     ? "default-girl.jpg"
  //     : "default-boy.jpg";

  return (
    <div className="bg-gradient-to-r from-amber-20/50 to-amber-100/30 pb-10 pt-20  lg:pt-36 ">
      <div className="max-w-6xl mx-auto  px-4">
        {/* Profile Header */}
        <div className="p-6 rounded-lg  mb-8">
          <div className="flex flex-col  md:items-start pb-6">
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0 md:mr-6">
              <img
                src={formatImageUrl(p.image, p.gender)}
                alt={p.name || "Profile Picture"}
                //style={{ objectFit: "cover" }}
                className="w-full h-[500px] md:h-[300px] object-contain object-top rounded-lg border-2 border-[#4a2f1c] "
                //className="rounded-lg border-2 border-[#4a2f1c]"
                // sizes="(max-width: 768px) 100vw, 33vw"
                //width={50}
                //height={50}
                //priority={true}
                //placeholder="blur"
              />
            </div>
            <div>
              <h1 className="text-sm md:text-base pt-5  text-[#4a2f1c] mb-2">
                {formatValue(p.pname)}
              </h1>
              {/* <h1 className="text-3xl font-bold text-[#4a2f1c] mb-2">
                Age : {formatValue(p.age)}
              </h1> */}
              {/* <div className="inline-block px-4 py-1 border-2 border-neutral-400 bg-neutral-900 text-white rounded-full text-2xl md:text-3xl lg:text-4xl my-1">
                Profile Id :{" "}
                <span className="font-bold">{p.profile_id || p.id}</span>
              </div> */}
              <h1 className="text-sm md:text-base text-[#4a2f1c] mb-2">
                {formatValue(p.education)}
              </h1>
              <div className="inline-block px-4 py-1 border-1 border-neutral-400  text-[#4a2f1c]  rounded-lg text-2lg  my-1">
                Profile Id : <span className="">{p.profile_id || p.id}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 2. Personal Details Section in a Box */}
        <DetailBox title="Personal Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {personalDetails.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-start text-sm md:text-base"
              >
                <span className="font-semibold text-gray-600 w-1/2">
                  {label}
                </span>
                <span className="text-gray-900 font-medium w-1/2 text-right b ">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </DetailBox>

        {/* 3. Parent's / Guardians Details Section in a Box */}
        <DetailBox title="Parent's / Guardians Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {parentDetails.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-start text-sm md:text-base"
              >
                <span className="font-semibold text-gray-600 w-1/2">
                  {label}
                </span>
                <span className="text-gray-900 font-medium w-1/2 text-right ">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </DetailBox>
      </div>
    </div>
  );
};

export default page;
