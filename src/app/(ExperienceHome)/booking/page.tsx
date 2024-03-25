"use client";
import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const bookingData = Object.fromEntries(searchParams);

  const {
    adultCount,
    date,
    childCount,
    type,
    activityName,
    location,
    infantCount,
    duration,
    adultPrice,
    childPrice,
    infantPrice,
    activityIds,
  } = bookingData;

  const { countries } = useSelector((state: RootState) => state.initials);

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    selectedActivities: [
      {
        activity: activityIds,
        date: date,
        adultsCount: adultCount,
        childrenCount: childCount,
        infantCount: infantCount,
        transferType: type,
      },
    ],
    paymentProcessor: "",
  });

  const totalSum =
    Number(adultCount) * Number(adultPrice) +
    Number(childCount) * Number(childPrice) +
    Number(infantCount) * Number(infantPrice) +
    100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "paymentProcessor") {
      setFormData({
        ...formData,
        paymentProcessor: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountryId,
    });
    
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formDataToSend = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      phoneNumber: Number(formData.phoneNumber),
    };

    const { firstName, lastName, phoneNumber, ...rest } = formDataToSend;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rest,
          name: `${firstName} ${lastName}`,
          phoneNumber: Number(phoneNumber),
        }),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      return;
    }

    if (formData.paymentProcessor === "ccavenue") {
      const order = await response.text();
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(order, "text/html");
      const formElement = htmlDoc.querySelector("form");
      
      if (formElement) {
        const redirectUrl = formElement.action;
        
        // Redirect to the extracted URL
        window.location.href = redirectUrl;
      } else {
        console.error("Form element not found in HTML response");
      }
    } else if (formData.paymentProcessor === "offline") {
      const url = await response.json();
      
      // Redirect to the Tabby URL
      window.location.href = url.redirectUrl;
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};



  return (
    <div className="flex flex-col-reverse lg:flex-row padding pb-5 gap-5">
      <section className="w-full lg:w-2/3  py-5 ">
        <h1 className="text-xl lg:text-4xl border-b-4 font-medium pb-5">
          Booking Submission
        </h1>
        <form onSubmit={handleSubmit}>
          <section className="w-full  flex flex-col sm:flex-row gap-3 mt-3">
            <div className="w-full flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                className="p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </section>
          <section className="w-full flex flex-col sm:flex-row gap-3 mt-3">
            <div className="w-full flex flex-col">
              <label htmlFor="country">Country</label>
              <select
                className="p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.countryName?.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="w-full  flex flex-col sm:flex-row gap-3 mt-3">
            <div className="w-full flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="phoneNumber">Phone</label>
              <input
                className="p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <label htmlFor="specialRequirements">Special Requirements</label>
          <textarea
            id="specialRequirements"
            placeholder="Special Requirements"
            className="w-full p-3 text-sm font-normal border focus:outline-none focus:ring-0 rounded h-[100px] max-h-[110px] min-h-[80px]"
            name="specialRequirements"
            // value={formData.specialRequirements}
            // onChange={handleChange}
          ></textarea>
          <section>
            <h1 className="font-medium text-lg">Select Payment Method</h1>
            <div className="flex w-full md:w-1/2 justify-start items-center bg-gray-100 p-3 gap-2 border">
              <input
                type="radio"
                id="ccavenue"
                name="paymentProcessor"
                value="ccavenue"
                onChange={handleChange}
                checked={formData.paymentProcessor === "ccavenue"}
              />
              <label htmlFor="ccavenue">CC Avenue</label>
            </div>
            <div className="flex w-full md:w-1/2 justify-start items-center bg-gray-100 p-3 gap-2 border">
              <input
                type="radio"
                id="offline"
                name="paymentProcessor"
                value="offline"
                onChange={handleChange}
                checked={formData.paymentProcessor === "offline"}
              />
              <label htmlFor="offline">Offline Payment</label>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-9 py-2 mt-3 rounded"
            >
              Submit
            </button>
          </section>
        </form>
      </section>

      <section className="w-full lg:w-1/3 py-5 ">
        <h1 className="text-xl lg:text-4xl font-medium pb-5">Your Booking</h1>
        <div className="border-2 w-full">
          <section className="w-full p-5 border-b-2 ">
            <h2 className="font-medium sm:text-lg">{activityName}</h2>
            <div className="flex items-center gap-1">
              <MdLocationPin />
              <h2>{location}</h2>
            </div>
          </section>

          <section className="w-full p-5 border-b-2 ">
            <div className="flex justify-between">
              <h1>Start date:</h1>
              <h2 className="text-stone-500">{formattedDate}</h2>
            </div>
            <div className="flex justify-between">
              <h1>Duration:</h1>
              <h2 className="text-stone-500">{duration} hours</h2>
            </div>
            <div className="flex justify-between">
              <h1>Adult:</h1>
              <h2 className="text-stone-500">{adultCount}</h2>
            </div>
            <div className="flex justify-between">
              <h1>Child:</h1>
              <h2 className="text-stone-500">{childCount}</h2>
            </div>
            <div className="flex justify-between">
              <h1>Infant:</h1>
              <h2 className="text-stone-500">{infantCount}</h2>
            </div>
          </section>
          <section className="w-full p-5 border-b-2 ">
            <div className="flex justify-between">
              <h1>
                Adult: {adultCount} * ${adultPrice}
              </h1>
              <h2 className="text-stone-500">
                ${Number(adultCount) * Number(adultPrice)}
              </h2>
            </div>
            <div className="flex justify-between">
              <h1>
                Child: {childCount} * ${childPrice}
              </h1>
              <h2 className="text-stone-500">
                ${Number(childCount) * Number(childPrice)}
              </h2>
            </div>
            <div className="flex justify-between">
              <h1>
                Infant: {infantCount} * ${infantPrice}
              </h1>
              <h2 className="text-stone-500">
                ${Number(infantCount) * Number(infantPrice)}
              </h2>
            </div>
            <div className="flex justify-between">
              <h1>Service fee </h1>
              <h2 className="text-stone-500">$100</h2>
            </div>

            <hr className="w-full my-5" />
            <div className="flex justify-between">
              <h1 className="font-medium text-lg">Total:</h1>
              <h2 className="text-blue-500 ">${totalSum}</h2>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
