import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/features/UserSlice";
import { logoutUser } from "@/redux/features/UserSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
interface userRootState {
  users: {
    user: {
      name: string;
      email: string;
      country: string;
      phoneNumber: number;
    };
    jwtToken: string;
    isLoggedIn: boolean;
  };
}


type signUpProps={
    setLoginModal: (modalOpen: boolean) => void;
    setSignUpModal:(modalOpen: boolean) => void;
}
export default function SignUp({setSignUpModal,setLoginModal}:signUpProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { countries } = useSelector((state: RootState) => state.initials);
  const {user,jwtToken} = useSelector((state: RootState) => state.user);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
    console.log(user,'countries');
    console.log({data: session},'countries');
    

  })

  const signUp = async () => {
    const payload = {
      name: name,
      country: country,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
   
    try {
     
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/signup`,
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

  async function signupProcess() {
    try {
      const response = await signUp();
      console.log(response);
      localStorage.setItem("random-string", response.jwtToken);
      dispatch(setUser(response));
      {response?.jwtToken&&   setSignUpModal(false)}
      {
        response?.jwtToken && router.push("/");
      }
      setError(response?.error);
    } catch (error) {
      console.error(error);
    }
  }

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
      console.log(response,'ggooggggggggggggggggggggggggggggle');
      
      dispatch(setUser(response));
      // dispatch(fetchAffiliateUser() as any);
      {
        response?.jwtToken && router.push("/");
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


  const handleLogout = () => {
    dispatch(logoutUser() as any);
    signOut()
  };

  return (
        <div className='w-[400px] md:w-[500px]  bg-white rounded p-5'>
    
        <h2
        onClick={()=>{
          console.log('signuped');
          // setitem()
        
        }} 


        >Sign Up</h2>
      

        
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
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
       />
        <input
         type="email"
         onChange={(e) => setEmail(e.target.value)}
        placeholder='Email Address'
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
         />
    
                <select
                  onClick={(e: any) => setCountry(e?.target?.value)}
                  id="countries"
                  className='text-stone-500 w-full p-3 mt-5 border text-sm font-normal focus:outline-none focus:ring-0 bg-white'
                >
                  <option selected>countries</option>
                  {countries?.map((country, index) => {
                    return (
                      <option value={country?._id} key={index}>
                        {country?.countryName?.toLocaleUpperCase()}
                      </option>
                    );
                  })}
                </select>
        {/* <select className='w-full p-3 mt-5 border text-sm font-normal focus:outline-none focus:ring-0 bg-white' name="" id="">
            <option value="">Country</option>
        </select> */}

        <input
        placeholder='Mobile'
        onChange={(e) => setPhoneNumber(e.target.value)}
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0' 
        type="number" />
    
    <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        className='mt-5 w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0'
        type="text" />
       
       <button 
       onClick={(e)=>{
        signupProcess()
        e.stopPropagation()
        }}
       className='mt-5 w-full text-center text-white bg-blue-500 rounded p-2'>SIGN UP</button>
       <p className='text-red-500 text-[12px] font-normal text-center leading-4 my-2'>{error}</p>
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
