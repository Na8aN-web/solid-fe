import React, { useState, useEffect } from "react";
import Navbar from "../private/home/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordResetOTP, clearError } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store";

const RecoverPassword = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { isLoading, error, passwordReset } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Clear any previous errors
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // If OTP was successfully requested, navigate to the code verification page
    if (passwordReset.otpRequested) {
      // Store email in session storage for next component
      sessionStorage.setItem("resetEmail", email);
      navigate("/enter-code");
    }
  }, [passwordReset.otpRequested, navigate, email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(requestPasswordResetOTP(email));
  };

  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-4">
            Recover your password
          </h1>
          <p className="text-base text-shadeGray">
            Enter your account's email to receive a 6-digit code
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-10 pt-4">
            <div>
              <label
                htmlFor="email"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-lg p-4 w-full text-base text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              }`}
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RecoverPassword;