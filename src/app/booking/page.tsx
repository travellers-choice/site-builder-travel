import React from 'react'
import { MdLocationPin } from "react-icons/md";
import { MdInfo } from "react-icons/md";
export default function BookinPage() {
  return (
    <div className='flex flex-col-reverse lg:flex-row padding pb-5 gap-5'>
      <section className='w-full lg:w-2/3  py-5 '>
        <h1 className='text-xl lg:text-4xl border-b-4 font-medium pb-5'>Booking Submission</h1>
            <section className='w-full  flex flex-col sm:flex-row gap-3 mt-3'>
                <div className='w-full flex flex-col'>
                    <label>First Name</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
                <div className='w-full flex flex-col'>
                    <label>Last Name</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
            </section>

            <section className='w-full  flex flex-col sm:flex-row gap-3 mt-3'>
                <div className='w-full flex flex-col'>
                    <label>Email</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
                <div className='w-full flex flex-col'>
                    <label>Phone</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
            </section>

            <section className='w-full  flex flex-col sm:flex-row gap-3 mt-3'>
                <div className='w-full flex flex-col'>
                    <label>State/Province/Region</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
                <div className='w-full flex flex-col'>
                    <label>Country</label>
                    <input
                    className='p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded'
                    type="text" />
                </div>
            </section>
            <label>Special Requirements</label>
            <textarea placeholder='Special Requirements' 
            className='w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded h-[100px] max-h-[110px] min-h-[80px]' 
            name="" ></textarea>
            <section>
                    <h1 className='font-medium text-lg'>Select Payment Method</h1>
                    <div className='flex w-full md:w-1/2 justify-start items-center bg-gray-100 p-3 gap-2 border'>
                    <input type="radio" />
                    <h2>Offline Payment</h2>
                    </div>
                    <button className='bg-orange-600 text-white px-9 py-2 mt-3 rounded'>Submit</button>
            </section>

           
      </section>

      
      
      
      <section className='w-full lg:w-1/3 py-5 '>
      <h1 className='text-xl lg:text-4xl font-medium pb-5'>Your Booking</h1>
      <div className='border-2 w-full'>

        <section className='w-full p-5 border-b-2 '>
            <h2 className='font-medium sm:text-lg'>Eastern Discovery (Start New Orleans)</h2>
            <div className='flex items-center gap-1'>
            <MdLocationPin />
            <h2>Prince St Station</h2>
            </div>

            <div className='flex items-center gap-1'>
            <MdInfo />
            <h2>Vendor: Kaytlyn Alvapriya</h2>
            </div>
        </section>

        <section className='w-full p-5 border-b-2 '>
            <div className='flex justify-between'>
                <h1>Start date:</h1>
                <h2 className='text-stone-500'>03/15/2024</h2>
            </div>
            <div className='flex justify-between'>
                <h1>Duration:</h1>
                <h2 className='text-stone-500'>2 hours</h2>
            </div>
            <div className='flex justify-between'>
                <h1>Adult:</h1>
                <h2 className='text-stone-500'>2</h2>
            </div>
        </section>
        <section className='w-full p-5 border-b-2 '>
            <div className='flex justify-between'>
                <h1>Adult: 2 * $1.000</h1>
                <h2 className='text-stone-500'>$2.000</h2>
            </div>
            <div className='flex justify-between'>
                <h1>Service fee </h1>
                <h2 className='text-stone-500'>$100</h2>
            </div>

            <hr  className='w-full my-5'/>
            <div className='flex justify-between'>
                <h1 className='font-medium text-lg'>Total:</h1>
                <h2 className='text-blue-500 '>$2.400</h2>
            </div>
        </section>
      </div>
      </section>
    </div>
  )
}
