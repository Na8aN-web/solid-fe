import React from "react";

interface loaderProps {
  txt?: string;
}
const LoaderSpinner: React.FC<loaderProps> = ({ txt }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading {txt}...</p>
      </div>
    </div>
  );
};

export default LoaderSpinner;
