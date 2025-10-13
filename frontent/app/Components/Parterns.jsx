"use client";

import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import React from "react";

const Parterns = () => {
  return (
    <div className="pb-10 max-w-6xl px-5 md:px-5 mx-auto">
      <InputGroup>
        <InputGroupInput
          className="border border-neutral-400 py-5 rounded-lg"
          placeholder="Search by ID or Name"
        />
      </InputGroup>
    </div>
  );
};

export default Parterns;
