'use client'
import React, { useEffect } from "react";
import ActractionOrders from "./ActractionOrders";
import { useSelector, useDispatch } from 'react-redux';
import { setcurrentProfilePage } from "@/redux/features/UserSlice";
// import { increment } from "@/redux/features/InitialSlice"; 

export default function OrderPage() {
  // const { countries} = useSelector((state: any) => state.initials)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setcurrentProfilePage({page:'Orders'}))
  });


  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">
        Orders
      </h1>
      <section className="flex">
        <div className="flex border-b-4 border-blue-500 pb-2 px-4  text-blue-500">
        Attractions
        </div>
      </section>
       
      <ActractionOrders />
    </div>
  );
}
