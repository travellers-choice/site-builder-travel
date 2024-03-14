"use client";
import { useEffect, useState ,ChangeEvent} from "react";
import locationIcon from "../images/locationIcon.png";
import { InitialAttractionDestiantions } from "@/types/generaltypes";
import { capitalizeFirstLetters } from "@/utility/commonFunctions";
const imagePath = locationIcon.src;

type SearchContainerProps = {
  setSearchAttractions: (destination: InitialAttractionDestiantions) => void;
};
export default function SearchContainer({
  setSearchAttractions,
}: SearchContainerProps) {
  const [searchValue, setSearchValue] = useState("");
  const [destinations, setDestinations] = useState<
    InitialAttractionDestiantions[]
  >([]);
  const [searching, setSearching] = useState(false);

  async function getDestinations() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/home/initial-data`,
        { next: { revalidate: 10 } }
      );
      return await response.json();
    } catch (err: any) {
      console.log(err, "initial-data");
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    setSearchValue(target.value);
  }

  useEffect(() => {
    async function fetchDestinations() {
      const response = await getDestinations();

      setDestinations(response?.destinations);
    }

    fetchDestinations();
  }, []);

  function suggessiondata() {
    if (searchValue) {
      const data = destinations?.filter((destination) => {
        return destination?.name?.includes(searchValue.toLocaleLowerCase());
      });
      return data;
    } else {
      return [];
    }
  }

  function suggessions() {
    const suggessions = suggessiondata();

    if (suggessions?.length > 0) {
      return (
        <div className="absolute left-0 bottom-[-50px] translate-y-[100%] rounded bg-white drop-shadow-md w-1/2 z-10 p-2 h-fit">
          {suggessions?.map(
            (destination: InitialAttractionDestiantions, index: number) => {
              return (
                <div
                  onClick={() => {
                    setSearchAttractions(destination);
                    setSearchValue('')
                    setSearching(false);
                  }}
                  key={index}
                >
                  {capitalizeFirstLetters(destination?.name as string)}
                </div>
              );
            }
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }

  function attractionSearch() {
    return (
      <div className=" w-full h-full relative ">
        <div className="w-full bg-white rounded drop-shadow-md flex items-center gap-2  pl-5 h-[50px] md:h-[70px] justify-between absolute left-0 bottom-0 translate-y-[50%]">
          <div className="flex items-center gap-3 w-full">
            <img src={imagePath} alt="" />
            <div className="flex flex-col  w-full">
              <input
                onFocus={() => {
                  setSearching(true);
                }}
                value={searchValue}
                onChange={(e) => {
                  
                  handleSearch(e);
                }}
                className="focus:outline-none  min-w-[100px] w-full"
                placeholder="Location"
                type="text"
              />
              <h6 className="text-blue-400 text-sm w-full">
                Where do you want to go?
              </h6>
            </div>
          </div>

          <button
            onClick={() => {
              if(searchValue.trim()!==''){
                setSearchAttractions(searchValue as InitialAttractionDestiantions);
                  setSearchValue('')
                }
              setSearching(false);
            }}
           className="h-full w-[100px] md:w-auto px-10  rounded bg-blue-500 flex items-center text-white justify-center">
            SEARCH
          </button>
        </div>
        {searching && suggessions()}
      </div>
    );
  }
  return (
    <div className="padding w-full h-[150px] md:h-[200px] bg-blue-200  items-center flex  ">
      {attractionSearch()}
    </div>
  );
}
