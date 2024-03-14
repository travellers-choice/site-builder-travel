'use client'
import React, { useState } from 'react'
import Modal from './(maodal)/Modal'
import Login from './Login';
import SignUp from './SignUp';

export default function Header() {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpodal, setSignUpModal] = useState(false);
  
      function loginContent(){
return(
  <Login setSignUpModal={setSignUpModal} setLoginModal={setLoginModal}/>
)
      }

function signUpContent(){
  return(
    <SignUp setSignUpModal={setSignUpModal} setLoginModal={setLoginModal}/>
  )
}
  return (

    <div className='w-full py-5 padding flex items-center justify-between'>
        <img src="https://sandbox.bookingcore.co/uploads/demo/general/logo.svg" alt="logo" />
        <ul className='flex  gap-3 text-lg font-semibold'>

        {/* <i className="field-icon fa icofont-map"></i> */}

        <Modal
        modalOpen={loginModal}
        setModalOpen={setLoginModal}
        children ={loginContent()}
         />
          <Modal
        modalOpen={signUpodal}
        setModalOpen={setSignUpModal}
        children ={signUpContent()}
         />
            <li className='cursor-pointer'
             onClick={(e)=>{setLoginModal(true)
            e.stopPropagation()
            }}
            >LOGIN</li>
            <li className='cursor-pointer'
             onClick={(e)=>{setSignUpModal(true)
              e.stopPropagation()
              }}
            >SIGNUP</li>
        </ul>
    </div>
  )
}
