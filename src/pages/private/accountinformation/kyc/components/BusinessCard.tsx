// BusinessCard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

interface BusinessCardProps {
  fileUploaded?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ fileUploaded = false }) => {
  const { userKYC } = useSelector((state: RootState) => state.kyc);
  
  const getStatusColor = () => {
    if (!userKYC) return "border-gray-300";
    switch (userKYC.status) {
      case 'Approved': return 'border-green-500 bg-green-50';
      case 'Rejected': return 'border-red-500 bg-red-50';
      case 'Flagged': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className={`border w-full px-4 py-6 rounded-[10px] ${getStatusColor()} transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-customBrown">Business Registration Certificate</h2>
        {fileUploaded && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Uploaded ✓
          </span>
        )}
      </div>
      <p className="text-sm font-normal text-customGray3">
        Please upload a clear, legible copy of your official business
        registration certificate (e.g., CAC Certificate for Nigerian
        businesses). Ensure the document is in PDF, JPG, or PNG format and does
        not exceed 5MB. This helps us verify the legitimacy of your business.
      </p>
      
      {userKYC?.reviewComment && (
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
          <strong>Review Note:</strong> {userKYC.reviewComment}
        </div>
      )}
    </div>
  );
};

export default BusinessCard;