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

 const options = !isTransferAvailable
   ? ["without", "shared", "private"]
   : ["without"];
  
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };
  

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <span className="mt-1"><IoChevronDownSharp/></span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div
                key={index}
                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionSelect(option)}
                role="menuitem"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferDropdown;
