"use client";

import Calendar02 from "@/components/calendar-02";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RxCross2 } from "react-icons/rx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles, registerProfile } from "../redux/profileSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Dropdown options
const dropdownData = {
  "Matrimony Profile for": ["Bride", "Groom", "Relative", "Friend", "Self"],
  rasi: [
    "மேஷம் (Aries)",
    "ரிஷபம் (Taurus)",
    "மிதுனம் (Gemini)",
    "கடகம் (Cancer)",
    "சிம்மம் (Leo)",
    "கன்னி (Virgo)",
    "துலாம் (Libra)",
    "விருச்சிகம் (Scorpio)",
    "தனுசு (Sagittarius)",
    "மகரம் (Capricorn)",
    "கும்பம் (Aquarius)",
    "மீனம் (Pisces)",
  ],
  nakshatram: [
    "அஸ்வினி (Ashwini)",
    "பரணி (Bharani)",
    "கார்த்திகை (Krittika)",
    "ரோகிணி (Rohini)",
    "மிருகசீரிடம் (Mrigashira)",
    "திருவாதிரை (Ardra)",
    "புனர்பூசம் (Punarvasu)",
    "பூசம் (Pushya)",
    "ஆயில்யம் (Ashlesha)",
    "மகம் (Magha)",
    "பூரம் (Purva Phalguni)",
    "உத்திரம் (Uttara Phalguni)",
    "அஸ்தம் (Hasta)",
    "சித்திரை (Chitra)",
    "சுவாதி (Swati)",
    "விசாகம் (Vishakha)",
    "அனுசம் (Anuradha)",
    "கேட்டை (Jyeshtha)",
    "மூலம் (Moola)",
    "பூராடம் (Purva Ashadha)",
    "உத்திராடம் (Uttara Ashadha)",
    "திருவோணம் (Shravana)",
    "அவிட்டம் (Dhanishta)",
    "சதயம் (Shatabhisha)",
    "பூரட்டாதி (Purva Bhadrapada)",
    "உத்திரட்டாதி (Uttara Bhadrapada)",
    "ரேவதி (Revati)",
  ],
  laknam: [
    "மேஷம் (Aries)",
    "ரிஷபம் (Taurus)",
    "மிதுனம் (Gemini)",
    "கடகம் (Cancer)",
    "சிம்மம் (Leo)",
    "கன்னி (Virgo)",
    "துலாம் (Libra)",
    "விருச்சிகம் (Scorpio)",
    "தனுசு (Sagittarius)",
    "மகரம் (Capricorn)",
    "கும்பம் (Aquarius)",
    "மீனம் (Pisces)",
  ],
  color: ["Fair", "Black", "White", "Very Fair"],
  maritalstatus: [
    "UnMarried",
    "Divorced",
    "Widowed",
    "Separated",
    "Married",
    "Annulled",
  ],
  gender: ["Male", "Female"],
  education: [
    "SSLC",
    "12th Higher Education",
    "Aeronautical Engineering",
    "B.Arch",
    "BCA",
    "BE",
    "B.Plan",
    "B.Sc IT/ Computer Science",
    "B.Tech.",
    "Other Bachelor Degree in Engineering / Computers",
    "B.S.(Engineering)",
    "M.Arch.",
    "MCA",
    "ME",
    "M.Sc. IT / Computer Science",
    "M.S.(Engg.)",
    "M.Tech.",
    "PGDCA",
    "Aviation Degree",
    "B.A.",
    "B.Com.",
    "B.Ed.",
    "BFA",
    "BFT",
    "BLIS",
    "B.M.M.",
    "B.Sc.",
    "B.S.W",
    "B.Phil.",
    "M.A.",
    "MCom",
    "M.Ed.",
    "MFA",
    "MLIS",
    "M.Sc.",
    "MSW",
    "M.Phil.",
    "BBA",
    "BFM (Financial Management)",
    "BHM (Hotel Management)",
    "Other Bachelor Degree in Management",
    "BHA / BHM (Hospital Administration)",
    "MBA",
    "MFM (Financial Management)",
    "MHM (Hotel Management)",
    "MHRM (Human Resource Management)",
    "PGDM",
    "Other Master Degree in Management",
    "MHA / MHM (Hospital Administration)",
    "B.A.M.S.",
    "BDS",
    "BHMS",
    "BSMS",
    "BUMS",
    "BVSc",
    "MBBS",
    "MDS",
    "MD / MS (Medical)",
    "MVSc",
    "MCh",
    "DNB",
    "BPharm",
    "BPT",
    "B.Sc. Nursing",
    "Other Bachelor Degree in Medicine",
    "M.Pharm",
    "MPT",
    "Other Master Degree in Medicine",
    "BGL",
    "B.L.",
    "LL.B.",
    "Other Bachelor Degree in Legal",
    "LL.M.",
    "M.L.",
    "Other Master Degree in Legal",
    "CA",
    "CFA (Chartered Financial Analyst)",
    "CS",
    "ICWA",
    "Other Degree in Finance",
    "IAS",
    "IES",
    "IFS",
    "IRS",
    "IPS",
    "Other Degree in Service",
    "Ph.D.",
    "DM",
    "Postdoctoral fellow",
    "Fellow of National Board (FNB)",
    "Diploma",
    "Polytechnic",
    "Trade School",
    "Others in Diploma",
    "Higher Secondary School / High School",
  ],
  occupation: ["Engineer", "Doctor", "Teacher", "Business", "Student"],
  annualincome: ["<5L", "5L-10L", "10L-20L", "20L-50L", ">50L"],
  mothertongue: ["Tamil", "Telugu", "Malayalam", "Kannada", "Hindi"],
  religion: ["Hindu", "Christian", "Muslim", "Jain", "Others"],
  caste: ["Nadar", "Vellalar", "Naidu", "Mudaliar", "Others"],
  "Fathers occupation": [
    "Retired",
    "Business",
    "Farmer",
    "Engineer",
    "Teacher",
  ],
  "Mother's occupation": [
    "Homemaker",
    "Teacher",
    "Doctor",
    "Retired",
    "Business",
  ],
};

