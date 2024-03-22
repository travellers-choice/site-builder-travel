'use client'
import { setcurrentProfilePage } from '@/redux/features/UserSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function UpdatePassword() {
  const dispatch= useDispatch()
  const route = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user,jwtToken} = useSelector((state: any) => state.user)
  
  useEffect(() => {
    dispatch(setcurrentProfilePage({page:'UpdatePassword'}))
  });
  const profilePasswordUpdate = async () => {
    const updatePasswordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const profilePasswordUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/update/password`,
        {
          method: "PATCH",
          body: JSON.stringify(updatePasswordData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return profilePasswordUpdate.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function updateProfilePassword() {
    try {
      const response = await profilePasswordUpdate();
      console.log(response,'responseeee');
      
      setError(response?.error);
      setMessage(response?.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">Update your password</h1>
      <section className="flex flex-col items-center  w-full gap-2">
          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >Current password</label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e?.target?.value)}
              type="password"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label >New password</label>
            <input
               
               value={newPassword}
            onChange={(e) => setNewPassword(e?.target?.value)}
            type="password"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          
          <button
          onClick={updateProfilePassword}
           className="bg-blue-500 text-white font-bold   px-4 py-2 rounded-lg mt-3 min-w-[100px]">Reset</button>
           {error !== "" && <p className="text-[13px] mt-3">{error}</p>}

{message !== "" && <p className="text-[13px] mt-3">{message}!</p>}
        </section>
    </div>
  )
}
