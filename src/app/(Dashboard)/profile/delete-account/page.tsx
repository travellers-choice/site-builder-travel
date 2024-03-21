"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setcurrentProfilePage } from "@/redux/features/UserSlice";


export default function DeleteAccount() {

  const { user,jwtToken} = useSelector((state: any) => state.user)

  const route = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setcurrentProfilePage({page:'DeleteAccount'}))
  });

  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const accountDeletion = async () => {
    const deleteData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const accountDeletion = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/delete`,
        {
          method: "DELETE",
          body: JSON.stringify(deleteData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return accountDeletion.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function accountDelete() {
    try {
      const response = await accountDeletion();
      setError(response?.error);
      setMessage(response?.message);
      {
        response?.message && dispatch(logoutUser() as any);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Delete account</h1>
      <section className="flex flex-col items-center  w-full gap-2">
          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Email</label>
            <input
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
              type="email"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
              type='password'
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Confirm password</label>
            <input
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e?.target?.value)}
             type="password"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          
          <button
          onClick={accountDelete}
           className="bg-blue-500 text-white font-bold   px-4 py-2 rounded-lg mt-3 min-w-[100px]">Delete</button>
           {error !== "" && <p className="text-[13px] mt-3">{error}</p>}

{message !== "" && <p className="text-[13px] mt-3">{message}</p>}
        </section>
    </div>
  )
}
