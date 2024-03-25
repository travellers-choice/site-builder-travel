"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { InitialAttractionDestiantions } from "@/types/generaltypes";
import { capitalizeFirstLetters } from "@/utility/commonFunctions";
import ComponentLoader from "@/components/ComponentLoader";
import AttractionCard from "../../components/AttractionCard";
import Filter from "../../components/Filter";
import SearchContainer from "../../components/SearchContainer";
import Recommended from "../../components/Recommended";

export default function HomePage(): React.ReactElement {
  const [allAttraction, setAttraction] = useState<any[]>([]);
  const [ratingsArray, setRatingsArray] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [skipMax, setSkipMax] = useState(0);
  const [sliderValue, setSliderValue] = useState([0, 1000]);
  const [search, setSearch] = useState({
    destination: "",
    value: false,
  });
  const [filters, setFilters] = useState<{
    category: string[];
    priceFrom: number;
    priceTo: number;
  }>({
    category: [],
    priceFrom: 0,
    priceTo: 0,
  });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });
  const limit = 12;

  async function getAllActractions() {
    try {
      let response;
      if (!search.value) {
        response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/v1/attractions/all?limit=${limit}
          &skip=${skip}&ratings=[${ratingsArray.join(
            ","
          )}]&categories=${JSON.stringify(
            filters.category
          )}&priceFrom=${JSON.stringify(
            filters.priceFrom
          )}&priceTo=${JSON.stringify(filters.priceTo)}`,
          { next: { revalidate: 10 } }
        );
      } else {
        response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/v1/attractions/all?limit=${limit}&skip=${skip}&destination=${
            search?.destination
          }&ratings=[${ratingsArray.join(",")}]&categories=${JSON.stringify(
            filters.category
          )}`
        );
      }
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
    destination: InitialAttractionDestiantions | string
  ) {
    async function fetchAttractons() {
      if (typeof destination === "string") {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/v1/attractions/all?limit=${limit}&skip=${skip}&destination=${destination}&ratings=[${ratingsArray.join(
            ","
          )}]&categories=${JSON.stringify(filters.category)}`
        );
        return response.json();
      } else {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/v1/attractions/all?limit=${limit}&skip=${skip}&destination=${
            destination?.name
          }&ratings=[${ratingsArray.join(",")}]&categories=${JSON.stringify(
            filters.category
          )}`
        );
        return response.json();
      }
    }

    setSkip(0);
    setLoading(true);
    const responseData = await fetchAttractons();
    setLoading(false);
    if (responseData?.attractions?.data?.length > 0) {
      setSearch({
        destination: responseData?.attractions?.data[0]?.destination
          ?.name as string,
        value: true,
      });
      setAttraction(responseData?.attractions?.data);
      getSkipCount(responseData?.totalAttractions);
    } else {
      setAttraction([]);
    }
  }

  useEffect(() => {
    async function getAttractionAll() {
      const response = await getAllActractions();

      setLoading(false);
      setAttraction(response?.attractions?.data);
      getSkipCount(response?.totalAttractions);
    }
    getAttractionAll();
  }, [skip, ratingsArray, filters]);

  useEffect(() => {
    async function getActionAll() {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/v1/attractions/all?limit=${10000}&skip=${0}`,
          { next: { revalidate: 10 } }
        );
        return response.json();
      } catch (error) {
        console.log(error);
      }
    }

    async function getMaxMinPrice() {
      try {
        const response = await getActionAll();
        const prices = response?.attractions?.data?.map(
          (elem: any) => elem.activity.lowPrice
        );

        // Filter out undefined or null values from the prices array
        const filteredPrices = prices.filter(
          (price: any) => typeof price === "number"
        );

        if (filteredPrices.length > 0) {
          const lowestPrice = Math.min(...filteredPrices);
          const highestPrice = Math.max(...filteredPrices);
          setPriceRange({
            min: lowestPrice,
            max: highestPrice,
          });
          setSliderValue([lowestPrice, highestPrice]);
          setFilters({
            ...filters,
            priceFrom: lowestPrice,
            priceTo: highestPrice,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMaxMinPrice();
  }, []);

  return (
    <main>
      <SearchContainer setSearchAttractions={setSearchAttractions} />

      

      <section className="padding flex flex-col md:flex-row gap-3 mt-10 sm:mt-16 md:mt-[100px] ">
        <Filter
          setSliderValue={setSliderValue}
          sliderValue={sliderValue}
          priceRange={priceRange}
          ratingsArray={ratingsArray}
          setRatingsArray={setRatingsArray}
          setSkip={setSkip}
          setFilters={setFilters}
          filters={filters}
        />

        <section className="w-full  md:w-4/6 lg:w-5/6 ">
          <section className="w-full  flex flex-col sm:flex-row justify-between ">
            <div className="text-2xl">
              {allAttraction?.length > 0 &&
                !search?.value &&
                `Showing All Attractions`}
              {allAttraction?.length > 0 &&
                search?.value &&
                `Showing Attractions in ${capitalizeFirstLetters(
                  search?.destination
                )}`}
              {(allAttraction?.length <= 0 || !allAttraction?.length) &&
                `No Attractions Found`}
            </div>
            <div className="flex w-[250px] items-center gap-1">
              <h1 className="felx-shrink-0 whitespace-nowrap cursor-pointer">
                Sort by:
              </h1>
              <div
                className="w-full cursor-pointer"
                onClick={(e) => {
                  setSortOpen(!sortOpen);
                  e.stopPropagation();
                }}
              >
                <Recommended
                  setRatingsArray={setRatingsArray}
                  setSliderValue={setSliderValue}
                  setSearch={setSearch}
                  filters={filters}
                  priceRange={priceRange}
                  setFilters={setFilters}
                  setLoading={setLoading}
                  sortOpen={sortOpen}
                  setSortOpen={setSortOpen}
                />
              </div>
            </div>
          </section>

          {loading ? (
            <div className="space-y-2">
              <ComponentLoader />
              <ComponentLoader />
              <ComponentLoader />
              <ComponentLoader />
            </div>
          ) : (
            <section className="grid grid-cols-6 gap-4 ">
              {allAttraction?.map((attraction: any, index: number) => {
                return <AttractionCard key={index} attraction={attraction} />;
              })}
            </section>
          )}
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
