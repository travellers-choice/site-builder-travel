"use client";
import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

interface Question {
  id: string;
  title: string;
  answer: string;
}

interface FaqsProps {
  questions: Question[];
}

const Faqs: React.FC<FaqsProps> = ({ questions }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActiveId(id === activeId ? null : id);
  };

  return (
    <div>
      {questions.map((question) => (
        <section key={question.id} className="border-b-2">
          <div className="p-4 flex items-center">
            <FaCommentDots className="text-xl text-[#1a2b48]" />
            <button
              className={`ml-2 font-Poppins text-md font-medium	text-[#1a2b48]
               ${activeId === question.id ? "active" : ""}`}
              onClick={() => handleClick(question.id)}
            >
              {question.title}
            </button>
          </div>

          <div className="">
            {activeId === question.id && (
              <p className="ml-4 text-wrap -mt-1 mb-5 font-Poppins text-sm font-normal 	text-[#5e6d77;]">
                {question.answer}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Faqs;
