import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function FavouritePage() {
  return (
    <div className="p-5 lg:pt-[100px]">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Favourites</h1>
      
      <div className=''>
      <div className='flex flex-col sm:flex-row h-fit  border'>
        <div className='w-full h-[200px] relative'>
          <div className='w-[90px] h-[30px] bg-blue-400 absolute left-0 top-[10%] text-white rounded-r-lg text-sm flex justify-center items-center'>Booking</div>
        <img className='w-full h-full' src="https://sandbox.bookingcore.co/uploads/demo/tour/tour-1.jpg" alt="" />
        </div>
      <div className='p-2 w-full h-[150px] flex flex-col justify-around pt-5'>
            <h1 className=''>American Parks Trail end Rapid City</h1>

              <section className='flex justify-between'>
            <div className='text-stone-500 text-sm'>Dubai</div>


        <div className='text-sm  text-red-600'>Attractions</div>
              </section>

             <div className='flex justify-between'>

            <div className='text-stone-500'> <span className='text-black'>335.00 AED</span>  /person</div>
            

             <div className='flex items-center text-sm'>
            <FaStar className='w-4 h-4 text-yellow-400' />
            <div>4.6</div>
            </div>
             </div>
      </div>
    </div>
      </div>
    </div>
  )
}
