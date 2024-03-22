import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/UserSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';

type loginProps={
    setLoginModal: (modalOpen: boolean) => void;
    setSignUpModal:(modalOpen: boolean) => void;
}
export default function Login({setLoginModal,setSignUpModal}:loginProps) {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const router = useRouter();

  const logIn = async () => {
    const payload = {
      email: userName,
      password: password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignIn = async () => {
  
    const payload = {
      email: session?.user?.email,
      name: session?.user?.name,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/emailLogin`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function googleProcess() {
    try {
      const response = await googleSignIn();
      console.log(response,'ggoogle loginpage');
      
      dispatch(setUser(response));
      // dispatch(fetchAffiliateUser() as any);
      {
        // response?.jwtToken && router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    
    
    {
      session && googleProcess();
    }
  }, [session]);


  async function loginProcess() {
    try {
      const response = await logIn();
      dispatch(setUser(response));
      // dispatch(fetchAffiliateUser() as any);
      {response.jwtToken && setLoginModal(false)}
      {response?.jwtToken && (
      router.push("/")
      )}
      setError(response?.error)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='w-[400px] md:w-[500px]  bg-white rounded p-5'>

    <h2> 
      Log in</h2>

      <div
              onClick={() =>
                signIn("google", {
                  callbackUrl:
                    "http://localhost:3000/api/auth/callback/google",
                })
              }
              className="flex w-full cursor-pointer items-center font-normal justify-center text-sm md:text-lg border rounded-md p-1 mt-2 mb-5 shadow-md gap-2"
            >
             <FcGoogle />
             <h1>Continue with Google</h1>
              </div>
              <div className='text-center text-sm md:text-normal font-normal'>OR</div>


    <input
    onChange={(e) => setUserName(e.target.value)}
    placeholder='Email Address'
    className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
    type="text" />

<input
    onChange={(e) => setPassword(e.target.value)}
    placeholder='Password'
    className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
    type="text" />
   
   <button 
   onClick={(e)=>{
    loginProcess()
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
      <p className='text-red-500 text-[12px] font-normal text-center leading-4 my-1'>{error}</p>
  </div>
  )
}
