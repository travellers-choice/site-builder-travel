import React from "react";

export default function page() {
  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Account Information</h1>

      <section className=" flex flex-col sm:flex-row">
        <section className=" flex  justify-center items-start p-3">
          <div className="w-[130px] h-[130px] bg-green-800 rounded-full text-white flex justify-center items-center whitespace-nowrap">
            change Picture
          </div>
        </section>
        <section className="flex flex-col items-center  w-full gap-2">
          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Email</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Country</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Phone number</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>
          <button className="bg-blue-500 text-white font-bold   px-4 py-2 rounded-lg mt-3">Update Info</button>
        </section>
      </section>
    </div>
  );
}
