import React from 'react'

export default function DeleteAccount() {
  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Delete account</h1>
      <section className="flex flex-col items-center  w-full gap-2">
          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Email</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Password</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Confirm password</label>
            <input
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          
          <button className="bg-blue-500 text-white font-bold   px-4 py-2 rounded-lg mt-3 min-w-[100px]">Delete</button>
        </section>
    </div>
  )
}
