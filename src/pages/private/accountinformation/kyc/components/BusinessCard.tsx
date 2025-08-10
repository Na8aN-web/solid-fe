import React from "react";

const BusinessCard = () => {
  return (
    <div className="border w-full px-4 py-6 rounded-[10px]">
      <h2 className="text-xl font-semibold text-customBrown pb-2">Business Registration Certificate</h2>
      <p className="text-sm font-normal text-customGray3">
        Please upload a clear, legible copy of your official business
        registration certificate (e.g., CAC Certificate for Nigerian
        businesses). Ensure the document is in PDF, JPG, or PNG format and does
        not exceed 5MB. This helps us verify the legitimacy of your business.
      </p>
    </div>
  );
};

export default BusinessCard;
