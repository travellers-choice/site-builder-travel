'use client'

import { useDispatch } from "react-redux";
import {  setInitialData } from "@/redux/features/InitialSlice";
import React, { useEffect } from 'react'
import { AppDispatch } from "@/redux/store";

export default function FetctInitialData({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        async function getInitialData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/home/initial-data`, { next: { revalidate: 10 } })                
                dispatch(setInitialData(await response.json()))
            } catch (err: any) {
                console.log(err, "initial-data");
            }
        }
        getInitialData()

    }, [dispatch])


  return (
    <>
      {children}
    </>
  )
}
