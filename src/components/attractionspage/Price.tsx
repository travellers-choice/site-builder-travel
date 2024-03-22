import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import ModalEnquiry from "./ModalEnquiry";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TransferDropdown from "./TransferDropdown";
import { useRouter } from "next/navigation";

interface BookingData {
  adultCount: number;
  childCount: number;
  infantCount: number;
  date: Date;
  type: string;
  activityName: string;
  activityIds: string[];
  location: string;
  duration: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

interface Data {
  activities: {
    adultAgeLimit: number;
    adultPrice: number;
    childAgeLimit: number;
    childPrice: number;
    infantAgeLimit: number;
    infantPrice: number;
    _id: string;
    isTransferAvailable: boolean;
  }[];
  title: string;
  destination: {
    name: string;
  };
  duration: number;
}

export default function Price({ data }: { data: Data }) {
  const [count, setCount] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [transferType, setTransferType] = useState("without");

  const handleEnquiryClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange: CalendarProps["onChange"] = (date) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      setIsCalendarOpen(false);
    }
  };

  const handleCountDecrease = () => {
    setCount(Math.max(1, count - 1));
  };

  const handleCountIncrease = () => {
    setCount(count + 1);
  };

  const handleChildDecrease = () => {
    setChild(Math.max(0, child - 1));
  };

  const handleChildIncrease = () => {
    setChild(child + 1);
  };

  const handleInfantDecrease = () => {
    setInfant(Math.max(0, infant - 1));
  };

  const handleInfantIncrease = () => {
    setInfant(infant + 1);
  };

  const handleTransferTypeChange = (type: string) => {
    setTransferType(type);
  };

  const activities = data.activities;

  const isTransferAvailable = activities.map((activity)=>activity.isTransferAvailable)

  const activityName = data.title;
const activityIds = activities.map((activity) => activity._id);



  const location = data.destination.name;
  const duration = data.duration;

  const adultPrice = activities[0].adultPrice;
  const childPrice = activities[0].childPrice;

  const infantPrice = activities[0].childPrice;

  const router = useRouter();

  const handleBooking = () => {
    const bookingData: BookingData = {
      adultCount: count,
      childCount: child,
      infantCount: infant,
      date: selectedDate,
      type: transferType,
      activityName: activityName,
      activityIds:activityIds,
      location: location,
      duration: duration,
      adultPrice: adultPrice,
      childPrice: childPrice,
      infantPrice: infantPrice,
    };

    const queryString = new URLSearchParams(bookingData as any).toString();

    router.push(`/booking?${queryString}`);
  };

  return (
    <main className="flex flex-col mt-[73px] p-3 m-4">
      <section className="border-t-4 border-x-2 border-t-[#5191fa] flex flex-col items-center p-6">
        <span className="font-Poppins text-lg font-small text-[#c03] ml-8 line-through ">
          $2100
        </span>
        <h6 className="font-Poppins text-sm font-normal text-[#5e6d77] -mt-2">
          from
          <span className="font-Poppins text-2xl font-medium text-[#1a2b48] ml-2">
            $835
          </span>
        </h6>
      </section>

      <section className="border-x-2 bg-[#f9f9f9]">
        <div className="flex flex-row py-6 relative">
          <span className="px-8 text-[#5191fa] font-Poppins text-sm underline underline-offset-4 cursor-pointer	font-medium	absolute left-0 top-3">
            BOOK
          </span>
          <span
            className="px-6 cursor-pointer font-Poppins text-sm	font-medium	 text-[#1a2b4e] leading-normal	absolute right-0 top-3"
            onClick={handleEnquiryClick}
          >
            ENQUIRY
          </span>
        </div>
      </section>

      <section className="border-2 flex relative">
        <div className="flex   p-4">
          <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal	">
            Start Date
          </span>
          <span
            className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1 cursor-pointer ml-8"
            onClick={handleCalendarClick}
          >
            <IoChevronDownSharp className="inline-block mb-1 ml-11" />
          </span>
          {isCalendarOpen && (
            <div className="absolute z-10 top-14 right-0 bg-white border border-gray-300 p-3 rounded shadow-lg w-[285px] h-300px">
              <Calendar  onChange={handleDateChange} value={selectedDate} />
            </div>
          )}
        </div>
      </section>
      <section className="border-x-2 border-b-2 flex">
        <div className="p-4 flex flex-col">
          <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
            Choose Transfer Type?
          </span>
          <span className="border-2 rounded-lg py-2 px-8 mt-3">
            <TransferDropdown
              isTransferAvailable={isTransferAvailable}
              onSelect={handleTransferTypeChange}
            />
          </span>
        </div>
      </section>

      <section className="border-x-2 flex">
        <div className="flex  flex-col p-4">
          <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
            Adult
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1">
            Age {activities[0]?.adultAgeLimit}+
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-0">
            ${activities[0]?.adultPrice} per person
          </span>
        </div>
        <div className="flex items-center">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleCountDecrease}
          />
          <span className="p-3">{count}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleCountIncrease}
          />
        </div>
      </section>

      <section className="border-x-2 border-y-2 flex">
        <div className="flex  flex-col p-4">
          <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
            Child
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1">
            Age {activities[0]?.childAgeLimit}
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-0">
            ${activities[0]?.childPrice} per person
          </span>
        </div>
        <div className="flex items-center ml-1">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleChildDecrease}
          />
          <span className="p-3">{child}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleChildIncrease}
          />
        </div>
      </section>
      <section className="border-x-2 border-b-2 flex">
        <div className="flex  flex-col p-4">
          <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
            Infant
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1">
            Age {activities[0]?.infantAgeLimit}
          </span>
          <span className="font-Poppins text-sm font-normal text-[#5e6d77] mt-0">
            ${activities[0]?.infantPrice} per person
          </span>
        </div>
        <div className="flex items-center ml-1">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleInfantDecrease}
          />
          <span className="p-3">{infant}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleInfantIncrease}
          />
        </div>
      </section>
      <section className="border-b-2 border-x-2 ">
        <div className=" py-3 text-center">
          <button
            className="btn bg-[#5191fa] py-4 px-7 text-[#fff] w-[200px] rounded-md"
            onClick={handleBooking}
          >
            <span className="text-md font-medium">BOOK NOW</span>
          </button>
        </div>
      </section>
      <ModalEnquiry isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
