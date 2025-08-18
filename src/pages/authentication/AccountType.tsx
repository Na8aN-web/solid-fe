import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppDispatch } from '../../store/hooks';
import { setAccountType } from '../../store/slices/authSlice';

// Define an enum for account types
enum AccountType {
  MechanicsIndividuals = 'mechanics',
  SubDistributors = 'sub-distributors',
}

const AccountTypeSelection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accountTypes = [
    {
      type: AccountType.MechanicsIndividuals,
      label: 'Mechanics/Individuals',
      description: 'For mechanics and vehicle owners looking for reliable spare parts at great prices',
      role: 'Individual'
    },
    {
      type: AccountType.SubDistributors,
      label: 'Sub-distributors/Bulk buyers',
      description: 'Designed for businesses or sub-distributors reselling in various cities. Get wholesale pricing, and connect with distributors.',
      role: 'Wholesaler'
    },
  ];

  const handleAccountTypeSelect = (type: AccountType) => {
    setSelectedType(type);
  };

  const handleCreateAccount = () => {
    if (selectedType) {
      // Store the selected account type in Redux
      dispatch(setAccountType(selectedType));
      
      // Navigate to the signup page
      navigate('/signup');
    }
  };

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex items-center justify-center bg-white font-roboto p-0 md:p-6">
        <div className="w-full max-w-[600px] bg-white md:border border-[#D9D9D9] rounded-lg shadow-md p-[20px] md:p-[60px]">
          <h2 className="text-[24px] font-normal text-center mb-4 text-[#1D192B]">Create an Account</h2>
          <p className="text-center text-[#827E7E] text-[14px] mb-6">
            Choose the account type that fits your needs and gain access to tailored features for seamless transactions
          </p>

          <div className="space-y-4">
            {accountTypes.map((accountType) => (
              <div
                key={accountType.type}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all duration-300
                  ${selectedType === accountType.type
                    ? 'border-[#003366] bg-[#00336626] shadow-[inset_0px_-1px_9.8px_0px_rgba(0,51,102,1)] ring-1 ring-[#003366]'
                    : 'border-[#E3E6EA] hover:border-blue-300 hover:bg-blue-50/20'}
                `}
                onClick={() => handleAccountTypeSelect(accountType.type)}
              >
                <div className="flex items-center">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3
                      ${selectedType === accountType.type
                        ? 'border-[#003366] bg-[#003366] text-white'
                        : 'border-[#E3E6EA]'}
                    `}
                  >
                    {selectedType === accountType.type && <span className="text-xs">✓</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${selectedType === accountType.type ? 'text-[#003366]' : 'text-[#5E5E5E]'}`}>
                      {accountType.label}
                    </h3>
                    <span className={`text-xs ${selectedType === accountType.type ? 'text-[#003366]' : 'text-[#827E7E]'}`}>
                      Role: {accountType.role}
                    </span>
                  </div>
                </div>
                <p className={`text-sm mt-2 pl-8 ${selectedType === accountType.type ? 'text-[#003366]' : 'text-[#5E5E5E]'}`}>
                  {accountType.description}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateAccount}
            disabled={!selectedType}
            className={`
              w-full mt-6 py-3 rounded-lg text-white font-bold transition-all duration-300
              ${selectedType
                ? 'bg-[#003366] hover:bg-blue-700 active:bg-blue-800'
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            Already have an account? <a href="/login" className="hover:underline text-[#003366]">Login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTypeSelection;