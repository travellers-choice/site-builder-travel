'use client'
import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import {  RootState } from "@/redux/store";

import FavouriteCard from './FavouriteCard';
import { setcurrentProfilePage } from '@/redux/features/UserSlice';

export default function FavouritePage() {

  const { favourites } = useSelector((state: RootState) => state.attractions)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setcurrentProfilePage({page:'Favourite'}))
  });
  
  return (
    <div className="p-5 lg:pt-[100px] ">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Favourites</h1>
      
      {!favourites.length||favourites.length<=0?
    <div className='text-stone-500'>No favourites found!.</div>  :<></>
    }
      {
        favourites?.map((attraction,index)=>{
          return(
      
    <FavouriteCard key={index} attraction={attraction}/>
      
          )
        })
      }
    </div>
  )
}
