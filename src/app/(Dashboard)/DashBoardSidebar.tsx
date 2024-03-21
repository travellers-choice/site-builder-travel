'use client'
import React, { useState } from 'react'
import { MdEmail, MdMenu } from "react-icons/md";
import {BsPerson, BsPersonFill,BsLock ,BsLockFill} from "react-icons/bs";
import { IoIosHeart,IoIosHeartEmpty } from "react-icons/io";
import { IoBagRemove,IoBagRemoveOutline } from "react-icons/io5";
import { RiDeleteBin7Line,RiDeleteBin7Fill,RiMoneyDollarCircleLine ,RiMoneyDollarCircleFill} from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetters } from '@/utility/commonFunctions';
import { logoutUser, setcurrentProfilePage } from '@/redux/features/UserSlice';  
import { signOut } from 'next-auth/react';
export default function DashBoardSidebar() {
      const { user,currentProfilePage} = useSelector((state: any) => state.user)
      const [menuOpen,setMenuOpen]=useState(false)
const dispatch=useDispatch()
const handleLogout = () => {
      dispatch(logoutUser() as any);
      signOut()
    };

    function mobileMenu(){
      return (
            <div className='lg:hidden rounded-md bg-white shadow-lg absolute border top-0 right-0 w-[300px] p-3'>
                           <Link 
      onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'Profile'}))
            setMenuOpen(false)
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Profile'? ' ':''} pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1`} href="/profile">
            <BsPerson className='w-5 h-5' />
            <h1 className='text-lg font-base'>Profile</h1>
      </Link>


      <Link   onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'UpdatePassword'}))
            setMenuOpen(false)
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='UpdatePassword'? ' ':''} pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1`} href="/profile/update-password">
          
          
          <BsLock  className='w-5 h-5' />
            <h1 className='text-lg font-base'>Update Password</h1>
      </Link>

      <Link onClick={(e)=>{
           dispatch(setcurrentProfilePage({page:'Favourite'}))
           setMenuOpen(false)
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Favourite'? ' ':''} pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1`} href="/profile/favourite">
             <IoIosHeartEmpty className='w-5 h-5  ' />
            <h1 className='text-lg font-base'>Favourite</h1>
      </Link>


      <Link onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'Orders'}))
            setMenuOpen(false)
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Orders'? ' ':''} pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1`} href="/profile/order">
            
            <IoBagRemoveOutline className='w-5 h-5  ' />
            <h1 className='text-lg font-base'>Orders</h1>
      </Link>

      <Link onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'DeleteAccount'}))
            setMenuOpen(false)
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='DeleteAccount'? ' ':''} pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1`} href="/profile/delete-account">
            
            <RiDeleteBin7Line className='w-5 h-5  ' />
            
            
            <h1 className='text-lg font-base'>Delete Account</h1>
      </Link>
   
            <div
             onClick={(e)=>{
                  handleLogout()
                  setMenuOpen(false)
                e.stopPropagation()
                }}
             className='pl-3 text-stone-500 font-medium hover:text-blue-500  transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-100    w-full p-1'>
            <BiLogOutCircle className='w-5 h-5  ' />
            {/* <RiMoneyDollarCircleFill className='w-8 h-8 hidden' /> */}
            <h1 className='text-xl font-base'>Logout</h1>
            </div>



            </div>
      )
    }
    
  return (
    <>
      <section className='w-full flex flex-col items-center justify-center -10 relative'>
      <MdMenu
      onClick={(e)=>{
            setMenuOpen(true)
            e.stopPropagation()
      }}
      className='absolute top-0 right-0 cursor-pointer lg:hidden w-10 h-10' />
      {menuOpen && mobileMenu()}
            {
                  user.avatar?
                  <img className='w-[100px] h-[100px] rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl' src={process.env.NEXT_PUBLIC_SERVER_URL+user.avatar} alt="profile" />
                  :

            <div className='w-[100px] h-[100px] rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl '>
            {(user?.name?.charAt(0) || '').toUpperCase()}
            </div>
            }
            <h1 className='font-bold text-2xl mt-3'>{capitalizeFirstLetters(user?.name)||'name'}</h1>
            <div className='flex gap-2 items-center'>
      <MdEmail />
      <h2>{capitalizeFirstLetters(user?.email||'email')}</h2>
            </div>
      </section>
      <section className='w-full p-4  flex-col items-center gap-1 hidden lg:flex'>

      <Link 
      onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'Profile'}))
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Profile'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile">
            {
                  currentProfilePage==='Profile'?
                  <BsPersonFill className='w-5 h-5  ' />
                  :
                  <BsPerson className='w-5 h-5' />
            }
            <h1 className='text-lg font-base'>Profile</h1>
      </Link>

      <Link   onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'UpdatePassword'}))
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='UpdatePassword'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/update-password">
           
           {
                  currentProfilePage==='UpdatePassword'?
                  <BsLockFill className='w-5 h-5 ' />
                  :
                  <BsLock  className='w-5 h-5' />
            }
           
          
           
            <h1 className='text-lg font-base'>Update Password</h1>
      </Link>

      <Link onClick={(e)=>{
           dispatch(setcurrentProfilePage({page:'Favourite'}))
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Favourite'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/favourite">


          {
                  currentProfilePage==='Favourite'?
                  <IoIosHeart className='w-5 h-5 ' />
                  :
                  <IoIosHeartEmpty className='w-5 h-5  ' />
            }

           
           
            <h1 className='text-lg font-base'>Favourite</h1>
      </Link>

      <Link onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'Orders'}))
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='Orders'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/order">
            {
                  currentProfilePage==='Orders'?
                  <IoBagRemove className='w-5 h-5 ' />
                  :
                  <IoBagRemoveOutline className='w-5 h-5  ' />
            }
            
            <h1 className='text-lg font-base'>Orders</h1>
      </Link>

      <Link onClick={(e)=>{
            dispatch(setcurrentProfilePage({page:'DeleteAccount'}))
            e.stopPropagation()
      }}
       className={`${currentProfilePage==='DeleteAccount'? ' text-blue-500 font-bold border-blue-500 bg-gray-50':'border-white text-stone-500'} hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border  w-full p-3`} href="/profile/delete-account">
            
            {
                  currentProfilePage==='DeleteAccount'?
                  <RiDeleteBin7Fill className='w-5 h-5 ' />
                  :
                  <RiDeleteBin7Line className='w-5 h-5  ' />
            }
            
            
            <h1 className='text-lg font-base'>Delete Account</h1>
      </Link>
   
            <div
             onClick={(e)=>{
                  handleLogout()
                e.stopPropagation()
                }}
             className='transition-all cursor-pointer flex items-center justify-start w-[300px] gap-2 rounded-xl hover:bg-gray-50 hover:border border border-white hover:text-blue-500 hover:border-blue-500 text-stone-500 w-full p-3'>
            <BiLogOutCircle className='w-5 h-5  ' />
            {/* <RiMoneyDollarCircleFill className='w-8 h-8 hidden' /> */}
            <h1 className='text-xl font-base'>Logout</h1>
            </div>
      

            
      </section>
    </>
  )
}
