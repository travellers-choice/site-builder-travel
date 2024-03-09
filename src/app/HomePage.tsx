import AttractionCard from "@/components/AttractionCard";
import SearchContainer from "@/components/SearchContainer";
import React from "react";
import { MdKeyboardArrowLeft ,MdKeyboardArrowRight} from "react-icons/md";
import { FaStar } from "react-icons/fa";
export default function HomePage(): React.ReactElement {
  return (
    <main>
      <SearchContainer />

      <section className="padding flex flex-col md:flex-row gap-3 mt-20 ">
        <section className="w-full  md:w-2/6 lg:w-1/6 border h-fit">
          <div className="border-b pt-4 pl-1 pb-2">FILTER BY</div>
          <section className="p-3 flex flex-col gap-4 border-b">
            <h3 className="text-sm ">Review Score</h3>
            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>

            </div>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
            </div>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
            </div>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
            </div>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <FaStar className="w-4 h-4 text-orange-500"/>
            </div>
          </section>

          <section className="p-3 flex flex-col gap-4 border-b">
          <h3 className="text-sm ">Review Category</h3>
          <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <h2 className="text-[13px]">Observation Deck</h2>
            </div>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <h2 className="text-[13px]">Observation Deck</h2>
            </div>
            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-5 h-5 border focus:outline-none text-red-500"/>
                <h2 className="text-[13px]">Observation Deck</h2>
            </div>
          </section>


        </section>

        <section className="w-full  md:w-4/6 lg:w-5/6 ">
          <section className="w-full flex justify-between ">
            <div className="text-2xl">

            16 Attractions found
            </div>
            <div>
              Sort by:
              <select className="p-2 bg-white border focus:outline-none" name="" id="">
                <option value="">Recommended</option>
              </select>
            </div>
          </section>


          <section className="grid grid-cols-6 gap-4 ">

          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
          </section>

          <section className="w-full flex flex-col justify-center items-center gap-2 my-3">
              <div className="flex justify-center items-center gap-2">
              <MdKeyboardArrowLeft  className="flex justify-center items-center w-4 h-4"/>
              <div className="border border-blue-400 rounded flex justify-center items-center w-6 h-6">
                1
              </div>
              <div className="flex justify-center items-center w-6 h-6">
                2
              </div>
              <MdKeyboardArrowRight className="flex justify-center items-center w-4  h-4"/>
              </div>

              <div className="text-stone-500">Showing 1 - 9 of 16 Tours</div>
          </section>

        </section>

      </section>
    </main>
  );
}
