import { useState } from "react";
import Navbar from "../private/home/components/Navbar";
import { Link } from "react-router-dom";

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // input values
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;

    handleLogin(password);
  };

  const handleLogin = (password: string) => {};

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
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg text-base"
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
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg text-base"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
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
