import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { TbBeachOff } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";

interface Data {
  duration: number;
  durationType: string;
  bookingType: string;
}

export default function Clock({ data }: { data: Data }) {
  return (
    <div className="flex mt-4 flex-wrap md:flex border-t-2 border-b-2 ">
      <div className="basis-1/3 flex items-center p-5   w-full md:w-1/4 lg:w-1/4 max-[640px]:basis-full">
        <BiTimeFive size={38} color="#1a2b48" style={{ marginRight: "5px" }} />
        <span className="text-m font-medium	text-[#1a2b48] flex flex-col ml-3">
          Duration
          <small className="font-Poppins text-sm font-normal text-[#5e6d77] -mt-1">
            {data.duration} {data.durationType}
          </small>
        </span>
      </div>

      <div className="basis-1/3 flex items-center p-5 w-full md:w-1/4 lg:w-1/4 max-[640px]:basis-full">
        <TbBeachOff size={38} color="#1a2b48" style={{ marginRight: "5px" }} />
        <span className="text-m font-medium	text-[#1a2b48]  flex flex-col ml-3">
          Tour Type
          <small className="font-Poppins text-sm font-normal text-[#5e6d77;] -mt-1 ml-1">
            {data.bookingType}
          </small>
        </span>
      </div>

      <div className="basis-1/3 flex items-center p-5 w-full md:w-1/4 lg:w-1/4 max-[640px]:basis-full">
        <HiOutlineUserGroup
          size={38}
          color="#1a2b48"
          style={{ marginRight: "5px" }}
        />

        <span className="text-m font-medium	text-[#1a2b48] flex flex-col ml-3">
          Group Size
          <small className="font-Poppins text-sm font-normal text-[#5e6d77] -mt-1">
            11 persons
          </small>
        </span>
      </div>
    </div>
  );
}
