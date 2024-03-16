import React from "react";

export default function Dashboard() {
  return (
    <div className="mt-5 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium  text-left">
        Dashboard
      </h1>

      <section className="w-full border rounded-xl p-3 ">
        <h2 className="text-sm text-right ">Affiliate Code: 100027</h2>
        <hr className="my-3" />
        <section className="w-full flex gap-5 flex-col items-center sm:flex-row justify-between">

          <div className="flex flex-col items-center py-7">
            <h2 className="">My Points</h2>
            <h1 className="text-4xl font-medium">0000</h1>
          </div>
          <div className="flex flex-col items-center py-7">
            <h2 className="">Total Points Earned</h2>
            <h1 className="text-4xl font-medium">0000</h1>
          </div>
          <div className="flex flex-col items-center py-7">
            <h2 className="">Total Redeemed</h2>
            <h1 className="text-4xl font-medium">0000</h1>
          </div>
          <div className="flex flex-col items-center py-7">
            <h2 className="">Total Clicks</h2>
            <h1 className="text-4xl font-medium">0000</h1>
          </div>
        </section>
      </section>
    </div>
  );
}
