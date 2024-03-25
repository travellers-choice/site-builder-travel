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
          throw new Error(`API request failed with status ${response?.status}`);
        }

        const data = await response?.json();
        setAttractionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1030);
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
        <main className="container mx-auto px-2 md:px-0">
          <section className="padding flex border-t-2 box-border">
            <div className="md:w-full lg:w-9/12 sm:w-full relative">
              <AttractionTitle data={attractionData} />
              <Clock data={attractionData} />
              <Photos data={attractionData} />
              <Overview data={attractionData} />
            </div>
            {/* Conditionally render Price component based on screen size */}
            {isSmallScreen ? (
              // Render modal button instead of Price component for small screens
              <div className="pt-4 pb-8 fixed bottom-6 right-4 z-30">
                <button
                  className="btn bg-[#5191fa;] py-3 px-5 text-[#fff] rounded-md"
                  onClick={handleModalToggle}
                >
                  Book Now
                </button>
              </div>
            ) : (
              // Render Price component for screens larger than 1000px
              <aside className="w-full md:w-3/12 lg:w-3/12 pt-4 pb-8 pl-3">
                <Price data={attractionData} />
              </aside>
            )}

            {/* Modal for Price component */}
            {isModalOpen && (
              <div className="fixed z-50 inset-0 bg-black bg-opacity-25 flex justify-center items-center padding overflow-y-auto">
                <div className="bg-white rounded-lg w-[400px] flex flex-col">
                  <button
                    className="text-black-500 text-3xl place-self-end px-4 mt-2"
                    onClick={handleModalToggle}
                  >
                    X
                  </button>
                  <Price data={attractionData} />
                </div>
              </div>
            )}
          </section>
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
