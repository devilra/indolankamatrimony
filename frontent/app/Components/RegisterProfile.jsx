"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerProfile } from "../redux/profileSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// 🧾 Dropdown data (First code base-la update aagirukku)
const dropdownData = {
  "Matrimony Profile for": ["Bride", "Groom", "Relative", "Friend", "Self"],
  Rasi: [
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
  Nakshatram: [
    "அஸ்வினி",
    "பரணி",
    "கார்த்திகை",
    "ரோகிணி",
    "மிருகசீரிடம்",
    "திருவாதிரை",
  ], // Note: First code-la irundha short list
  Laknam: ["மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி"], // Note: First code-la irundha short list
  Color: ["Fair", "Black", "White", "Very Fair"],
  "Marital Status": [
    "UnMarried",
    "Divorced",
    "Widowed",
    "Separated",
    "Married",
  ],
  Gender: ["Male", "Female"],
  Education: ["SSLC", "12th", "B.E", "B.Tech", "MBA", "MCA"], // Note: First code-la irundha short list
  Occupation: ["Engineer", "Doctor", "Teacher", "Business", "Student"],
  "Annual Income": ["<5L", "5L-10L", "10L-20L", "20L-50L", ">50L"],
  "Mother Tongue": ["Tamil", "Telugu", "Malayalam", "Kannada", "Hindi"],
  Religion: ["Hindu", "Christian", "Muslim", "Others"],
  Caste: ["Nadar", "Vellalar", "Naidu", "Mudaliar", "Others"],
  "Father's Occupation": [
    "Retired",
    "Business",
    "Farmer",
    "Engineer",
    "Teacher",
  ],
  "Mother's Occupation": [
    "Homemaker",
    "Teacher",
    "Doctor",
    "Retired",
    "Business",
  ],
};

// 🔁 Dropdown field mapping (First code base-la update aagirukku)
const dropdownFieldMap = {
  "Matrimony Profile for": "mprofile",
  Rasi: "rasi",
  Nakshatram: "nakshatram",
  Laknam: "laknam",
  Color: "color",
  "Marital Status": "maritalstatus",
  Gender: "gender",
  Education: "education",
  Occupation: "occupation",
  "Annual Income": "annualincome",
  "Mother Tongue": "mothertongue",
  Religion: "religion",
  Caste: "caste",
  "Father's Occupation": "foccupation",
  "Mother's Occupation": "moccupation",
};

// 📄 Field order - HEADINGS AND FIELDS ADDED/ARRANGED HERE
const fieldOrder = [
  { label: "Matrimony Profile for", type: "select" },
  { label: "Name", name: "pname", type: "input" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Age", name: "age", type: "input" },
  { label: "Place of Birth", name: "pbrith", type: "input" },
  { label: "Time of Birth", name: "tbrith", type: "input" },
  { label: "Rasi", type: "select" },
  { label: "Nakshatram", type: "select" },
  { label: "Laknam", type: "select" },
  { label: "Height", name: "height", type: "input" },
  { label: "Weight", name: "weight", type: "input" },
  { label: "Color", type: "select" },
  { label: "Marital Status", type: "select" },
  { label: "Gender", type: "select" },
  { label: "Education", type: "select" },
  { label: "Occupation", type: "select" },
  { label: "Annual Income", type: "select" },
  { label: "Mother Tongue", type: "select" },
  { label: "Religion", type: "select" },
  { label: "Caste", type: "select" },
  { label: "Subcaste", name: "subcaste", type: "input" }, // --- FAMILY DETAILS HEADING ADDED ---

  { label: "Family Details", type: "heading" },

  { label: "Father's Name", name: "fname", type: "input" },
  { label: "Father's Occupation", type: "select" },
  { label: "Mother's Name", name: "mname", type: "input" },
  { label: "Mother's Occupation", type: "select" },
  { label: "Sister", name: "sister", type: "input" },
  { label: "Brother", name: "brother", type: "input" },
  { label: "Children", name: "children", type: "input" },
  { label: "Residing Place", name: "rplace", type: "input" }, // --- CONTACT DETAILS HEADING ADDED ---
  { label: "Contact Details", type: "heading" },

  { label: "Whatsapp Number", name: "whatsappno", type: "input" }, // Order changed
  { label: "Email", name: "email", type: "input" },
  { label: "Address Details", name: "addressdetails", type: "textarea" },
  { label: "Phone Number", name: "phonenumber", type: "input" },
  { label: "Profile Image", name: "image", type: "file" },
];

export default function RegisterProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.profile);

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
    gender: "",
    education: [],
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

  const [image, setImage] = useState(null);
  const [dobDate, setDobDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    if (name === "education") {
      // Logic for multi-select (as per first code)
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

  const handleDateSelect = (date) => {
    setDobDate(date); // Date format for backend (as per first code)
    setFormData((prev) => ({ ...prev, dob: format(date, "yyyy-MM-dd") }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = { ...formData };
    for (let key in updated) {
      if (!updated[key] || updated[key].length === 0) {
        updated[key] = "N/A"; // Handle empty fields
      }
    }

    if (Array.isArray(updated.education) && updated.education.length === 0) {
      updated.education = "N/A";
    } // Prepare FormData for API call

    const form = new FormData();
    for (let key in updated) {
      if (key === "education") {
        // Handle multi-select education field
        if (Array.isArray(updated.education) && updated.education.length > 0) {
          updated.education.forEach((e) => form.append("education[]", e));
        } else {
          form.append(key, updated[key]); // Append "N/A" or empty array if needed
        }
      } else {
        form.append(key, updated[key]);
      }
    }

    if (image) form.append("image", image);

    const result = await dispatch(registerProfile(form));
    if (registerProfile.fulfilled.match(result)) {
      const { data } = result.payload;
      toast("Profile Registered Successfully ✅");
      sessionStorage.setItem(
        "registrationSuccess",
        JSON.stringify({ id: data.id, name: data.pname })
      );
      router.push("/success");
    } else {
      // Use result.payload?.message if available, otherwise a generic error
      toast.error(result.payload?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 md:pt-15 lg:pt-15 shadow-lg rounded-2xl p-6 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#4a2f1c]">
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
          onSubmit={handleSubmit} // grid-cols-1 added for mobile/default view
          className="md:grid   flex flex-col md:grid-cols-2 lg:flex lg:flex-col pt-10 md:pt-15 lg:pt-5 lg:w-[370px] lg:grid-cols-1 gap-2 md:gap-6 lg:gap-2"
        >
          {fieldOrder.map((field, index) => {
            const fieldName = dropdownFieldMap[field.label] || field.name; // 0. HEADING FIELD (New Logic)

            if (field.type === "heading") {
              return (
                // col-span-full is used to make the heading span the full width (1 column on mobile, 2 on MD)
                <h2
                  key={field.label}
                  className="col-span-full text-center font-semibold mt-4 mb-2 text-2xl border-b pb-1"
                >
                  {field.label}
                </h2>
              );
            } // 1. SELECT FIELD

            if (field.type === "select") {
              const options = dropdownData[field.label];
              if (!options) return null; // Special handling for multi-select Education

              if (fieldName === "education") {
                return (
                  <div key={field.label} className="flex flex-col">
                    <Label className="text-sm py-2">{field.label}</Label>
                    <Select
                      onValueChange={(val) =>
                        handleSelectChange(fieldName, val)
                      }
                    >
                      <SelectTrigger className="w-full py-5">
                        <div className="flex flex-wrap gap-1">
                          {formData.education.length === 0
                            ? "Select Education"
                            : formData.education.map((item) => (
                                <span
                                  key={item}
                                  className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                                >
                                  {item}
                                </span>
                              ))}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.education.length > 0 &&
                        formData.education.map((item) => (
                          <span
                            key={`chip-${item}`}
                            className="bg-neutral-200 text-neutral-800 px-2 py-1 rounded-full text-[10px] flex items-center gap-1"
                          >
                            {item}

                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectChange(fieldName, item);
                              }}
                              className="cursor-pointer text-neutral-600 font-bold"
                            ></span>
                          </span>
                        ))}
                    </div>
                  </div>
                );
              } // Standard Select field

              return (
                <div key={field.label} className="flex flex-col">
                  <Label className="text-sm py-2">{field.label}</Label>{" "}
                  <Select
                    value={formData[fieldName]}
                    onValueChange={(val) => handleSelectChange(fieldName, val)}
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>

                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            } // 2. DATE PICKER (acts as an input field in the flow)

            if (field.type === "date") {
              return (
                <div key={field.label} className="flex flex-col">
                  <Label className="text-sm py-2">{field.label}</Label>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start py-5">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dobDate
                          ? format(dobDate, "PPP")
                          : "Select Date of Birth"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        selected={dobDate}
                        onSelect={handleDateSelect}
                        mode="single"
                        captionLayout="dropdown"
                        fromYear={1950}
                        toYear={2025}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              );
            } // 3. TEXTAREA (a type of input)

            if (field.type === "textarea") {
              return (
                // col-span-full makes the textarea span 2 columns on medium screens
                <div key={field.name} className="flex flex-col md:col-span-2">
                  <Label className="text-sm py-2">{field.label}</Label>
                  <Textarea
                    name={fieldName}
                    value={formData[fieldName]}
                    placeholder={`Enter ${field.label}`}
                    onChange={handleChange}
                  />
                </div>
              );
            } // 4. FILE INPUT

            if (field.type === "file") {
              return (
                <div key={field.name} className="flex flex-col">
                  <Label className="text-sm py-2">{field.label}</Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </div>
              );
            } // 5. REGULAR TEXT INPUT

            if (field.type === "input") {
              return (
                <div key={field.name} className="flex flex-col">
                  <Label className="text-sm py-2">{field.label}</Label>
                  <Input
                    type="text"
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="py-5"
                  />
                </div>
              );
            }

            return null; // For safety
          })}
          <div className="col-span-2 flex justify-center mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-5 text-lg"
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
}
