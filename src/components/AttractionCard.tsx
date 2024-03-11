
import { capitalizeFirstLetters ,priceConversion} from '@/utility/commonFunctions';
import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa";
type AttractionCardProps={
  attraction:any
}
export default function AttractionCard({attraction}:AttractionCardProps) {
  function formatNumberToOneDecimalPlace(num: number): string {
    return num.toFixed(1);
  }



  return (
    <div className='col-span-6 sm:col-span-3 lg:col-span-2 h-[350px]  border'>
        <div className='w-full h-[200px] relative'>
          <div className='w-[90px] h-[30px] bg-blue-400 absolute left-0 top-[10%] text-white rounded-r-lg text-sm flex justify-center items-center'>{capitalizeFirstLetters(attraction?.bookingType)}</div>
        <img className='w-full h-full' src={`${process.env.NEXT_PUBLIC_SERVER_URL+attraction?.images[0]}`}alt="" />
        </div>
      <div className='p-2 w-full h-[150px] '>
        
            <h1 className=''>{capitalizeFirstLetters(attraction?.title)}</h1>

              <section className='flex justify-between'>
            <div className='text-stone-500 text-sm'>{capitalizeFirstLetters(attraction?.destination?.name)}</div>


        <div className='text-sm  text-red-600'>{capitalizeFirstLetters(attraction?.category?.categoryName)}</div>
              </section>

             <div className='flex justify-between'>

            <div className='text-stone-500'> <span className='text-black'>
              {/* {priceConversion(attraction?.activity?.lowPrice + (attraction?.activity?.promoAmountAdult ? attraction?.activity?.promoAmountAdult : 0), attraction?.selectedCurrency, true)} */}
              
            {attraction?.activity?.lowPrice } AED
              </span>  /person</div>
            

             <div className='flex items-center text-sm'>
            <FaStar className='w-4 h-4 text-yellow-400' />
            
            <div>{formatNumberToOneDecimalPlace(attraction?.averageRating)}  <span className='text-stone-500'>{`(${attraction?.totalReviews})` }</span></div>
            </div>
             </div>
      </div>
    </div>
  )
}
