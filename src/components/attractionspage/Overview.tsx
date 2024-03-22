import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Faqs from "./Faqs";
import Cards from "./Cards";
import Locations from "./Locations";

interface Data {
  highlights: string;
  title: string;
  mapLink: string;
}

export default function Overview({ data }: { data: Data }) {
  const included = [
    { id: "1", text: "Specialized bilingual guide" },
    { id: "2", text: "Private Transport" },
    { id: "3", text: "Entrance fees (Cable and car and Moon Valley)" },
    { id: "4", text: "Box lunch water, banana apple and chocolate" },
  ];

  const excluded = [
    { id: "1", text: " Additional Services" },
    { id: "2", text: " Insurance" },
    { id: "3", text: " Drink" },
    { id: "4", text: " Tickets" },
  ];

  const questions = [
    {
      id: "1",
      title: "When and where does the tour end?",
      answer:
        "Your tour will conclude in San Francisco on Day 8 of the trip. There are no activities planned for this day so you're free to depart at any time. We highly recommend booking post-accommodation to give yourself time to fully experience the wonders of this iconic city!",
    },
    {
      id: "2",
      title: "When and where does the tour start?",
      answer:
        "Day 1 of this tour is an arrivals day, which gives you a chance to settle into your hotel and explore Los Angeles. The only planned activity for this day is an evening welcome meeting at 7pm, where you can get to know your guides and fellow travellers. Please be aware that the meeting point is subject to change until your final documents are released.",
    },
    {
      id: "3",
      title: "Do you arrange airport transfers?",
      answer:
        "Airport transfers are not included in the price of this tour, however you can book for an arrival transfer in advance. In this case a tour operator representative will be at the airport to greet you. To arrange this please contact our customer service team once you have a confirmed booking.",
    },
    {
      id: "4",
      title: "What is the age range",
      answer:
        "This tour has an age range of 12-70 years old, this means children under the age of 12 will not be eligible to participate in this tour. However, if you are over 70 years please contact us as you may be eligible to join the tour if you fill out G Adventures self-assessment form.",
    },
  ];

  const cardData = [
    {
      id: "1",
      imageUrl: "https://sandbox.bookingcore.co/uploads/demo/tour/tour-4.jpg",
      title: "Paris Vacation Travel",
      oldPrice: "$850",
      price: "$193",
      reviews: "4",
      time: "5H",
    },
    {
      id: "2",
      imageUrl: "https://sandbox.bookingcore.co/uploads/demo/tour/tour-5.jpg",
      title: "Southwest States (Ex Los Angeles)",
      oldPrice: "$1.900",
      price: "$1.777",
      reviews: "3",
      time: "3H",
    },
    {
      id: "2",
      imageUrl: "https://sandbox.bookingcore.co/uploads/demo/tour/tour-6.jpg",
      title: "Eastern Discovery",
      oldPrice: "$2.100",
      price: "$1.503",
      reviews: "4",
      time: "1H",
    },
  ];
  const removeTags = (text: string) => {
    return text.replace(/<[^>]*>/g, "");
  };

  const highlight = removeTags(data.highlights);
  

  return (
    <section className="mt-6 mb-3">
      <h2 className="font-Poppins text-2xl font-medium	text-[#1a2b48]">
        Overview
      </h2>
      <article>
        <p className="font-Poppins text-sm font-normal	text-[#5e6d77] mt-3">
          {highlight}
        </p>
        <h4 className="font-Poppins text-sm font-medium	text-[#5e6d77] mt-3 mb-3">
          HIGHLIGHTS
        </h4>

        <ul className="list-inside list-disc font-Poppins text-sm font-normal	text-[#5e6d77] mt-5 ps-8">
          <li className="mt-4">Visit the Museum of Modern Art in Manhattan</li>
          <li className="mt-4">
            See amazing works of contemporary art, including Vincent van Gogh's
            The Starry Night
          </li>
          <li className="mt-4">
            Check out Campbell's Soup Cans by Warhol and The Dance (I) by
            Matisse
          </li>
          <li className="mt-4">
            Behold masterpieces by Gauguin, Dali, Picasso, and Pollock
          </li>
          <li className="mt-4">
            Enjoy free audio guides available in English, French, German,
            Italian, Spanish, Portuguese
          </li>
        </ul>
        <h3 className="font-Poppins text-2xl font-medium	text-[#1a2b48] mt-6">
          Included/Excluded
        </h3>
        <section className="flex border-b-2 flex-wrap">
          <div className="w-full md:w-1/2 px-4 mt-2">
            <div className="flex flex-col">
              {included.map((include, id) => (
                <div className="flex items-center" key={id}>
                  <FaCheck className="text-[#48ba29] text-lg" />
                  <span className="p-4">{include.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-2">
            <div className="flex flex-col">
              {excluded.map((exclude, id) => (
                <div className="flex items-center" key={id}>
                  <IoClose className="text-[#e34646] text-lg" />
                  <span className="p-4">{exclude.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* FAQS  */}
        <section className="mt-5">
          <h3 className="font-Poppins text-2xl font-medium	text-[#1a2b48] ">
            FAQs
          </h3>
          <Faqs questions={questions} />
        </section>
        <section className="mt-5">
          <h3 className="font-Poppins text-2xl font-medium	text-[#1a2b48] ">
            Tour Location
          </h3>
          <Locations location={data} />
        </section>
        <section > 
          <h2 className="font-Poppins text-2xl font-medium	text-[#1a2b50] text-center mt-5 mb-5">
            You might also like
          </h2>
          <Cards cardData={cardData} />
        </section>
      </article>
    </section>
  );
}
