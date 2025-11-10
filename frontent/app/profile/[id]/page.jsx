"use client";

import { getProfileById, searchMatches } from "@/app/redux/profileSlice";
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
import { toast } from "sonner";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { BsSearchHeart } from "react-icons/bs";

const ageOptions = Array.from({ length: 33 }, (_, i) => 18 + i);
const heightOptions = [
  "4ft 6in - 137cm",
  "4ft 7in - 139cm",
  "4ft 8in - 142cm",
  "4ft 9in - 144cm",
  "4ft 10in - 147cm",
  "4ft 11in - 149cm",
  "5ft - 152cm",
  "5ft 1in - 154cm",
  "5ft 2in - 157cm",
  "5ft 3in - 160cm",
  "5ft 4in - 162cm",
  "5ft 5in - 165cm",
  "5ft 6in - 167cm",
  "5ft 7in - 170cm",
  "5ft 8in - 172cm",
  "5ft 9in - 175cm",
  "5ft 10in - 177cm",
  "5ft 11in - 180cm",
  "6ft - 182cm",
  "6ft 1in - 185cm",
  "6ft 2in - 187cm",
  "6ft 3in - 190cm",
  "6ft 4in - 193cm",
  "6ft 5in - 195cm",
  "6ft 6in - 198cm",
  "6ft 7in - 200cm",
  "6ft 8in - 203cm",
  "6ft 9in - 205cm",
  "6ft 10in - 208cm",
  "6ft 11in - 210cm",
  "7ft - 213cm",
];
const religionOptions = [
  "Hindu",
  "Christian",
  "Muslim",
  "Sikh",
  "Jain - Digambar",
  "Jain - Shwetambar",
  "Jain - Others",
  "Parsi",
  "Buddhis",
  "Inter-Religion",
  "Others",
];
const casteOptions = [
  "24 Manai Telugu Chettiar",
  "Aaru Nattu Vellala",
  "Achirapakkam Chettiar",
  "Adi Dravidar",
  "Agamudayar / Arcot / Thuluva Vellala",
  "Agaram Vellan Chettiar",
  "Ahirwar",
  "Arunthathiyar",
  "Ayira Vysya",
  "Badaga",
  "Bairwa",
  "Balai",
  "Beri Chettiar",
  "Boyar",
  "Brahmin - Anaviln Desai",
  "Brahmin - Baidhiki/Vaidhiki",
  "Brahmin - Bardai",
  "Brahmin - Bhargav",
  "Brahmin - Gurukkal",
  "Brahmin - Iyengar",
  "Brahmin - Iyer",
  "Brahmin - Khadayata",
  "Brahmin - Khedaval",
  "Brahmin - Mevada",
  "Brahmin - Others",
  "Brahmin - Rajgor",
  "Brahmin - Rarhi/Radhi",
  "Brahmin - Sarua",
  "Brahmin - Shri Gaud",
  "Brahmin - Tapodhan",
  "Brahmin - Valam",
  "Brahmin - Zalora",
  "Chattada Sri Vaishnava",
  "Cherakula Vellalar",
  "Chettiar",
  "Dasapalanjika / Kannada Saineegar",
  "Desikar",
  "Desikar Thanjavur",
  "Devandra Kula Vellalar",
  "Devanga Chettiar",
  "Devar/Thevar/Mukkulathor",
  "Dhanak",
  "Elur Chetty",
  "Gandla / Ganiga",
  "Gounder",
  "Gounder - Kongu Vellala Gounder",
  "Gounder - Nattu Gounder",
  "Gounder - Others",
  "Gounder - Urali Gounder",
  "Gounder - Vanniya Kula Kshatriyar",
  "Gounder - Vettuva Gounder",
  "Gramani",
  "Gurukkal Brahmin",
  "Illaththu Pillai",
  "Intercaste",
  "Isai Vellalar",
  "Iyengar Brahmin",
  "Iyer Brahmin",
  "Julaha",
  "Kamma Naidu",
  "Kanakkan Padanna",
  "Kandara",
  "Karkathar",
  "Karuneegar",
  "Kasukara",
  "Kerala Mudali",
  "Khatik",
  "Kodikal Pillai",
  "Kongu Chettiar",
  "Kongu Nadar",
  "Kongu Vellala Gounder",
  "Kori/Koli",
  "Krishnavaka",
  "Kshatriya Raju",
  "Kulalar",
  "Kuravan",
  "Kuruhini Chetty",
  "Kurumbar",
  "Kuruva",
  "Manjapudur Chettiar",
  "Mannan / Velan / Vannan",
  "Maruthuvar",
  "Meenavar",
  "Meghwal",
  "Mudaliyar",
  "Mukkulathor",
  "Muthuraja / Mutharaiyar",
  "Nadar",
  "Naicker",
  "Naicker - Others",
  "Naicker - Vanniya Kula Kshatriyar",
  "Naidu",
  "Nanjil Mudali",
  "Nanjil Nattu Vellalar",
  "Nanjil Vellalar",
  "Nanjil pillai",
  "Nankudi Vellalar",
  "Nattu Gounder",
  "Nattukottai Chettiar",
  "Othuvaar",
  "Padmashali",
  "Pallan / Devandra Kula Vellalan",
  "Panan",
  "Pandaram",
  "Pandiya Vellalar",
  "Pannirandam Chettiar",
  "Paravan / Bharatar",
  "Parkavakulam / Udayar",
  "Parvatha Rajakulam",
  "Paswan / Dusadh",
  "Pattinavar",
  "Pattusali",
  "Pillai",
  "Poundra",
  "Pulaya / Cheruman",
  "Reddy",
  "Rohit / Chamar",
  "SC",
  "ST",
  "Sadhu Chetty",
  "Saiva Pillai Thanjavur",
  "Saiva Pillai Tirunelveli",
  "Saiva Vellan chettiar",
  "Saliyar",
  "Samagar",
  "Sambava",
  "Satnami",
  "Senai Thalaivar",
  "Senguntha Mudaliyar",
  "Sengunthar/Kaikolar",
  "Shilpkar",
  "Sonkar",
  "Sourashtra",
  "Sozhia Chetty",
  "Sozhiya Vellalar",
  "Telugupatti",
  "Thandan",
  "Thondai Mandala Vellalar",
  "Urali Gounder",
  "Vadambar",
  "Vadugan",
  "Valluvan",
  "Vaniya Chettiar",
  "Vannar",
  "Vannia Kula Kshatriyar",
  "Veera Saivam",
  "Veerakodi Vellala",
  "Vellalar",
  "Vellan Chettiars",
  "Vettuva Gounder",
  "Vishwakarma",
  "Vokkaliga",
  "Yadav",
  "Yadava Naidu",
];
const motherTongueOptions = [
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Hindi",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Marwari",
  "Oriya",
  "Punjabi",
  "Sindhi",
  "Urdu",
  "Arunachali",
  "Assamese",
  "Awadhi",
  "Bhojpuri",
  "Brij",
  "Bihari",
  "Badaga",
  "Chatisgarhi",
  "Dogri",
  "English",
  "French",
  "Garhwali",
  "Garo",
  "Haryanvi",
  "Himachali/Pahari",
  "Kanauji",
  "Kashmiri",
  "Khandesi",
  "Khasi",
  "Konkani",
  "Koshali",
  "Kumaoni",
  "Kutchi",
  "Lepcha",
  "Ladacki",
  "Magahi",
  "Maithili",
  "Manipuri",
  "Miji",
  "Mizo",
  "Monpa",
  "Nicobarese",
  "Nepali",
  "Rajasthani",
  "Sanskrit",
  "Santhali",
  "Sourashtra",
  "Tripuri",
  "Tulu",
  "Angika",
  "Bagri Rajasthani",
  "Dhundhari/Jaipuri",
  "Gujari/Gojari",
  "Harauti",
  "Lambadi",
  "Malvi",
  "Mewari",
  "Mewati/Ahirwati",
  "Nimadi",
  "Shekhawati",
  "Wagdi",
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
    <div className="p-4  rounded-lg  text-black bg-white shadow-xl">
      {/* Profile ID Search (Input Box) */}
      <div className="mb-4 w-full">
        <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
          Profile ID
        </label>
        <div className="flex items-center ">
          <Input
            type="text"
            name="profile_id"
            placeholder="Enter Profile ID"
            value={filters.profile_id}
            onChange={handleInputChange}
            className="h-10 placeholder:text-neutral-800 rounded-tr-none rounded-br-none border-2 border-black/35"
          />
          <button
            disabled={filters.profile_id.length === 0}
            className={`border-2 border-l-0 p-[8px] cursor-pointer hover:bg-black/5 border-black/35 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <BsSearchHeart size={20} onClick={handleSearch} />
          </button>
        </div>
      </div>
      <h2 className="text-[14px] font-bold mb-4 text-center text-[#4a2f1c] border-b pb-2">
        Search Your Life Partner
      </h2>

      {/* Filter Boxes Grid (Mobile/Tablet: Column, Desktop: Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-7 gap-2">
        <div className="col-span-2  sm:col-span-1">
          <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
            Looking for
          </label>
          <Select
            value={filters.looking_for}
            onValueChange={(v) => handleSelectChange("looking_for", v)}
          >
            <SelectTrigger className="h-20 py-4 border-2 w-full border-black/35">
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
          <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
            Height
          </label>
          <Select
            value={filters.height}
            onValueChange={(v) => handleSelectChange("height", v)}
          >
            <SelectTrigger className="h-10 py-4 border-2 w-full border-black/35">
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
        <div className="col-span-2 flex items-end space-x-7">
          <div className="w-1/2">
            <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
              Age From
            </label>
            <Select
              value={filters.age_from}
              className="text-[#4a2f1c]"
              onValueChange={(v) => handleSelectChange("age_from", v)}
            >
              <SelectTrigger className="h-10 py-4 border-2 w-full border-black/35">
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
            <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
              To
            </label>
            <Select
              value={filters.age_to}
              onValueChange={(v) => handleSelectChange("age_to", v)}
            >
              <SelectTrigger className="h-10 py-4 w-full border-2 border-black/35">
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
          <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
            Religion
          </label>
          <Select
            value={filters.religion}
            onValueChange={(v) => handleSelectChange("religion", v)}
          >
            <SelectTrigger className="h-10 py-4 border-2 w-full border-black/35">
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
          <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
            Caste
          </label>
          <Select
            value={filters.caste}
            onValueChange={(v) => handleSelectChange("caste", v)}
          >
            <SelectTrigger className="h-10 py-4 border-2 w-full border-black/35">
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
          <label className="text-[13px] pb-2 text-[#4a2f1c] mb-1 block">
            Mother Tongue
          </label>
          <Select
            value={filters.mother_tongue}
            onValueChange={(v) => handleSelectChange("mother_tongue", v)}
            className=""
          >
            <SelectTrigger className="h-10 py-4 border-2 w-full border-black/35 ">
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
        onClick={handleSearch}
        disabled={loading}
        className="w-full mt-6 bg-[#4a2f1c] hover:bg-[#6e4e3b] text-white"
      >
        {loading ? (
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
  // 🚩 ADDED STATE: Search panna aacha illaiya nu track panna
  const [hasSearched, setHasSearched] = useState(false);

  console.log(filters);

  // 🚩 HIGHLIGHT: Filters Initial State
  // Default empty/any-ku 'all' use panrom

  // data-vum, error-um Redux store-la irundhu eduthukkalaam
  const {
    profiles,
    loading,
    data: singleProfileData,
    error,
    matchProfiles,
    matchErrors,
  } = useSelector((state) => state.profile);

  //console.log(matchProfiles);

  // const handleSearch = () => {
  //   setHasSearched(true); // Search panna start panniyachu
  //   //console.log(filters.profile_id);
  //   if (filters.profile_id) {
  //     router.push(`/profile/${filters.profile_id.toUpperCase()}`);
  //     return;
  //   }

  //   // 🚩 HIGHLIGHT: Dispatch ku munadi 'all'-a empty string-a (or undefined) mattra vendum.
  //   const cleanFilters = Object.fromEntries(
  //     Object.entries(filters).map(([key, value]) => [
  //       key,
  //       value === "all" ? "" : value, // Backend-ku empty string-a anuppuvom
  //     ])
  //   );

  //   //console.log(cleanFilters);

  //   dispatch(searchMatches(cleanFilters));
  //   toast.info("Check below profiles");
  // };

  // ID Based handle searcf function

  const handleSearch = () => {
    setHasSearched(true); // Search panna start panniyachu

    // 1. Clean filters (converting 'all' to empty string)
    let cleanFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        value === "all" ? "" : value, // Backend-ku empty string-a anuppuvom
      ])
    );

    // 2. 🛑 NEW LOGIC: If profile_id is present, remove all other filters
    if (cleanFilters.profile_id) {
      // profile_id தவிர மற்ற எல்லா filter-களையும் நீக்கிறோம்.
      cleanFilters = {
        profile_id: cleanFilters.profile_id,
      };
      setFilters({ ...filters, profile_id: "" });
      toast.info(`Searching for Profile ID: ${cleanFilters.profile_id}`);
    } else {
      delete cleanFilters.profile_id;
      toast.info("Check below profiles based on filters");
    }

    dispatch(searchMatches(cleanFilters));
  };

  // Helper function to format data display
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ") || "N/A";
    }
    return value || "N/A";
  };

  const DetailBox = ({ title, children }) => {
    return (
      <div className=" p-6 rounded-lg  mb-8 border-2 border-neutral-500">
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
          onClick={() => router.push("/gallery")}
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
        <div className="p-6 rounded-lg  flex flex-col w-full  md:flex-row lg:flex-row lg:justify-between lg:gap-10  mb-0">
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
          <div className="">
            <div className="w-full">
              <FilterForm
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <div>
          {/* 🚩 NEW LOGIC: Search panna apuram mattum results-a show pannanum */}
          {hasSearched && (
            <>
              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center h-48 p-6 border rounded-lg bg-white shadow-md">
                  <Loader2 className="animate-spin h-6 w-6 text-[#4a2f1c]" /> 
                  <span className="ml-2 text-lg text-gray-700">
                    Searching for Matches...
                  </span>
                </div>
              )}
              {/* Results and No Match State (Loading mudinjadhukku apuram mattum) */}
              {!loading && (
                <>
                  <h2 className="text-2xl py-5 text-start font-bold mb-4 text-[#4a2f1c]">
                    Found **{matchProfiles.length}** Matching Profiles
                  </h2>

                  {matchProfiles.length === 0 ? (
                    // 🚩 No Matching Profile Error
                    <div className="p-6 text-center border mb-10 rounded-lg bg-white shadow-md">
                      <h3 className="text-xl font-semibold text-red-500">
                        No Matching Profiles Found 😟
                      </h3>
                      <p className="mt-2 text-gray-600">
                        try modifying your search filters to get better results.
                      </p>
                    </div>
                  ) : (
                    // 🚩 Profiles Display
                    <div className="bg-white mb-10 p-4 mx-5 rounded-lg shadow-md overflow-x-auto">
                      <div className="flex space-x-4 pb-2">
                        {matchProfiles.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => router.push(`/profile/${p.id}`)}
                            className="w-64 flex-shrink-0 border rounded-lg p-3 shadow-sm hover:shadow-md transition duration-200 cursor-pointer bg-white"
                          >
                            {/* Photo */}
                            <div>
                              <img
                                src={formatImageUrl(p.image, p.gender)}
                                alt={p.name || "Profile"}
                                className="h-[150px] md:h-[250] md:w-[180px] w-[120px]"
                              />
                            </div>
                            {/* Main Details */}
                            <div className="space-y-1 text-sm">
                              <div className="font-bold text-base text-[#4a2f1c] truncate">
                                {p.pname || "N/A"}
                              </div>
                              <div className="text-xs text-[#4a2f1c] font-semibold">
                                ID: {p.id || "N/A"}
                              </div>
                              <hr className="my-1 border-gray-100" />
                              <div className="flex justify-between text-[#4a2f1c]">
                                <span className="font-medium">Age:</span>
                                <span>{p.age || "N/A"}</span>
                              </div>
                              {/* <div className="flex justify-between text-[#4a2f1c]">
                                <span className="font-medium">Height:</span>
                              
                                <span>{p.height}</span>
                              </div> */}
                              {/* <div className="flex justify-between text-[#4a2f1c]">
                                <span className="font-medium">Caste:</span>
                                <span className="truncate max-w-[50%]">
                                  {p.caste || "N/A"}
                                </span>
                              </div> */}
                              {/* <div className="flex justify-between text-[#4a2f1c]">
                                <span className="font-medium">Religion:</span>
                                <span className="truncate max-w-[50%]">
                                  {p.religion || "N/A"}
                                </span>
                              </div> */}
                              {/* <div className="flex justify-between text-[#4a2f1c]">
                                <span className="font-medium">M.Tongue:</span>
                                <span className="truncate max-w-[50%]">
                                  {p.mothertongue || "N/A"}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
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
