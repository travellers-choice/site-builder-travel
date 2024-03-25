import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

interface Card {
  imageUrl: string;
  title: string;
  reviews: string;
  time: string;
  oldPrice: string;
  price: string;
}

interface Props {
  cardData: Card[];
}

const Cards: React.FC<Props> = ({ cardData }) => {
  return (
    <div className="flex flex-wrap mt-5">
      {cardData?.map((card: Card, id: number) => (
        <div
          key={id}
          className="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-4/12 mb-4 p-1"
        >
          <div className="h-80 w-full bg-white shadow-lg overflow-hidden">
            <img
              className="w-full h-40 object-cover object-center transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-1000"
              src={card?.imageUrl}
              alt="Card"
            />
            <div className="p-3 flex flex-col">
              <div className="p-2 h-20">
                <h2 className="font-Poppins text-md font-medium text-[#1a2b50]">
                  {card?.title}
                </h2>
              </div>
              <div className="flex items-start">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <FaStar className="w-4 h-4 text-yellow-400" />
                <FaStar className="w-4 h-4 text-yellow-400" />
                <FaStar className="w-4 h-4 text-yellow-400" />
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span className="font-Poppins text-xs font-normal text-[#5e6d77] ml-5">
                  {`${card?.reviews} Reviews`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center mt-4">
                  <FaRegClock className="text-[#5e6d77;] text-sm" />
                  <p className="font-Poppins text-sm font-normal text-[#5e6d77] p-1">
                    {card?.time}
                  </p>
                </span>
                <div className="flex flex-col items-center">
                  <span className="font-Poppins text-sm font-small text-[#c03] ml-8 line-through">
                    {card?.oldPrice}
                  </span>
                  <h6 className="font-Poppins text-sm font-normal text-[#5e6d77] -mt-2">
                    from
                    <span className="font-Poppins text-lg font-medium text-[#1a2b48] ml-2">
                      {card?.price}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
