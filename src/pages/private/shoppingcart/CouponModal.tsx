// components/CouponModal.tsx
import React from 'react';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const CouponModal: React.FC<CouponModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
            type === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {type === 'success' ? (
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          {/* Message */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          
          {/* Button */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className={`w-full px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === 'success' 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              }`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;