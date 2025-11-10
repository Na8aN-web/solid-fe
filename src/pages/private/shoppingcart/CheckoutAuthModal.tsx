import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutAuthModal: React.FC<CheckoutAuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignup = () => {
    // Store intended destination to return after signup
    sessionStorage.setItem('checkout_redirect', 'true');
    navigate('/signup');
  };

  const handleLogin = () => {
    // Store intended destination to return after login
    sessionStorage.setItem('checkout_redirect', 'true');
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 rounded-full p-4">
            <svg 
              className="w-12 h-12 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-customBrown mb-2">
          Sign In Required
        </h2>

        {/* Message */}
        <p className="text-center text-customGray3 mb-6">
          To proceed with checkout, please create an account or sign in to your existing account. 
          Your cart items will be saved!
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSignup}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Create Account
          </button>
          
          <button
            onClick={handleLogin}
            className="w-full bg-white text-primary border-2 border-primary py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>

        {/* Additional info */}
        <p className="text-center text-sm text-customGray3 mt-4">
          Don't worry! Your cart items are safely stored and will be available after you sign in.
        </p>
      </div>
    </div>
  );
};

export default CheckoutAuthModal;