"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const dropdownData = {
  "Matrimony Profile for": ["Bride", "Groom", "Relative", "Friend", "Self"],
  rasi: ["Mesham", "Rishabam", "Mithunam", "Kadagam", "Simmam"],
  nakshatram: ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigasira"],
  laknam: ["Mesha", "Vrishaba", "Mithuna", "Kataka", "Simha"],
  color: ["Fair", "Wheatish", "Dark", "Very Fair", "Medium"],
  maritalstatus: ["Single", "Divorced", "Widowed", "Separated", "Married"],
  gender: ["Male", "Female", "Other"],
  education: ["B.E", "MBA", "B.Sc", "MCA", "Ph.D"],
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
    gender: "",
    education: "",
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

  console.log(Object.entries(dropdownData));

  const [image, setImage] = useState(null);

  const handleSelectChange = (name, value) => {
    setFormData((prev) => setFormData({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 md:pt-15 lg:pt-20 shadow-lg rounded-2xl p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4a2f1c]  text-center mb-8">
        Matrimony Profile Registration
      </h1>
      <form className="grid grid-cols-1 pt-10 md:pt-15 lg:pt-20 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-6">
        {Object.entries(dropdownData).map(([key, options]) => (
          <div key={key} className="flex flex-col w-full">
            <Label className="capitalize text-sm py-2 ">{key} :</Label>
            <Select
              onValueChange={(value) => handleSelectChange()}
              className="w-full"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${key}`} />
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
        ))}
      </form>
    </div>
  );
};

export default RegisterProfile;
