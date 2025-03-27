import { useState } from "react";
import Navbar from "../private/home/components/Navbar";
import { Link } from "react-router-dom";

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // input values
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    handleLogin(password);
  };

  const handleLogin = (password: string) => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-2">
            Create New password
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
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Re-enter Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
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
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary"
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
              className="bg-primary rounded-lg p-4 w-full text-base text-white"
            >
              Continue
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateNewPassword;
