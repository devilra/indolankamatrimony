"use client";

import { getProfileById } from "@/app/redux/profileSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ageOptions = Array.from({ length: 33 }, (_, i) => 18 + i);
const heightOptions = [
  "4ft 6in - 137cm",
  "4ft 8in - 142cm",
  "4ft 10in - 147cm",
  "5ft 0in - 152cm",
  "5ft 2in - 157cm",
  "5ft 4in - 163cm",
  "5ft 6in - 168cm",
  "5ft 8in - 173cm",
  "5ft 10in - 178cm",
  "6ft 0in - 183cm",
  "6ft 2in - 188cm",
];
const religionOptions = [
  "Hindu",
  "Christian",
  "Muslim",
  "Sikh",
  "Jain",
  "Buddhist",
];
const casteOptions = [
  "Ezhava",
  "Nair",
  "Vanniyar",
  "Gounder",
  "Brahmin",
  "Reddy",
];
const motherTongueOptions = [
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Hindi",
];

const initialFilters = {
  looking_for: "Bride",
  age_from: "18",
  age_to: "30",
  height: "all", // Changed from '' to 'all'
  religion: "all", // Changed from '' to 'all'
  caste: "all", // Changed from '' to 'all'
  mother_tongue: "all", // Changed from '' to 'all'
  profile_id: "",
};

