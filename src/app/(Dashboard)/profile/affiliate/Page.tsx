'use client'
import React, { useState } from 'react'
import Dashboard from './Dashboard'
import AttractionLink from './AttractionLink'
import AffiliateSettings from './AffiliateSettings'
import Transactions from './Transactions'

export default function AffiliatePage() {
const [option ,setOptions] = useState('Dashboard')

    const renderOptions = () => {
        switch (option) {
          case "Dashboard":
            return <Dashboard />;
          case "AttractionLink":
            return <AttractionLink />;
            case "Transactions":
                return <Transactions />;
        case "AffiliateSettings":
        return <AffiliateSettings />;
          default:
            return <Dashboard />;
        }
      };
    

  return (
    <div className="p-5 lg:pt-[100px]">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Affiliation</h1>
    <section className="flex flex-col items-center  w-full gap-2">

       <section className='flex'>
        <div
        onClick={(e)=>{
            setOptions('Dashboard')
            e.stopPropagation()
        }}
         className='flex border-b-4 border-blue-500 pb-2 px-4  text-blue-500'>
        Dashboard
        </div>

        <div
        onClick={(e)=>{
            setOptions('AttractionLink')
            e.stopPropagation()
        }}
         className='flex border-b-4  pb-2 px-4 text-stone-400'>
        Attractions link
        </div>

        <div 
        onClick={(e)=>{
            setOptions('AffiliateSettings')
            e.stopPropagation()
        }}
        className='flex border-b-4  pb-2 px-4 text-stone-400'>
        Settings
        </div>

        <div
         onClick={(e)=>{
            setOptions('Transactions')
            e.stopPropagation()
        }}
         className='flex border-b-4  pb-2 px-4 text-stone-400'>
        Transactions
        </div>

       
       </section>

      {renderOptions()}
      </section>
  </div>
  )
}
