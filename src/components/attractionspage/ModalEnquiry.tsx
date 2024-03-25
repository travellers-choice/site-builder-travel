"use client ";
import React, { FC } from "react";

interface ModalEnquiryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEnquiry: FC<ModalEnquiryProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white p-6 rounded-lg shadow-lg absolute top-0 left-1/2 transform -translate-x-1/2 mt-20  w-[500px] max-w-full">
            <h2 className="text-xl font-medium mb-4 border-b-2  p-3">
              Enquiry
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="form-control border border-[#5e6d77;] rounded w-full p-2"
            />
            <input
              type="text"
              placeholder="Email"
              className="form-control border border-[#5e6d77;] rounded w-full p-2 mt-5"
            />
            <input
              type="text"
              placeholder="Phone"
              className="form-control border border-[#5e6d77;] rounded w-full p-2 mt-5"
            />
            <input
              type="text"
              placeholder="Note"
              className="form-control border border-[#5e6d77;] rounded w-full p-4 mt-5 mb-2"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-blue-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium ms-4"
                onClick={onClose}
              >
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalEnquiry;
