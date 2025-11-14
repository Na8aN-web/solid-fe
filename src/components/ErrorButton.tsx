import React from "react";

interface ErrorButtonProps {
  error?: string | null;
  fetch?: () => void;
}

const ErrorButton: React.FC<ErrorButtonProps> = ({fetch, error}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center text-red-600">
        <p className="text-lg font-medium mb-2">Error loading</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={fetch}
          className="mt-4 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244]"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorButton;
