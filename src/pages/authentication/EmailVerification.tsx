import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    verifyEmailOTP,
    clearEmailVerificationError,
    resetRedirectToLogin // Import the reset action
} from '../../store/slices/authSlice';

const EmailVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timer, setTimer] = useState(60);
    const [showSuccess, setShowSuccess] = useState(false); // Success state

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        user,
        emailVerification: {
            isLoading,
            error,
            isRequired,
            redirectToLogin, // Get redirect flag from Redux
            otpToken // NEW: Get the OTP token from Redux
        },
        isAuthenticated
    } = useAppSelector(state => state.auth);

    // Timer effect
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Clear errors when component mounts
    useEffect(() => {
        dispatch(clearEmailVerificationError());
    }, [dispatch]);

    // Handle successful verification and redirect
    useEffect(() => {
        if (redirectToLogin) {
            // Show success message
            setShowSuccess(true);

            // Redirect to login after 2 seconds
            const redirectTimer = setTimeout(() => {
                navigate('/login');
                dispatch(resetRedirectToLogin()); // Reset the flag
                setShowSuccess(false);
            }, 2000);

            return () => clearTimeout(redirectTimer);
        }
    }, [redirectToLogin, navigate, dispatch]);

    // Redirect if email verification is not required or if missing OTP token
    useEffect(() => {
        if (isAuthenticated && user?.verified) {
            navigate('/home');
        } else if (user?.verified && !isAuthenticated) {
            // This shouldn't normally happen, but handle it just in case
            navigate('/login');
        } else if (!isRequired && !otpToken) {
            // No verification required and no OTP token available
            navigate('/login');
        }
    }, [isRequired, user, isAuthenticated, otpToken, navigate]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 6);

        const newOtp = [...otp];
        for (let i = 0; i < digits.length; i++) {
            newOtp[i] = digits[i];
        }
        setOtp(newOtp);

        // Focus the next empty input or the last input
        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            return;
        }

        // Check if we have the OTP token
        if (!otpToken) {
            console.error('OTP token not found');
            // You might want to redirect to registration or show an error
            navigate('/register');
            return;
        }

        // NEW: Pass both otp and otpToken to the dispatch
        dispatch(verifyEmailOTP({ otp: otpString, otpToken }));
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    if (!otpToken && !showSuccess) {
        return (
            <>
                <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <div className="min-h-screen bg-white flex items-center justify-center p-0 md:p-4 font-roboto">
                    <div className="w-full max-w-[500px] bg-white rounded-lg md:border border-[#D9D9D9] shadow-md p-[20px] md:p-[60px]">
                        <div className="text-center">
                            <h2 className="text-[24px] text-[#2D2828] font-bold mb-4">
                                Verification Session Expired
                            </h2>
                            <p className="text-[#827E7E] text-[14px] mb-6">
                                Your verification session has expired. Please register again to receive a new verification code.
                            </p>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full py-3 rounded-lg text-white font-bold bg-[#003366] hover:bg-blue-700 transition-colors"
                            >
                                Back to Registration
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="min-h-screen bg-white flex items-center justify-center p-0 md:p-4 font-roboto">
                <div className="w-full max-w-[500px] bg-white rounded-lg md:border border-[#D9D9D9] shadow-md p-[20px] md:p-[60px]">
                    <div className="flex items-center mb-6">
                        <button
                            className="mr-4 text-gray-600 hover:text-gray-800"
                            onClick={() => navigate(-1)}
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center justify-center mx-auto mb-4">
                            <img src='/verify-email.png' alt='verify email' />
                            <h2 className="text-[24px] text-[#2D2828] font-bold">
                                {showSuccess ? 'Email Verified Successfully!' : 'Verify Your Email Address'}
                            </h2>
                        </div>

                        {showSuccess ? (
                            <>
                                <p className="text-green-600 text-[14px] font-semibold mb-2">
                                    Your email has been verified!
                                </p>
                                <p className="text-[#827E7E] text-[12px]">
                                    Redirecting to login page...
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-[#827E7E] text-[14px]">
                                    We've sent a verification code to
                                </p>
                                <p className="font-semibold text-[#2D2828]">
                                    {user?.email || 'your email'}
                                </p>
                                <p className="text-[#827E7E] text-[12px] mt-2">
                                    Please enter the 6-digit code to verify your email address
                                </p>
                            </>
                        )}
                    </div>

                    {error && !showSuccess && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {!showSuccess ? (
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center gap-3 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        inputMode="numeric"
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={!isOtpComplete || isLoading}
                                className={`
                                    w-full py-3 rounded-lg text-white font-bold transition-all duration-300 mb-4
                                    ${isOtpComplete && !isLoading
                                        ? 'bg-[#003366] hover:bg-blue-700 active:bg-blue-800'
                                        : 'bg-gray-400 cursor-not-allowed'}
                                `}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="animate-pulse">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EmailVerification;