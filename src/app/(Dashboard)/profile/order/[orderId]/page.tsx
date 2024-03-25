'use client'
import { setcurrentProfilePage } from '@/redux/features/UserSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { LuArrowDownToLine } from "react-icons/lu";
export default function page(
  {
    params,
  }: {
    params: { orderId: string };
  }
):React.ReactElement {

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(setcurrentProfilePage({page:'Orders'}))
    });



  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center'>Order Details</h1>

            <section className='w-full   border rounded-2xl p-3 '>

                <section className='flex justify-between '>
                    <div className='sm:ml-[100px]'>
                        <h1 className='font-semibold text-lg'>Dubai Parks & Resorts</h1>
                        <h1 className='text-stone-500 text-sm'>Booking</h1>
                    </div>
                </section>
                <section className='flex justify-between sm:px-[100px] my-10'>
                    <div className='flex flex-col gap-2'>
                       <div className='flex '>
                        <h1 className=' w-20 font-medium'>Status</h1>
                        <h2 className='text-center text-stone-500 text-sm'>: Pending</h2>
                       </div>

                       <div className='flex '>
                        <h1 className='w-20 font-medium'>Adults</h1>
                        <h2 className='text-center text-stone-500 text-sm'>: 1 Adults</h2>
                       </div>
                       <div className='flex '>
                        <h1 className='w-20 font-medium'>Children</h1>
                        <h2 className='text-center text-stone-500 text-sm'>: 0 Children</h2>
                       </div>
                       <div className='flex '>
                        <h1 className='w-20 font-medium'>Infant</h1>
                        <h2 className='text-center text-stone-500 text-sm'>: 0 Infants</h2>
                       </div>
                       
                    </div>
                   <div className='sm:pr-[40px]'>
                        <h1>Without Transfer</h1>
                        <h1 className='text-sm'>March 20, 2024</h1>
                    </div>
                </section>
                <section className='flex justify-between sm:px-[100px]'>

                    <div className=' '>
                        <h1 className='font-medium'>Grand Total</h1>
                        <h1 className='text-center text-stone-500 text-sm'>295.00 AED</h1>
                    </div>
                  
                  <button className='border border-blue-500 text-sm font-bold rounded-2xl text-blue-900 px-2 flex gap-2 justify-center items-center transition-all hover:bg-blue-900 hover:text-white'>
                    <LuArrowDownToLine className='w-6 h-6 ' />
                    Dawnload Invoice</button>

                </section>
            </section>

          



   
    </div>
  )
}
