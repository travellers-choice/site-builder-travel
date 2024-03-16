'use client'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import {BsPerson, BsPersonFill,BsLock ,BsLockFill} from "react-icons/bs";
import { IoIosHeart,IoIosHeartEmpty } from "react-icons/io";
import { IoBagRemove,IoBagRemoveOutline } from "react-icons/io5";
import { RiDeleteBin7Line,RiDeleteBin7Fill,RiMoneyDollarCircleLine ,RiMoneyDollarCircleFill} from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import Link from 'next/link';
export default function DashBoardSidebar() {
      const [option ,setOptions] = useState('Profile')

  

  return (
    <>
      <section className='w-full flex flex-col items-center justify-center -10 '>
            <div className='w-[100px] h-[100px] rounded-full bg-blue-500 flex justify-center items-center  '>
                v
            </div>
            <h1 className='font-bold text-2xl mt-3'>Anshid anu</h1>
            <div className='flex gap-2 items-center'>
      <MdEmail />
      <h2>anshid@gmail.com</h2>
            </div>
      </section>
      <section className='w-full p-4  flex-col items-center gap-1 hidden lg:flex'>

      <Link 
      onClick={(e)=>{
            setOptions('Profile')
            e.stopPropagation()
      }}
       className={`${option==='Profile'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile">
            {
                  option==='Profile'?
                  <BsPersonFill className='w-5 h-5  ' />
                  :
                  <BsPerson className='w-5 h-5' />
            }
            <h1 className='text-lg font-base'>Profile</h1>
      </Link>

      <Link   onClick={(e)=>{
            setOptions('UpdatePassword')
            e.stopPropagation()
      }}
       className={`${option==='UpdatePassword'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/update-password">
           
           {
                  option==='UpdatePassword'?
                  <BsLockFill className='w-5 h-5 ' />
                  :
                  <BsLock  className='w-5 h-5' />
            }
           
          
           
            <h1 className='text-lg font-base'>Update Password</h1>
      </Link>

      <Link onClick={(e)=>{
            setOptions('Favourite')
            e.stopPropagation()
      }}
       className={`${option==='Favourite'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/favourite">


          {
                  option==='Favourite'?
                  <IoIosHeart className='w-5 h-5 ' />
                  :
                  <IoIosHeartEmpty className='w-5 h-5  ' />
            }

           
           
            <h1 className='text-lg font-base'>Favourite</h1>
      </Link>

      <Link onClick={(e)=>{
            setOptions('Orders')
            e.stopPropagation()
      }}
       className={`${option==='Orders'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/order">
            {
                  option==='Orders'?
                  <IoBagRemove className='w-5 h-5 ' />
                  :
                  <IoBagRemoveOutline className='w-5 h-5  ' />
            }
            
            <h1 className='text-lg font-base'>Orders</h1>
      </Link>

      <Link onClick={(e)=>{
            setOptions('DeleteAccount')
            e.stopPropagation()
      }}
       className={`${option==='DeleteAccount'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/delete-account">
            
            {
                  option==='DeleteAccount'?
                  <RiDeleteBin7Fill className='w-5 h-5 ' />
                  :
                  <RiDeleteBin7Line className='w-5 h-5  ' />
            }
            
            
            <h1 className='text-lg font-base'>Delete Account</h1>
      </Link>

            <div className='transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border border-white hover:text-blue-500 hover:border-blue-500 text-stone-500 w-full p-3'>
            <BiLogOutCircle className='w-5 h-5  ' />
            {/* <RiMoneyDollarCircleFill className='w-8 h-8 hidden' /> */}
            <h1 className='text-xl font-base'>Logout</h1>
            </div>
      

            
      </section>
    </>
  )
}
