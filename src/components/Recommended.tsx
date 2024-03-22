import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
type RecommendedPropes = {
  sortOpen: boolean;
  setRatingsArray:Dispatch<SetStateAction<number[]>>;
  setSortOpen: Dispatch<SetStateAction<boolean>>;
  setSliderValue:Dispatch<SetStateAction<number[]>>
  setFilters: Dispatch<
    SetStateAction<{
      category: string[];
      priceFrom: number;
      priceTo: number;
    }>
  >;
  filters: {
    category: string[];
    priceFrom: number;
    priceTo: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  setSearch: Dispatch<
    SetStateAction<{
      destination: string;
      value: boolean;
    }>
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const Recommended: React.FC<RecommendedPropes> = ({
  setSearch,
  setFilters,
  priceRange,
  filters,
  sortOpen,
  setSortOpen,
  setLoading,
  setSliderValue,
  setRatingsArray
}) => {

  const [sortValue, setSortValue] = useState("All");
  const valuesArray = [
    "All",
    "Low Price Range",
    "Medium Price Range",
    "Top Price Range",
  ];

  async function setSort(sortType: string) {
    try {
      setLoading(true);
      if (sortType === "All") {
        setSearch({
          destination: "",
          value: false,
        });
        setRatingsArray([])
        setSliderValue([Math.round(priceRange.min),Math.round(priceRange.max)])
        setFilters({
          category: [],
          priceFrom: Math.round(priceRange.min),
          priceTo: Math.round(priceRange.max),
        });
      } else if (sortType === "Low Price Range") {
        
        setFilters({
          ...filters,
          priceFrom: Math.round(priceRange.min),
          priceTo: Math.round(priceRange.max / 3),
        });
        setSliderValue([Math.round(priceRange.min), Math.round(priceRange.max / 3)])
      } else if (sortType === "Medium Price Range") {
        setFilters({
          ...filters,
          priceFrom: Math.round(priceRange.max / 3),
          priceTo: Math.round((priceRange.max / 3) * 2)
        });
        setSliderValue([ Math.round(priceRange.max / 3),Math.round((priceRange.max / 3) * 2)])
      } else {
        setFilters({
          ...filters,
          priceFrom: Math.round((priceRange.max / 3) * 2),
          priceTo: Math.round(priceRange.max),
        });
        setSliderValue([ Math.round((priceRange.max / 3) * 2),Math.round(priceRange.max),])
      }

      // return await response.json();
    } catch (err: any) {
      console.log(err, "all-attractions");
    }
  }

  function suggesions() {
    return (
      <div className="absolute right-0 bottom-[-10px] bg-white rounded-md w-full translate-y-[100%] overflow-hidden p-1">
        {valuesArray?.map((sortType, index) => {
          return (
            <div
              className="cursor-pointer text-sm hover:bg-gray-100"
              onClick={(e) => {
                setSortOpen(false);
                setSortValue(sortType);
                setSort(sortType);
                e.stopPropagation();
              }}
              key={index}
            >
              {sortType}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-full rounded my-1 drop-shadow-md bg-white border z-10 p-2 relative text-sm whitespace-nowrap">
      {sortValue}
      {sortOpen && suggesions()}
    </div>
  );
}
export default React.memo(Recommended)