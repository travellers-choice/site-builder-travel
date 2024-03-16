import React from 'react'
import DashBoardSidebar from '../DashBoardSidebar';

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
 
  return (
    <div className="w-full padding py-10 border-t flex flex-col lg:flex-row gap-2">
    <div className=' lg:w-2/6  h-fit rounded-xl border p-5'>
  <DashBoardSidebar/>
    </div>
  <div className="lg:w-4/6 rounded-xl border">
    {children}
  </div>
   
  </div>
  )
}
