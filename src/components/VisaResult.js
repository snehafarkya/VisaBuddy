import React from 'react';
import ReactMarkdown from 'react-markdown';

const VisaResult = ({ visaInfo }) => {
  return (
    <div className="mt-8 bg-white shadow-md p-6 mx-6 max-w-2xl md:mx-auto rounded-lg text-left">
      <h2 className="text-xl font-bold mb-2 text-center text-[#2d2bb1]">
        Visa Requirement for {visaInfo.destination}
      </h2>
      <div className="prose prose-sm mt-4 text-gray-700">
        <ReactMarkdown>{visaInfo.details}</ReactMarkdown>
      </div>
    </div>
  );
};

export default VisaResult;
