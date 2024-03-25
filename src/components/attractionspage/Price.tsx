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
    lowPrice: number;
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

  const activities = data?.activities;

  const isTransferAvailable = activities?.map(
    (activity) => activity?.isTransferAvailable
  );

  const lowPrice = activities?.map((activity) => activity?.lowPrice);

  const activityName = data?.title;
  const activityIds = activities?.map((activity) => activity?._id);

  const location = data?.destination?.name;
  const duration = data?.duration;

  const adultPrice = activities[0]?.adultPrice;
  const childPrice = activities[0]?.childPrice;

  const infantPrice = activities[0]?.childPrice;

  const router = useRouter();

  const handleBooking = () => {
    const bookingData: BookingData = {
      adultCount: count,
      childCount: child,
      infantCount: infant,
      date: selectedDate,
      type: transferType,
      activityName: activityName,
      activityIds: activityIds,
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
    <main className="flex flex-col container w-full lg:mt-[84px]">
      <section className="border-t-4 border-x-2 border-t-[#5191fa] p-6 text-center">
        <h6 className="font-Poppins text-sm font-normal text-[#5e6d77] -mt-2">
          from
          <span className="font-Poppins text-2xl font-medium text-[#c03] ml-2">
            ${lowPrice}
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

      <section className="border-2 flex relative p-4 justify-between">
        <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
          Start Date
        </span>
        <span
          className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1 cursor-pointer"
          onClick={handleCalendarClick}
        >
          <IoChevronDownSharp />
        </span>
        {isCalendarOpen && (
          <div className="absolute z-10 top-14 right-0 bg-white border border-gray-300 p-3 rounded shadow-lg w-[285px] h-300px">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        )}
      </section>
      <section className="border-x-2 border-b-2 flex p-5 justify-between items-center">
        <span className="font-Poppins text-base	font-medium	 text-[#1a2b48] leading-normal">
          Choose Transfer Type?
        </span>
        <span>
          <TransferDropdown
            isTransferAvailable={isTransferAvailable}
            onSelect={handleTransferTypeChange}
          />
        </span>
      </section>

      <section className="border-x-2 flex justify-between">
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
        <div className="flex items-center p-3">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleCountDecrease}
          />
          <span className="p-5">{count}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleCountIncrease}
          />
        </div>
      </section>

      <section className="border-x-2 border-y-2 flex justify-between">
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
        <div className="flex items-center p-3">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleChildDecrease}
          />
          <span className="p-5">{child}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleChildIncrease}
          />
        </div>
      </section>
      <section className="border-x-2 border-b-2 flex justify-between">
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
        <div className="flex items-center p-3">
          <IoIosRemoveCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleInfantDecrease}
          />
          <span className="p-5">{infant}</span>
          <IoIosAddCircleOutline
            className="text-[#5191fa] text-xl"
            onClick={handleInfantIncrease}
          />
        </div>
      </section>
      <section className="border-b-2 border-x-2 ">
        <div className=" py-3 text-center">
          <button
            className="btn bg-[#5191fa] py-3 px-5 text-[#fff] rounded-md"
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
