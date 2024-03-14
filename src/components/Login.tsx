import React from 'react'
type loginProps={
    setLoginModal: (modalOpen: boolean) => void;
    setSignUpModal:(modalOpen: boolean) => void;
}
export default function Login({setLoginModal,setSignUpModal}:loginProps) {
  return (
    <div className='w-[400px] md:w-[500px]  bg-white rounded p-5'>

    <h2> Log in</h2>
    <input
    placeholder='Email Address'
    className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
    type="text" />

<input
    placeholder='Password'
    className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
    type="text" />
   
   <button 
   onClick={(e)=>{
    setLoginModal(false)
    e.stopPropagation()
    }}
   className='mt-5 w-full text-center text-white bg-blue-500 rounded p-2'>LOGIN</button>
   <div className='flex justify-center gap-3 font-normal mt-5'>Do not have an account? 
   <span
   onClick={(e)=>{
    setLoginModal(false)
    setSignUpModal(true)
    e.stopPropagation()
    }}
    className='text-blue-400 cursor-pointer'>Sign Up</span></div>
  </div>
  )
}
