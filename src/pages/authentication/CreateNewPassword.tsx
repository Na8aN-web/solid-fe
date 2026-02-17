import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError, resetPasswordState } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store";

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { isLoading, error, passwordReset } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   // Clear any previous errors
  //   dispatch(clearError());
    
  //   // Check if we have the resetToken in the state
  //   if (!passwordReset.otpVerified || !passwordReset.resetToken) {
  //     // If we don't have the resetToken, redirect to recovery page
  //     navigate("/recover-password");
  //   }
  // }, [dispatch, navigate, passwordReset.otpVerified, passwordReset.resetToken]);

  useEffect(() => {
    // If password reset is successful, show success modal and redirect to login page
    if (passwordReset.resetSuccess) {
      setShowSuccessModal(true);
    }
  }, [passwordReset.resetSuccess]);

  useEffect(() => {
    // Show error modal if there's an error from Redux
    if (error) {
      setErrorMessage(error);
      setShowErrorModal(true);
    }
  }, [error]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    
    // Reset the password reset state
    dispatch(resetPasswordState());
    
    // Navigate to login page
    navigate("/login");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
    dispatch(clearError());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check if the password and confirmation match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      setErrorMessage("Passwords do not match");
      setShowErrorModal(true);
      return;
    }

    setPasswordMismatch(false);

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      setErrorMessage("Please ensure your password meets all requirements.");
      setShowErrorModal(true);
      return;
    }

    // Submit the password reset request using resetToken
    if (passwordReset.resetToken) {
      dispatch(resetPassword({
        resetToken: passwordReset.resetToken,
        new_password: formData.password
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password requirements validation
    if (name === "password") {
      setPasswordRequirements({
        minLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
      });
    }

    // Clear password mismatch error when user types
    if (name === "confirmPassword" || name === "password") {
      setPasswordMismatch(false);
    }
  };

  return (
    <div>
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-2">
            Create New Password
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="relative">
              <label
                htmlFor="password"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                New Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange}
                value={formData.password}
                placeholder="**************"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Re-enter Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                className={`w-full p-4 border rounded-lg text-base shadow-sm ${passwordMismatch ? "focus:outline-none focus:ring-red-500 focus:border-red-500" : "focus:outline-none focus:ring-blue-500 focus:border-blue-500"}`}
                placeholder="**************"
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary cursor-pointer"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
              {passwordMismatch && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
            <div className="mt-2 text-[12px] text-gray-600">
              <div className="">
                <div className="mb-2">
                  <div
                    className={`inline-block w-max rounded-[16px] mr-1 bg-[#F5F5F5] p-1 ${passwordRequirements.minLength ? "text-green-600" : "text-gray-500"}`}
                  >
                    ✓ Minimum 8 characters
                  </div>
                  <div
                    className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] p-1 ${passwordRequirements.hasNumber ? "text-green-600" : "text-gray-500"}`}
                  >
                    ✓ Number
                  </div>
                </div>
                <div>
                  <div
                    className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] mr-1 p-1 ${passwordRequirements.hasSpecialChar ? "text-green-600" : "text-gray-500"}`}
                  >
                    ✓ Special character, e.g., @#$%
                  </div>
                  <div
                    className={`inline-block w-max rounded-[16px] bg-[#F5F5F5] p-1 ${passwordRequirements.hasUppercase ? "text-green-600" : "text-gray-500"}`}
                  >
                    ✓ UPPERCASE letter
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-lg p-4 w-full text-base text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              }`}
            >
              {isLoading ? "Resetting Password..." : "Continue"}
            </button>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseSuccessModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg 
                  className="h-6 w-6 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Password Reset Successful
              </h3>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. Please login with your new password.
              </p>
              <button
                onClick={handleCloseSuccessModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseErrorModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg 
                  className="h-6 w-6 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Error
              </h3>
              <p className="text-gray-600 mb-6">
                {errorMessage}
              </p>
              <button
                onClick={handleCloseErrorModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewPassword;