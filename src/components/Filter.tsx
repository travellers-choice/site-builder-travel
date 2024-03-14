import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
type filterProps = {
  ratingsArray: number[];
  setRatingsArray: Dispatch<SetStateAction<number[]>>;
  setSkip: Dispatch<SetStateAction<number>>;
  setFilters: any;
  filters: {
    category: string[];
    priceFrom: number;
    priceTo: number;
  };
  priceRange:{
    min:number;
    max:number
  }
  sliderValue:number[],
  setSliderValue:Dispatch<SetStateAction<number[]>>
};
interface CategoryData {
  categoryName: string;
  _id: string;
  description: string;
  icon: string;
  updatedAt: string;
  slug: string;
}

export default function Filter({
  setRatingsArray,
  ratingsArray,
  setSkip,
  setFilters,
  filters,
  priceRange,
  setSliderValue,
  sliderValue
}: filterProps): React.ReactElement {
  const [category, setCatogery] = useState<CategoryData[]>([]);
  
  const handleSliderChange = (values: number | number[]) => {
    const newValues = Array.isArray(values) ? values : [values, values];
    setSliderValue([newValues[0],newValues[1]]);
    setFilters({
      ...filters,
      priceFrom: newValues[0],
      priceTo: newValues[1],
    });
  };

  const onChangeHandlerCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setFilters && filters) {
      if (e.target.checked) {
        setFilters({
          ...filters,
          category: [...filters?.category, e.target.value],
        });
      } else {
        const filtered = filters.category.filter((item) => {
          return item !== e.target.value;
        });
        setFilters({ ...filters, category: filtered });
      }
    }

    e.stopPropagation();
  };

  useEffect(() => {
    const fetchFilterCatogery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/categories/all`
        );
        const data = await res.json();
        setCatogery(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilterCatogery();
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setRatingsArray((prevRatings) => [...prevRatings, parseInt(name)]);
    } else {
      setRatingsArray((prevRatings) =>
        prevRatings.filter((rating) => rating !== parseInt(name))
      );
    }
    setSkip(0);
  };

  return (
    <section className="w-full  md:w-2/6 lg:w-1/6 border h-fit ">
      <div className="border-b pt-4 pl-1 pb-2">FILTER BY</div>

      <section className="p-3 flex flex-col gap-4 border-b">
        <h3 className="text-sm ">Price</h3>
        <div>
          <Slider
            style={{ color: "#ff0000" }}
            onChange={handleSliderChange}
            range
            value={sliderValue}
            // defaultValue={[
            //   Number(priceRange?.min),
            //   1184
            // ]}
            min={priceRange?.min}
            max={priceRange?.max}
          />
        </div>
        <div className="flex flex-col text-sm">
          <div>Min-Price: {filters.priceFrom} AED</div>
          <div>Max-Price:{filters.priceTo} AED</div>
        </div>
      </section>

      <section className="p-3 flex flex-col gap-4 border-b">
        <h3 className="text-sm ">Review Score</h3>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="5"
            checked={ratingsArray.includes(parseInt("5"))}
            onChange={(e) => handleRatingChange(e)}
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
            name="4"
            onChange={(e) => handleRatingChange(e)}
            type="checkbox"
            checked={ratingsArray.includes(parseInt("4"))}
            className="w-5 h-5 border focus:outline-none text-red-500"
          />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
        </div>

        <div className="flex gap-2 items-center">
          <input
            name="3"
            checked={ratingsArray.includes(parseInt("3"))}
            onChange={(e) => handleRatingChange(e)}
            type="checkbox"
            className="w-5 h-5 border focus:outline-none text-red-500"
          />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
        </div>

        <div className="flex gap-2 items-center">
          <input
            checked={ratingsArray.includes(parseInt("2"))}
            name="2"
            onChange={(e) => handleRatingChange(e)}
            type="checkbox"
            className="w-5 h-5 border focus:outline-none text-red-500"
          />
          <FaStar className="w-4 h-4 text-orange-500" />
          <FaStar className="w-4 h-4 text-orange-500" />
        </div>

        <div className="flex gap-2 items-center">
          <input
            name="1"
            checked={ratingsArray.includes(parseInt("1"))}
            onChange={(e) => handleRatingChange(e)}
            type="checkbox"
            className="w-5 h-5 border focus:outline-none text-red-500"
          />
          <FaStar className="w-4 h-4 text-orange-500" />
        </div>
      </section>

      <section className="p-3 flex flex-col gap-4 border-b">
        <h3 className="text-sm ">Category</h3>
        {category?.map((category: any, index: number) => {
          return (
            <div key={index} className="flex gap-2 items-center">
              <input
                checked={filters?.category?.includes(category?.slug)}
                name={category?.slug}
                value={category?.slug}
                onChange={onChangeHandlerCategory}
                type="checkbox"
                className="w-5 h-5 border focus:outline-none text-red-500"
              />
              <h2 className="text-[13px]">{category?.categoryName}</h2>
            </div>
          );
        })}
      </section>
    </section>
  );
}
