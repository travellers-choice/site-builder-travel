import React from 'react'

export default function AffiliateSettings() {
  return (
    <div className="mt-5 w-full">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium  text-left mb-6">
    Settings
    </h1>
      
      <div className='gap-6 w-full flex flex-col sm:flex-row'>
       
        <div className='w-full sm:w-1/2 p-3 rounded-2xl border'>
        <div className='w-full h-[100px]'>
            <h3>My Points</h3>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium '>0000</h1>
        </div>

            <hr className='w-full my-6' />
            <button className='w-full rounded-full bg-blue-500 text-white font-bold text-xl py-2'>Redeem It</button>
        </div>

        <div className='w-full sm:w-1/2 p-3 rounded-2xl border'>

            <div className='w-full h-[100px]'>

            <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium '>Add Withdrawal Method</h1>
            </div>
            

            <hr className='w-full my-6' />
            <button className='w-full rounded-full bg-blue-500 text-white font-bold text-xl py-2'>Redeem It</button>
        </div>

      </div>
    </div>
  )
}
