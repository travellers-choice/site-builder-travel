import React from 'react'

export default function Transactions() {
  return (
    <div className="mt-5 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4x l font-medium  text-left">
      Transactions / History
      </h1>

      <section className='flex  mt-6'>
        <div className='flex border-b-4 border-blue-500 pb-2 px-4  text-blue-500'>
        Redeem History
        </div>

        <div className='flex border-b-4  pb-2 px-4 text-stone-400'>
        Withdrawal History
        </div>
     </section>  

     <table className='w-full' >

     <thead className='w-full '>
            <tr className='w-full rounded-md drop-shadow-md mt-10 bg-stone-100 flex justify-around overfow-x-scroll'>
                <th className='text-sm font-medium'>WITHDRAWAL METHOD & NETWORK</th>
                <th className='text-sm font-medium'>AMOUNT</th>
                <th className='text-sm font-medium'>STATUS</th>
                <th className='text-sm font-medium'>TRANSACTION ID</th>
            </tr>
        </thead>

     </table>

     
    </div>
  )
}
