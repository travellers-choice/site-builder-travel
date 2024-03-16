import React from "react";
import { MdLocationOn } from "react-icons/md";

interface Data{
  title:string
}

export default function AttractionTitle({data}:{data:Data}) {
  return (
    <div className="mt-4 max-[320px]:text-start">
      <h1 className="font-Poppins text-3xl font-medium 	text-[#1a2b48] max-[560px]:text-2xl">
        {data.title}
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
