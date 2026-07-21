import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, requestPasswordResetOTP, clearError } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store";
import { useToast } from "../../components/Toast";

const EnterCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [bgColor, setBgColor] = useState<string>("bg-[#F3F3F3]");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [resetEmail, setResetEmail] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { isLoading, error, passwordReset } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");
    if (!email) {
      navigate("/recover-password");
      return;
    }
    setResetEmail(email);
    dispatch(clearError());
    if (!passwordReset.otpToken) {
      navigate("/recover-password");
      return;
    }
  }, [dispatch, navigate, passwordReset.otpToken]);

  useEffect(() => {
    if (error) {
      toast(error, "error");
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  useEffect(() => {
    // If OTP is verified, navigate to create new password page
    if (passwordReset.otpVerified) {
      navigate("/create-new-password");
    }
  }, [passwordReset.otpVerified, navigate]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop countdown at 0

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (isNaN(Number(e.target.value))) return;

    setOtp((prevOtp) => {
      const newOtp = prevOtp.map((data, indx) =>
        indx === index ? e.target.value : data
      );

      // Check if all OTP inputs are filled
      if (newOtp.every((val) => val.trim() !== "")) {
        setBgColor("bg-[#D9E1E8]"); // Change background when OTP is fully entered
        // Submit OTP automatically when all fields are filled
        setTimeout(() => handleSubmitOTP(newOtp.join("")), 300);
      } else {
        setBgColor("bg-[#F3F3F3]"); // Reset background if not complete
      }

      return newOtp;
    });
    
    // Auto focus next input
    if (
      e.target.value &&
      e.target.nextElementSibling instanceof HTMLInputElement
    ) {
      e.target.nextElementSibling.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = ""; // Clear the previous input as well

        setTimeout(() => inputRefs.current[index - 1]?.focus(), 0); // Move focus to previous input
        return newOtp;
      });
    }
  }

  const handleSubmitOTP = (otpCode: string) => {
    // Pass both OTP and otpToken to the verify function
    if (passwordReset.otpToken) {
      dispatch(verifyOTP({ 
        otp: otpCode, 
        otpToken: passwordReset.otpToken 
      }));
    } else {
      console.error("No OTP token available");
      navigate("/recover-password");
    }
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return; // Don't allow resend if timer is still running
    
    // Reset timer
    setTimeLeft(300);
    
    // Resend OTP
    if (resetEmail) {
      dispatch(requestPasswordResetOTP(resetEmail));
    }
  };

  return (
    <div>
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-4">
            Enter Code
          </h1>
          <p className="text-base text-shadeGray">
            Enter the 6 digit code we just sent to
          </p>
          <span className="text-base text-shadeGray font-semibold">
            {resetEmail}
          </span>
          
          <form className="space-y-10 pt-4">
            <div className={`flex gap-1 ${isLoading ? 'opacity-50' : ''}`}>
              {otp.map((data, i) => {
                return (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className={`w-full p-3 text-center text-xl text-primary transition-all duration-500 ${bgColor}`}
                    value={data}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    disabled={isLoading}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                  />
                );
              })}
            </div>
          </form>
          <p className="text-sm font-semibold text-[#919191] leading-10">
            {timeLeft > 0 ? (
              <>
                Didn't get the code? Resend in{" "}
                <span className="text-[#4817C2]">{formatTime(timeLeft)}</span>
              </>
            ) : (
              <button 
                onClick={handleResendCode}
                className="text-[#4817C2] hover:underline"
                disabled={isLoading}
              >
                Resend Code
              </button>
            )}
          </p>
        </div>
      </section>
    </div>
  );
};

export default EnterCode;