import React from "react";
import { MdLocationOn } from "react-icons/md";

interface Location {
  title: string;
  mapLink: string;
}

export default function Locations({ location }: { location: Location }) {
  return (
    <div className=" w-full h-full relative padding ">
      <img
        src="https://mytravellerschoice.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmap.1b4e4646.jpg&w=1920&q=75"
        alt="Location"
        className="object-cover mt-4 h-full w-full rounded-xl"
      />
      <a
        href={location.mapLink}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-Poppins text-xl font-medium	text-[#1a2b48] flex items-center"
      >
        <MdLocationOn
          size={30}
          color="black"
          className="text-[#1a2b48] font-Poppins font-thin m-1"
        />{" "}
        {location.title}
      </a>
    </div>
  );
}
