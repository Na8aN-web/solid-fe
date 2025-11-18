import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
  productName?: string;
  title?: string;
  message?: string;
  viewCartText?: string;
  continueShoppingText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onViewCart,
  productName,
  title = "Success!",
  message,
  viewCartText = "View Cart",
  continueShoppingText = "Continue Shopping"
}) => {
  if (!isOpen) return null;

  const defaultMessage = productName 
    ? `${productName} has been successfully added to your cart.`
    : "Item has been successfully added to your cart.";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <p className="text-gray-600 mb-2">
          {message || defaultMessage}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onViewCart}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {viewCartText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            {continueShoppingText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;