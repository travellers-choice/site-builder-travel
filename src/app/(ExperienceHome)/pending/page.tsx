import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { MdInfo, MdLocationPin } from "react-icons/md";
export default function Success() {
  return (
    <div className="w-full padding pb-10 md:pb-16">
      <section className="flex flex-col md:flex-row gap-3">
        <section className="w-full  md:w-2/3 flex h-fit ">
          <div className="w-1/6 flex-shrink-0  overflow-hidden">
            <FaExclamationCircle className="max-w-[80px] min-w-[50px] w-full h-full text-orange-500" />
          </div>
          <div className="w-5/6 flex flex-col justify-center ">
            <h1 className="text-sm sm:text-base font-medium">
              <span className="font-bold">Anshid</span> your booking was pending
            </h1>
            <h3 className="text-[10px] sm:text-sm text-stone-500">
              Booking details has bean sent to Anshid@bookh.com
            </h3>
          </div>
        </section>

        <section className="w-full sm:w-1/3 flex pl-3 justify-center flex flex-col border-l-4 border-blue-500">
          <h2 className="font-medium text-sm">
            Booking No: <span className="text-stone-500 text-sm">159</span>
          </h2>
          <h2 className="font-medium text-sm">
            Booking Date:{" "}
            <span className="text-stone-500 text-sm">02/03/2034</span>
          </h2>
          <h2 className="font-medium text-sm">
            Booking Method:{" "}
            <span className="text-stone-500 text-sm">Offline payment</span>
          </h2>
          <h2 className="font-medium text-sm">
            Booking Status:{" "}
            <span className="text-stone-500 text-sm">Pending</span>
          </h2>
        </section>
      </section>

      <section className="flex flex-col md:flex-row gap-3 mt-5">
        <section className="w-full  md:w-2/3  h-fit ">
          <h1 className="text-base sm:text-lg md:text-xl font-medium  w-full mb-3">
            Your Information
          </h1>
          <div className="w-full border p-2 rounded">
            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">First Name</h2>
              <h2 className="text-sm text-stone-500">Anshid</h2>
            </div>

            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">Last Name</h2>
              <h2 className="text-sm text-stone-500">Anshi</h2>
            </div>

            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">Email</h2>
              <h2 className="text-sm text-stone-500">Anshid@gmail.com</h2>
            </div>
            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">Phone</h2>
              <h2 className="text-sm text-stone-500">3432123456</h2>
            </div>
            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">State/Province/Region</h2>
              <h2 className="text-sm text-stone-500">Dubai</h2>
            </div>
            <div className="flex justify-between w-full mb-2 border-b py-2">
              <h2 className="text-sm">Country</h2>
              <h2 className="text-sm text-stone-500">UAE</h2>
            </div>
            <h2 className="text-sm">Special Requirements</h2>
          </div>
          <div className=" w-full  justify-center mt-5 hidden md:flex">
            <button className="bg-blue-500 text-white mx-auto text-sm font-semibold px-4 py-2 rounded">
              Booking History
            </button>
          </div>
        </section>

        <section className="w-full  md:w-1/3  h-fit  bo rder rounded">
          <h1 className="text-base sm:text-lg md:text-xl font-medium  w-full mb-3">
            Your Booking
          </h1>

          <div className="border w-full">
            <section className="w-full p-5 border-b  ">
              <h2 className="text-base md:text-lg font-medium">
                Eastern Discovery (Start New Orleans)
              </h2>
              <div className="flex items-center gap-1">
                <MdLocationPin />
                <h2>Prince St Station</h2>
              </div>

              <div className="flex items-center gap-1">
                <MdInfo />
                <h2>Vendor: Kaytlyn Alvapriya</h2>
              </div>
            </section>

            <section className="w-full p-5 border-b ">
              <div className="flex justify-between">
                <h1>Start date:</h1>
                <h2 className="text-stone-500">03/15/2024</h2>
              </div>
              <div className="flex justify-between">
                <h1>Duration:</h1>
                <h2 className="text-stone-500">2 hours</h2>
              </div>
              <div className="flex justify-between">
                <h1>Adult:</h1>
                <h2 className="text-stone-500">2</h2>
              </div>
            </section>
            <section className="w-full p-5 border-b">
              <div className="flex justify-between">
                <h1>Adult: 2 * $1.000</h1>
                <h2 className="text-stone-500">$2.000</h2>
              </div>
              <div className="flex justify-between">
                <h1>Service fee </h1>
                <h2 className="text-stone-500">$100</h2>
              </div>

              <hr className="w-full my-5" />
              <div className="flex justify-between">
                <h1 className="font-medium text-lg">Total:</h1>
                <h2 className="text-blue-500 ">$2.400</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="font-medium text-lg">Paid:</h1>
                <h2 className="text-blue-500 ">$2.400</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="font-medium text-lg">Remain:</h1>
                <h2 className="text-blue-500 ">$2.400</h2>
              </div>
            </section>
          </div>
          <div className=" w-full  justify-center mt-5 flex md:hidden">
            <button className="bg-blue-500 text-white mx-auto text-sm font-semibold px-4 py-2 rounded">
              Booking History
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}
