import React from 'react'
type signUpProps={
    setLoginModal: (modalOpen: boolean) => void;
    setSignUpModal:(modalOpen: boolean) => void;
}
export default function SignUp({setSignUpModal,setLoginModal}:signUpProps) {
  return (
        <div className='w-[400px] md:w-[500px]  bg-white rounded p-5'>
    
        <h2>Sign Up</h2>
        <input
        placeholder='Name'
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
        type="text" />
        <input
        placeholder='Email Address'
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
        type="text" />
    

        <select className='w-full p-3 mt-5 border text-sm font-normal focus:outline-none focus:ring-0 bg-white' name="" id="">
            <option value="">Country</option>
        </select>

        <input
        placeholder='Mobile'
         className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0' 
         type="number" />
    
    <input
        placeholder='Password'
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
        type="text" />
       
       <button 
       onClick={(e)=>{
        setSignUpModal(false)
        e.stopPropagation()
        }}
       className='mt-5 w-full text-center text-white bg-blue-500 rounded p-2'>SIGN UP</button>
       <div className='flex justify-center gap-3 font-normal mt-5'>Already have an account? <span
       onClick={(e)=>{
        setLoginModal(true)
        setSignUpModal(false)
        e.stopPropagation()
        }}
        className='text-blue-400 cursor-pointer'>Login</span></div>
      </div>
  )
}
