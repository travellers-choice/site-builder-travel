"use client";
import ComponentLoader from "@/components/ComponentLoader";
import AttractionTitle from "@/components/attractionspage/AttractionTitle";
import Clock from "@/components/attractionspage/Clock";
import Overview from "@/components/attractionspage/Overview";
import Photos from "@/components/attractionspage/Photos";
import Price from "@/components/attractionspage/Price";
import React, { useState, useEffect } from "react";

export default function DetailsPage({
  attractionname,
}: {
  attractionname: string;
}): React.ReactElement {
  const [attractionData, setAttractionData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/single/${attractionname}`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setAttractionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    function handleResize() {
      setIsSmallScreen(window.innerWidth < 750);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [attractionname]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      {attractionData ? (
        <main className="padding flex flex-col md:flex-row border-t-2 box-border container mx-auto">
          <div className="w-full md:w-9/12 padding relative">
            <AttractionTitle data={attractionData} />
            <Clock data={attractionData} />
            <Photos data={attractionData}/>
            <Overview data={attractionData} />
          </div>
          <aside className="w-full md:w-3/12 pt-4 pb-8 hidden md:block">
            <Price data={attractionData} />
          </aside>
          {/* Button to toggle modal for Price component on small screens */}
          {isSmallScreen && (
            <div className="fixed bottom-4 right-4 z-50">
              <button
                className="btn bg-[#5191fa;] py-3 px-6 text-[#fff] rounded-md"
                onClick={handleModalToggle}
              >
                Book Now
              </button>
            </div>
          )}

          {/* Modal for Price component */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <Price data={attractionData} />
                <button
                  className="btn bg-[#ff6347] py-3 px-6 text-[#fff] rounded-md mt-2 ml-7"
                  onClick={handleModalToggle}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      ) : (
        <div className="space-y-2 p-5 mt-5">
          <ComponentLoader />
          <ComponentLoader />
          <ComponentLoader />
          <ComponentLoader />
        </div>
      )}
    </>
  );
}
