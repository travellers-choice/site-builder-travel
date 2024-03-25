"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setcurrentProfilePage ,setUser} from "@/redux/features/UserSlice";
import { LuImage } from "react-icons/lu";
import { getUserData } from "@/utility/commonFunctions";
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
export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, jwtToken } = useSelector((state: any) => state.user);
  const { countries } = useSelector((state: RootState) => state.initials);
  const [success,setSuccess]=useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    country: user?.country || "",
    phoneNumber: user?.phoneNumber?.toString() || "",
    avatar:user?.avatar||null
  });
  const [paxphoneCode, setPaxPhoneCode] = useState<string>("");
  const [error, setError] = useState("");
  useEffect(() => {
    dispatch(setcurrentProfilePage({page:'Profile'}))
  });
  useEffect(() => {
    setProfile({
      ...profile,
      name: user?.name || "",
      email: user?.email || "",
      country: user?.country || "",
      phoneNumber: user?.phoneNumber?.toString() || "",
      avatar:null
    });
  }, []);

  useEffect(() => {
    const filteredCountries = countries?.filter(
      (country) => country?._id === profile?.country
    );

    // Extract phonecode from the filtered countries
    const filteredPaxPhoneCode = filteredCountries[0]?.phonecode;

    // Set the flattened phonecode array to paxphoneCode
    setPaxPhoneCode(filteredPaxPhoneCode || "");
  }, [countries, profile]);

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setProfile({
          ...profile,
          avatar:file
        })
      } else {
        alert('Please select an image file');
      }
    } else {
      alert('Please select a file');
    }
  };
  const onChangeData = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  function updateCountrY(e: any){
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  country: e?.target?.value,
                }))
  }

  function updatePnoneNumber(e:any){
  
    setProfile((prevProfile) => ({
      ...prevProfile,
      phoneNumber: e?.target?.value,
    }))
  }
function handlesucess(){
  setSuccess(true)
const timeout= setTimeout(() => {
  setSuccess(false)
  clearTimeout(timeout)
}, 5000);
}
  // profile update handler.
  const profileDetailsUpdate = async () => {
    try {
      const newformData = new FormData();

      newformData.append('name', profile?.name);
      newformData.append('email', profile?.email);
      newformData.append('country', profile?.country);
      newformData.append('phoneNumber', profile?.phoneNumber);
  
      if (profile.avatar) {
        newformData.append('avatar', profile?.avatar);
      }

      const profileDetailsUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/update`,
        {
          method: "PATCH",
          body: newformData, 
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      
      
      return profileDetailsUpdate.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function updateProfileDetails(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await profileDetailsUpdate();
      console.log(response, "profileresponse");

      if(response.error){
        setError(response?.error);
      }else{
        handlesucess()
        getUserData(jwtToken,dispatch)
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!user?.name) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="p-5 lg:pt-[100px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center">
        Account Information
      </h1>

      <section className=" flex flex-col sm:flex-row">
        <section className=" flex  justify-center items-start p-3">
          <label className="w-[130px] h-[130px] bg-green-800 rounded-full text-white flex flex-col justify-center items-center whitespace-nowrap">
          <input
               onChange={selectFile}
                className="hidden"
                name="image"
                type="File"
                accept="image/*"
              />
            <LuImage />
            Select Image
          </label>
        </section>
        <form
          onSubmit={updateProfileDetails}
          className="flex flex-col items-center  w-full gap-2"
        >
          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={onChangeData}
              value={profile?.name}
              required
              type="text"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label>Email</label>
            <input
              name="email"
              onChange={onChangeData}
              type="email"
              value={profile?.email}
              required
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label>Country</label>
            <select
              name="country"
              id="countries"
              value={profile?.country}
              onChange={
                updateCountrY
              }
              required
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2 bg-white"
            >
              <option selected>Choose a country</option>
              {countries?.map((country: any, index: number) => (
                <option key={index} value={country?._id}>
                  {country?.countryName?.slice(0, 1)?.toUpperCase()}
                  {country?.countryName?.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-[80%] items-start ">
            <label>Phone number</label>
            <input
              onChange={
                updatePnoneNumber
              }
              value={profile?.phoneNumber }
              type="number"
              className="text-stone-500 w-full focus:ring-0 focus:outline-none border-2 rounded-md p-2"
            />
          </div>
          <button className="bg-blue-500 text-white font-bold   px-4 py-2 rounded-lg mt-3">
            Update Info
          </button>
          <p className="text-sm text-red-500">{error}</p>
      {success&&    <p className="text-sm text-green-500">Profile Updated Succesfully</p>}
        </form>
      </section>
    </div>
  );
}