const RegisterProfile = () => {
  const [formData, setFormData] = useState({
    mprofile: "",
    pname: "",
    dob: "",
    age: "",
    pbrith: "",
    tbrith: "",
    rasi: "",
    nakshatram: "",
    laknam: "",
    height: "",
    weight: "",
    color: "",
    maritalstatus: "",
    gender: "Male",
    education: [], // ✅ multi-select
    occupation: "",
    annualincome: "",
    mothertongue: "",
    religion: "",
    caste: "",
    subcaste: "",
    fname: "",
    foccupation: "",
    mname: "",
    moccupation: "",
    sister: "",
    brother: "",
    children: "",
    rplace: "",
    whatsappno: "",
    email: "",
    addressdetails: "",
    phonenumber: "",
  });

  const dropdownFieldMap = {
    "Matrimony Profile for": "mprofile",
    rasi: "rasi",
    nakshatram: "nakshatram",
    laknam: "laknam",
    color: "color",
    maritalstatus: "maritalstatus",
    gender: "gender",
    education: "education",
    occupation: "occupation",
    annualincome: "annualincome",
    mothertongue: "mothertongue",
    religion: "religion",
    caste: "caste",
    "Fathers occupation": "foccupation",
    "Mother's occupation": "moccupation",
  };

  const [image, setImage] = useState(null);
  const [dobDate, setDobDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.profile);

  const handleSelectChange = (name, value) => {
    if (name === "education") {
      // multi-select logic
      setFormData((prev) => ({
        ...prev,
        education: prev.education.includes(value)
          ? prev.education.filter((v) => v !== value)
          : [...prev.education, value],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setDobDate(date);
    const formatted = format(date, "yyyy-MM-dd");
    setFormData((prev) => ({ ...prev, dob: formatted }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData };

      for (const key in updatedFormData) {
        if (
          updatedFormData[key] === "" ||
          updatedFormData[key] === null ||
          updatedFormData[key] === undefined
        ) {
          updatedFormData[key] = "N/A"; // handle empty education
        }
      }

      if (
        Array.isArray(updatedFormData.education) &&
        updatedFormData.education.length === 0
      ) {
        updatedFormData.education = "N/A";
      }

      const form = new FormData();
      for (const key in updatedFormData) {
        if (key === "education") {
          if (Array.isArray(updatedFormData.education)) {
            updatedFormData.education.forEach((edu) =>
              form.append("education[]", edu)
            );
          } else {
            form.append(key, updatedFormData[key]);
          }
        } else {
          form.append(key, updatedFormData[key]);
        }
      }

      if (image) form.append("image", image);

      const result = await dispatch(registerProfile(form));

      if (registerProfile.fulfilled.match(result)) {
        const { data } = result.payload;
        toast("Profile registered successfully!");
        dispatch(getAllProfiles());
        sessionStorage.setItem(
          "registrationSuccess",
          JSON.stringify({ id: data.id, name: data.pname })
        );
        router.push("/success");
      } else {
        toast(result.payload?.message || "Something went wrong.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 md:pt-15 lg:pt-15 shadow-lg rounded-2xl p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4a2f1c] text-center mb-14">
        Matrimony Profile Registration
      </h1>
      <div className="lg:max-w-4xl lg:mx-auto lg:bg-white lg:shadow-2xl lg:px-3 lg:pt-3 lg:pb-10 lg:gap-10 rounded-2xl lg:flex">
        <div className="hidden md:hidden lg:block">
          <img
            src="/register/r1.jpg"
            alt="Love"
            className="h-[400px] lg:pt-5"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:flex lg:flex-col pt-10 md:pt-15 lg:pt-5 md:grid-cols-2 lg:w-[370px] lg:grid-cols-1 gap-2 md:gap-6 lg:gap-2"
        >
          {Object.entries(dropdownData).map(([label, options]) => {
            const fieldName = dropdownFieldMap[label];
            return (
              <div
                key={label}
                className={`flex flex-col w-full ${
                  label === "moccupation" && "lg:col-span-3"
                } `}
              >
                <Label className="capitalize text-sm py-2">{label} :</Label>

                {/* {fieldName === "education" ? (
                  <Select
                    //value={formData.education.join(",")}
                    onValueChange={(val) => handleSelectChange(fieldName, val)}
                    multiple
                    className="w-full"
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue
                        placeholder={`Select ${label}`}
                        value={formData.education.join(", ")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(fieldName, value)
                    }
                    className="w-full"
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} */}

                {fieldName === "education" ? (
                  <div>
                    <Select
                      onValueChange={(val) =>
                        handleSelectChange(fieldName, val)
                      }
                      multiple
                      //value={formData.education}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full py-5">
                        <SelectValue placeholder={`Select ${label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-1">
                      {formData.education.length === 0
                        ? null
                        : formData.education.map((item) => (
                            <span
                              key={item}
                              className="bg-neutral-200 text-neutral-800 px-2 py-1 my-2 rounded-full text-[8px] flex items-center gap-1"
                            >
                              {item}
                              {/* Use span instead of button to avoid nested button issue */}
                              <span
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent dropdown toggle
                                  setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.filter(
                                      (edu) => edu !== item
                                    ),
                                  }));
                                }}
                                className="cursor-pointer text-neutral-600 text-[15px] hover:text-red-500 font-bold"
                              >
                                {/* <RxCross2 size={0.2} className="text-[2px]" /> */}
                                ×
                              </span>
                            </span>
                          ))}
                    </div>
                  </div>
                ) : (
                  <Select
                    value={formData[fieldName]}
                    onValueChange={(val) => handleSelectChange(fieldName, val)}
                    className="w-full"
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}

          {/* 🔤 Text Inputs */}
          {[
            "pname",
            "age",
            "pbrith",
            "tbrith",
            "height",
            "weight",
            "subcaste",
            "fname",
            "mname",
            "sister",
            "brother",
            "children",
            "rplace",
            "whatsappno",
            "email",
            "addressdetails",
            "phonenumber",
          ].map((field) => (
            <div
              key={field}
              className={`flex flex-col ${
                field === "addressdetails" ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Label className="capitalize text-sm py-2">{field} :</Label>
              {field === "addressdetails" ? (
                <Textarea
                  name={field}
                  value={formData[field]}
                  placeholder={`Enter ${field}`}
                  onChange={handleChange}
                  className=""
                />
              ) : (
                <Input
                  type="text"
                  name={field}
                  value={formData[field]}
                  placeholder={`Enter ${field}`}
                  onChange={handleChange}
                  className="py-5"
                />
              )}
            </div>
          ))}

          {/* 🗓️ DOB Picker */}
          <div className="flex flex-col">
            <Label className="capitalize text-sm py-2">dob</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dobDate ? format(dobDate, "PPP") : "Select Date of Birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={dobDate}
                  onSelect={handleDateSelect}
                  captionLayout="dropdown"
                  mode="single"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 🖼️ Image Upload */}
          <div className="flex flex-col">
            <Label className="capitalize text-sm py-2">Profile Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          {/* 🔘 Submit */}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-center mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-5 text-base md:text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Please wait...
                </div>
              ) : (
                "Register Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProfile;
