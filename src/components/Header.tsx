import React from 'react'

export default function Header() {
  return (
    <div className='w-full py-5 padding flex items-center justify-between '>
        <img src="https://sandbox.bookingcore.co/uploads/demo/general/logo.svg" alt="logo" />
        <ul className='flex  gap-3 text-lg font-semibold'>

        <i className="field-icon fa icofont-map"></i>
            <li>LOGIN</li>
            <li>SIGNUP</li>
        </ul>
    </div>
  )
}
