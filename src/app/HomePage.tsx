"use client";
import AttractionCard from "@/components/AttractionCard";
import SearchContainer from "@/components/SearchContainer";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { InitialAttractionDestiantions } from "@/types/generaltypes";
import { capitalizeFirstLetters } from "@/utility/commonFunctions";
export default function HomePage(): React.ReactElement {
  const [allAttraction, setAttraction] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [skipMax, setSkipMax] = useState(0);
  const [search, setSearch] = useState({
    destination: "",
    value: false,
  });

  const limit = 12;

  async function getAllActractions() {
    try {
      let response;
      if (!search.value) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=${limit}&skip=${skip}`,
          { next: { revalidate: 10 } }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=${limit}&skip=${skip}&destination=${search?.destination}`
        );
      }

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/b2b/attraction-api/attractions?skip=2&limit=10`,
      //   { next: { revalidate: 10 } }
      // );

      return await response.json();
    } catch (err: any) {
      console.log(err, "all-attractions");
    }
  }

  function getSkipCount(attractionCount: number) {
    if (attractionCount % limit > 0) {
      setSkipMax(Math.floor(attractionCount / limit) + 1);
    } else {
      setSkipMax(Math.floor(attractionCount / limit));
    }
  }

  async function setSearchAttractions(
    destination: InitialAttractionDestiantions
  ) {
    async function fetchAttractons() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=${limit}&skip=${skip}&destination=${destination?.name}`
      );
      return response.json();
    }

    setSearch({ destination: destination?.name as string, value: true });
    setSkip(0);
    const responseData = await fetchAttractons();

    if (responseData?.attractions?.data?.length > 0) {
      setAttraction(responseData?.attractions?.data);
      getSkipCount(responseData?.totalAttractions);
    } else {
      setAttraction([]);
    }
  }

  useEffect(() => {
    async function getAttractionAll() {
      const response = await getAllActractions();
      console.log(response?.attractions?.data, "response?.attractions?.data");

      setAttraction(response?.attractions?.data);
      getSkipCount(response?.totalAttractions);
    }

    getAttractionAll();
  }, [skip]);

  return (
    <main>
      <SearchContainer setSearchAttractions={setSearchAttractions} />

      <section className="padding flex flex-col md:flex-row gap-3 mt-20 ">
        <section className="w-full  md:w-2/6 lg:w-1/6 border h-fit">
          <div className="border-b pt-4 pl-1 pb-2">FILTER BY</div>
          <section className="p-3 flex flex-col gap-4 border-b">
            <h3 className="text-sm ">Review Score</h3>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <FaStar className="w-4 h-4 text-orange-500" />
              <FaStar className="w-4 h-4 text-orange-500" />
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <FaStar className="w-4 h-4 text-orange-500" />
            </div>
          </section>

          <section className="p-3 flex flex-col gap-4 border-b">
            <h3 className="text-sm ">Review Category</h3>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <h2 className="text-[13px]">Observation Deck</h2>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <h2 className="text-[13px]">Observation Deck</h2>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <h2 className="text-[13px]">Observation Deck</h2>
            </div>
          </section>
        </section>

        <section className="w-full  md:w-4/6 lg:w-5/6 ">
          <section className="w-full flex justify-between ">
            <div className="text-2xl">
              {allAttraction.length > 0 &&
                !search.value &&
                `Showing All Attractions`}
              {allAttraction.length > 0 &&
                search.value &&
                `Showing Attractions in ${capitalizeFirstLetters(
                  search.destination
                )}`}
              {allAttraction.length <= 0 && `No Attractions Found`}
            </div>
            <div>
              Sort by:
              <select
                className="p-2 bg-white border focus:outline-none"
                name=""
                id=""
              >
                <option value="">Recommended</option>
              </select>
            </div>
          </section>

          <section className="grid grid-cols-6 gap-4 ">
            {allAttraction?.map((attraction: any, index: number) => {
              return <AttractionCard key={index} attraction={attraction} />;
            })}
          </section>
          {allAttraction?.length > 0 && (
            <section className="w-full flex flex-col justify-center items-center gap-2 my-3">
              <div className="flex justify-center items-center gap-2">
                <MdKeyboardArrowLeft
                  onClick={() => {
                    if (skip > 0) {
                      setSkip(skip - 1);
                    }
                  }}
                  className="flex justify-center items-center w-4 h-4 cursor-pointer"
                />
                <div className="border border-blue-400 rounded flex justify-center items-center w-6 h-6">
                  {skip + 1}
                </div>
                <MdKeyboardArrowRight
                  onClick={() => {
                    if (skip < skipMax - 1) {
                      setSkip(skip + 1);
                    }
                  }}
                  className="cursor-pointer flex justify-center items-center w-4  h-4"
                />
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
