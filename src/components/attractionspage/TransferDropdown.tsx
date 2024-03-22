import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface TransferDropdownProps {
  isTransferAvailable: boolean[]; // Define the prop here
  onSelect: (type: string) => void;
}

const TransferDropdown: React.FC<TransferDropdownProps> = ({
  isTransferAvailable,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState( "without");

  console.log(isTransferAvailable);
  

 const options = !isTransferAvailable
   ? ["without", "shared", "private"]
   : ["without"];
  
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <span
        className="font-Poppins text-sm font-normal text-[#5e6d77] mt-1 cursor-pointer p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <IoChevronDownSharp className="inline-block mb-1 ml-3" />
      </span>
      {isOpen && (
        <div className="absolute top-10 left-0 bg-white border-2 p-2 rounded shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200 hover:rounded-lg font-Poppins text-sm font-normal text-[#1a2b48]"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransferDropdown;
