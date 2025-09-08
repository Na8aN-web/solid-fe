import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError, resetPasswordState } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store";

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
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
    // If password reset is successful, show success and redirect to login page
    if (passwordReset.resetSuccess) {
      alert("Password reset successful. Please login with your new password.");
      
      // Reset the password reset state
      dispatch(resetPasswordState());
      
      // Navigate to login page
      navigate("/login");
    }
  }, [passwordReset.resetSuccess, dispatch, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check if the password and confirmation match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      alert("Please ensure your password meets all requirements.");
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
  };

  return (
    <div>
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-2">
            Create New Password
          </h1>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
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
    </div>
  );
};

export default CreateNewPassword;