const FilterForm = ({ filters, setFilters, handleSearch, loading }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSelectChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 border rounded-lg  bg-white shadow-xl">
      <h2 className="text-[14px] font-bold mb-4 text-center text-[#4a2f1c] border-b pb-2">
        Search Your Partner
      </h2>
      {/* Profile ID Search (Input Box) */}
      {/* <div className="mb-4 w-full">
        <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
          Search by Profile ID
        </label>
        <Input
          type="text"
          name="profile_id"
          placeholder="Enter Profile ID"
          value={filters.profile_id}
          onChange={handleInputChange}
          className="h-10"
        />
      </div> */}

      {/* Filter Boxes Grid (Mobile/Tablet: Column, Desktop: Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
        <div className="col-span-2  sm:col-span-1">
          <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
            Looking for
          </label>
          <Select
            value={filters.looking_for}
            onValueChange={(v) => handleSelectChange("looking_for", v)}
          >
            <SelectTrigger className="h-20 py-4">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="text-[#4a2f1c]">
              <SelectItem className="text-[#4a2f1c] text-[13px]" value="Bride">
                Bride
              </SelectItem>
              <SelectItem className="text-[#4a2f1c] text-[13px]" value="Groom">
                Groom
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Height (Single Select) */}

        <div className="col-span-2 sm:col-span-1">
          <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
            Height
          </label>
          <Select
            value={filters.height}
            onValueChange={(v) => handleSelectChange("height", v)}
          >
            <SelectTrigger className="h-10 py-4">
              <SelectValue placeholder="Select Height" />
            </SelectTrigger>
            <SelectContent className="text-[#4a2f1c]">
              {/* 🚩 FIX: Changed value="" to value="all" */}
              <SelectItem value="all" className="text-[#4a2f1c]">
                Any Height
              </SelectItem>
              {heightOptions.map((h) => (
                <SelectItem
                  className="text-[#4a2f1c] text-[13px]"
                  key={h}
                  value={h}
                >
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="col-span-2 flex items-end space-x-2">
          <div className="w-1/2">
            <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
              Age From
            </label>
            <Select
              value={filters.age_from}
              className="text-[#4a2f1c]"
              onValueChange={(v) => handleSelectChange("age_from", v)}
            >
              <SelectTrigger className="h-10 py-4">
                <SelectValue placeholder="Min Age" />
              </SelectTrigger>
              <SelectContent className="text-[#4a2f1c]">
                {ageOptions.map((age) => (
                  <SelectItem
                    key={age}
                    value={String(age)}
                    className="text-[#4a2f1c] text-[13px]"
                  >
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <label className="text-[13px]  text-[#4a2f1c] mb-1 block">To</label>
            <Select
              value={filters.age_to}
              onValueChange={(v) => handleSelectChange("age_to", v)}
            >
              <SelectTrigger className="h-10 py-4">
                <SelectValue placeholder="Max Age" />
              </SelectTrigger>
              <SelectContent className="text-[#4a2f1c]">
                {ageOptions
                  .filter((age) => age >= Number(filters.age_from))
                  .map((age) => (
                    <SelectItem
                      key={age}
                      value={String(age)}
                      className="text-[#4a2f1c] text-[13px]"
                    >
                      {age}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Religion */}
        <div className="col-span-2 sm:col-span-1">
          <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
            Religion
          </label>
          <Select
            value={filters.religion}
            onValueChange={(v) => handleSelectChange("religion", v)}
          >
            <SelectTrigger className="h-10 py-4">
              <SelectValue placeholder="Choose a Religion" />
            </SelectTrigger>
            <SelectContent className="text-[#4a2f1c]">
              {/* 🚩 FIX: Changed value="" to value="all" */}
              <SelectItem value="all" className="text-[#4a2f1c]">
                Any Religion
              </SelectItem>
              {religionOptions.map((r) => (
                <SelectItem
                  className="text-[#4a2f1c] text-[13px]"
                  key={r}
                  value={r}
                >
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Caste */}

        <div className="col-span-2 sm:col-span-1">
          <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
            Caste
          </label>
          <Select
            value={filters.caste}
            onValueChange={(v) => handleSelectChange("caste", v)}
          >
            <SelectTrigger className="h-10 py-4">
              <SelectValue placeholder="Choose a Caste" />
            </SelectTrigger>
            <SelectContent className="text-[#4a2f1c]">
              {/* 🚩 FIX: Changed value="" to value="all" */}
              <SelectItem value="all" className="text-[#4a2f1c]">
                Any Caste
              </SelectItem>
              {casteOptions.map((c) => (
                <SelectItem
                  className="text-[#4a2f1c] text-[13px]"
                  key={c}
                  value={c}
                >
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mother Tongue */}
        <div className="col-span-2 sm:col-span-2">
          <label className="text-[13px]  text-[#4a2f1c] mb-1 block">
            Mother Tongue
          </label>
          <Select
            value={filters.mother_tongue}
            onValueChange={(v) => handleSelectChange("mother_tongue", v)}
            className=""
          >
            <SelectTrigger className="h-10 py-4">
              <SelectValue placeholder="Choose a Language" />
            </SelectTrigger>
            <SelectContent className="text-[#4a2f1c] ">
              {/* 🚩 FIX: Changed value="" to value="all" */}
              <SelectItem value="all" className="text-[13px]">
                Any Language
              </SelectItem>
              {motherTongueOptions.map((m) => (
                <SelectItem className="text-[13px]" key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button
        //onClick={handleSearch}
        //disabled={loading}
        className="w-full mt-6 bg-[#4a2f1c] hover:bg-[#6e4e3b] text-white"
      >
        {false ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Search className="mr-2 h-4 w-4" />
        )}
        Search Matches
      </Button>
    </div>
  );
};

const page = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname(); // useDispatch initialize pannuvom
  const [filters, setFilters] = useState(initialFilters);

  console.log(filters);

  // 🚩 HIGHLIGHT: Filters Initial State
  // Default empty/any-ku 'all' use panrom

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
        <div className="p-6 rounded-lg flex flex-col w-full  md:flex-row lg:flex-row lg:justify-between  mb-8">
          <div className="flex flex-col  md:items-start pb-6">
            <div className="w-full md:w-3/4 lg:w-full mb-4 md:mb-0 md:mr-6">
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
          <div className="w-full md:w-1/2 lg:w-2/5">
            <FilterForm filters={filters} setFilters={setFilters} />
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
