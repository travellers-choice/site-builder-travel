import React from "react";
import { MdLocationOn } from "react-icons/md";

export default function Header() {
  return (
    <div className="mt-4">
      <h1 className="font-Poppins text-3xl font-medium 	text-[#1a2b48]">
        Eastern Discovery (Start New Orleans)
      </h1>
      <div
        className="location mt-2"
        style={{ display: "flex", alignItems: "center" }}
      >
        <MdLocationOn
          size={16}
          color="black"
          className="text-[#1a2b48] font-Poppins font-thin"
        />
        <span> Prince St Station</span>
      </div>
    </div>
  );
}
