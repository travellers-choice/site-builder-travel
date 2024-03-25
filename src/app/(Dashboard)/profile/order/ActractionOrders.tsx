import Link from "next/link";
import React from "react";

export default function ActractionOrders() {
  return (
    <div>
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-medium my-10 ">
        Attraction Orders
      </h1>
      <Link href={'/profile/order/order-details'} className="w-full flex flex-col sm:flex-row gap-3  h-fit border rounded-xl overflow-hidden p-2 ">
        <img
          className="w-full sm:w-[250px] h-[200px]  sm:h-[150px]  rounded-xl flex-shrink-0"
          src="https://mytravellerschoice.com/_next/image?url=https%3A%2F%2Fapi-server-i1.mytravellerschoice.com%2Fpublic%2Fimages%2Fhome%2Fimages-1672464923312-853360323.jpg%20&w=828&q=75"
          alt="img"
        />
        <section className="w-full text-sm flex flex-col h-[200px]  sm:h-[150px] justify-between">
          <div className="flex justify-between">
          <h1>Ref No: B2CATO_1710933715074814</h1>
          <h1>Wed Mar 20 2024</h1>
          </div>
          <h1>Name: DUBAI PARKS & RESORTS</h1>
          <h1>Adult Count:1</h1>
          <h1>Child Count:1</h1>
          <div  className="flex justify-between">
          <h1>Status: pending</h1>
          <h1>Total Amount: 295.00 AED</h1>
          </div>
        </section>
      </Link>
      
    </div>
  );
}
