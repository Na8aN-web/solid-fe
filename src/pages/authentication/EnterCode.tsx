import React, { useState, useRef, useEffect } from "react";
import Navbar from "../private/home/components/Navbar";
import { Link } from "react-router-dom";

const EnterCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [bgColor, setBgColor] = useState<string>("bg-[#F3F3F3]");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (isNaN(Number(e.target.value))) return;

    setOtp((prevOtp) => {
      const newOtp = prevOtp.map((data, indx) =>
        indx === index ? e.target.value : data
      );

      // Check if all OTP inputs are filled
      if (newOtp.every((val) => val.trim() !== "")) {
        setBgColor("bg-[#D9E1E8]"); // Change background when OTP is fully entered
      } else {
        setBgColor("bg-[#F3F3F3]"); // Reset background if not complete
      }

      return newOtp;
    });
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

  // setOtp([otp.map(data, indx) => (indx === index? e.target.value)])
  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-4">
            Enter Code
          </h1>
          <p className="text-base text-shadeGray">
            Enter the 6 digit code we just sent to
          </p>
          <span className="text-base text-shadeGray font-semibold">
            Marvel987@gmail.com
          </span>
          <form className="space-y-10 pt-4">
            <div className={`flex gap-1`}>
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
                    ref={(el) => {
                      inputRefs.current[i] = el; // ✅ Fix: Ensure it returns void
                    }}
                  />
                );
              })}
            </div>
          </form>
          <p className="text-sm font-semibold text-[#919191] leading-10">
            Didn't get the code? Resend in{" "}
            <span className="text-[#4817C2]">{formatTime(timeLeft)}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default EnterCode;
