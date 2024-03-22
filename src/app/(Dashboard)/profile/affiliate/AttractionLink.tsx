import React from "react";

export default function AttractionLink() {
  return (
    <div className="mt-5 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium  text-left">
        Affiliate Attractions Link
      </h1>
      <p className="text-sm my-6">
        Copy your personalized affiliate link of any of your's favorite
        attractions and get started for fun sharing and earning! For every one
        click and visit to the link will help you get 1 point, so share as much
        as possible... BEST OF LUCK !
      </p>

        <input type="text" className="w-full sm:w-4/6 p-3 bg-gray-100 focus:ring-0 focus:outline-none border rounded-md text-stone-500 "
        placeholder="Search for attractions" />

        <section className="w-full rounded-2xl drop-shadow-md overflow-hidden  mt-10 bg-white">
                <div className="w-full flex items-center bg-stone-200 px-9 py-3">
                    <div className="w-4/6">ATTRACTION NAME</div>
                    <div className="w-2/6">ACTION</div>
                </div>

                <div className="w-full flex items-center hover:bg-stone-100 p-9 border-t-2">
                    <div className="w-4/6">Gyrocopter Flight Dubai</div>
                    <div className="w-2/6"> 
                        <button className="bg-blue-500 text-white text-sm font-bold w-1/2 min-w-[100px] h-[40px] rounded-full">Copy</button>
                    </div>
                </div>

                <div className="w-full flex items-center hover:bg-stone-100 p-9 border-t-2">
                    <div className="w-4/6">Gyrocopter Flight Dubai</div>
                    <div className="w-2/6"> 
                        <button className="bg-blue-500 text-white text-sm font-bold w-1/2 min-w-[100px] h-[40px] rounded-full">Copy</button>
                    </div>
                </div>

                <div className="w-full flex items-center hover:bg-stone-100 p-9 border-t-2">
                    <div className="w-4/6">Gyrocopter Flight Dubai</div>
                    <div className="w-2/6"> 
                        <button className="bg-blue-500 text-white text-sm font-bold w-1/2 min-w-[100px] h-[40px] rounded-full">Copy</button>
                    </div>
                </div>
        </section>

    </div>
  );
}
