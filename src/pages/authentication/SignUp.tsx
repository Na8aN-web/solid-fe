import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser, prepareSignupData, clearError } from '../../store/slices/authSlice';

interface SignupFormData {
    // Personal/Individual fields
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    companyName?: string;
    
    // Business-specific fields
    businessOwnerName?: string;
    businessPhoneNumber?: string;
    businessEmail?: string;
    businessName?: string;
    businessAddress?: string;
    businessRCNumber?: string;
    businessWebsite?: string;
    
    password: string;
    termsAccepted: boolean;
}

const SignupScreen: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        companyName: '',
        businessOwnerName: '',
        businessPhoneNumber: '',
        businessEmail: '',
        businessName: '',
        businessAddress: '',
        businessRCNumber: '',
        businessWebsite: '',
        password: '',
        termsAccepted: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    const dispatch = useAppDispatch();
    const { selectedAccountType, isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
    
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasUppercase: false
    });

    useEffect(() => {
        // Clear previous errors when component mounts
        dispatch(clearError());
        
        // Redirect if no account type is selected
        if (!selectedAccountType) {
            navigate('/account-type');
        }
    }, [dispatch, navigate, selectedAccountType]);

    // Redirect on successful authentication
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Password requirements validation
        if (name === 'password') {
            setPasswordRequirements({
                minLength: value.length >= 8,
                hasNumber: /\d/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
                hasUppercase: /[A-Z]/.test(value)
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedAccountType) {
            navigate('/account-type');
            return;
        }
        
        // Prepare the data for submission
        const signupData = prepareSignupData(selectedAccountType, formData);
        
        // Dispatch the register action
        dispatch(registerUser(signupData));
    };

    const isFormValid = () => {
        const passwordValid = Object.values(passwordRequirements).every(Boolean);
        const termsAccepted = formData.termsAccepted;
        const passwordFilled = formData.password;

        if (selectedAccountType === 'sub-distributors') {
            // Business form validation - include all required fields
            return (
                formData.businessOwnerName &&
                formData.businessPhoneNumber &&
                formData.businessEmail &&
                formData.businessName &&
                formData.businessAddress &&
                passwordFilled &&
                termsAccepted &&
                passwordValid
            );
        } else {
            // Individual/Mechanic form validation
            return (
                formData.firstName &&
                formData.lastName &&
                formData.phoneNumber &&
                formData.email &&
                passwordFilled &&
                termsAccepted &&
                passwordValid
            );
        }
    };

    const renderBusinessForm = () => (
        <>
            <div>
                <label htmlFor="businessOwnerName" className="block text-sm text-customBrown">
                    Business Owner's Name
                </label>
                <input
                    type="text"
                    id="businessOwnerName"
                    name="businessOwnerName"
                    value={formData.businessOwnerName || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name of business owner"
                    required
                />
            </div>

            <div>
                <label htmlFor="businessPhoneNumber" className="block text-sm text-customBrown">
                    Business Phone Number
                </label>
                <input
                    type="tel"
                    id="businessPhoneNumber"
                    name="businessPhoneNumber"
                    value={formData.businessPhoneNumber || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Business phone number"
                    required
                />
            </div>

            <div>
                <label htmlFor="businessEmail" className="block text-sm text-customBrown">
                    Business Email Address
                </label>
                <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter business email address"
                    required
                />
            </div>

            <div>
                <label htmlFor="businessName" className="block text-sm text-customBrown">
                    Business Name
                </label>
                <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Business Name"
                />
            </div>

            <div>
                <label htmlFor="businessAddress" className="block text-sm text-customBrown">
                    Business Address
                </label>
                <input
                    type="text"
                    id="businessAddress"
                    name="businessAddress"
                    value={formData.businessAddress || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Business Address"
                />
            </div>

            <div>
                <label htmlFor="businessRCNumber" className="block text-sm text-customBrown">
                    Business RC Number
                </label>
                <input
                    type="text"
                    id="businessRCNumber"
                    name="businessRCNumber"
                    value={formData.businessRCNumber || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Business RC Number"
                />
            </div>

            <div>
                <label htmlFor="businessWebsite" className="block text-sm text-customBrown">
                    Business Website (Optional)
                </label>
                <input
                    type="text"
                    id="businessWebsite"
                    name="businessWebsite"
                    value={formData.businessWebsite || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Business Website"
                />
            </div>
        </>
    );

    const renderIndividualForm = () => (
        <>
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 mb-3 md:mb-0">
                    <label htmlFor="firstName" className="block text-sm text-customBrown">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <label htmlFor="lastName" className="block text-sm text-customBrown">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Last Name"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-sm text-customBrown">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mobile Number"
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm text-customBrown">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                    required
                />
            </div>

            <div>
                <label htmlFor="companyName" className="block text-sm text-customBrown">
                    Company Name (Optional)
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleInputChange}
                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Company Name"
                />
            </div>
        </>
    );

    return (
        <>
            <div className="min-h-screen bg-white flex items-center justify-center p-0 md:p-4 font-roboto">
                <div className="w-full max-w-[600px] bg-white rounded-lg md:border border-[#D9D9D9] shadow-md p-[20px] md:p-[60px]">
                    <div className="flex items-center mb-6">
                        <button 
                            className="mr-4 text-gray-600 hover:text-gray-800"
                            onClick={() => navigate('/account-type')}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-[24px] text-[#2D2828] font-bold">Sign up</h2>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Render different forms based on account type */}
                        {selectedAccountType === 'sub-distributors' 
                            ? renderBusinessForm() 
                            : renderIndividualForm()
                        }

                        {/* Password field - common to all forms */}
                        <div>
                            <label htmlFor="password" className="block text-sm text-customBrown">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm py-4 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                    placeholder="**************"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="mt-2 text-[12px] text-gray-600">
                                <div className="">
                                    <div className='mb-2'>
                                        <div className={`inline-block w-max rounded-[16px] mr-1 bg-[#F5F5F5] p-1 ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ Minimum 8 characters
                                        </div>
                                        <div className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] p-1 ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ Number
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] mr-1 p-1 ${passwordRequirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ Special character, e.g., @#$%
                                        </div>
                                        <div className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] p-1 ${passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ UPPERCASE letter
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms and conditions - common to all forms */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="termsCheckbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="termsCheckbox" className="ml-2 block text-sm text-gray-900">
                                    Yes, I understand and agree with Solid Spare Parts'
                                    <a href="#" className="text-primary hover:underline ml-1">
                                        Terms of Service
                                    </a>, including the Privacy Policy
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid() || isLoading}
                            className={`
                                w-full py-3 rounded-lg text-white font-bold transition-all duration-300
                                ${isFormValid() && !isLoading
                                    ? 'bg-primary hover:bg-blue-700 active:bg-blue-800'
                                    : 'bg-gray-400 cursor-not-allowed'}
                            `}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-4">Already have an account?
                            <a href="/login" className="text-primary hover:underline ml-1 font-bold">
                                Log In
                            </a>
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="text-gray-500">OR</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4">
                            <button 
                                type="button"
                                className="bg-white border w-full md:w-[calc(50%-0.5rem)] border-[#1D192B] text-gray-700 text-[14px] py-4 px-5 rounded-lg inline-flex items-center justify-center hover:bg-gray-50"
                            >
                                <img src="/facebook.png" alt="Facebook" className="mr-3" />
                                Continue with Facebook
                            </button>
                            <button 
                                type="button"
                                className="bg-white border w-full md:w-[calc(50%-0.5rem)] border-[#1D192B] text-gray-700 text-[14px] py-4 px-5 rounded-lg inline-flex items-center justify-center hover:bg-gray-50"
                            >
                                <img src="/google.png" alt="Google" className="mr-3" />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupScreen;