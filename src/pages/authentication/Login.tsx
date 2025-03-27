import { useState } from "react";
import Navbar from "../public/home/components/LandingNavbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // input values
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    handleLogin(email, password);
  };

  const handleLogin = (email: string, password: string) => {};

  return (
    <div>
      <Navbar />
      <section className="sm:flex sm:justify-center sm:items-center sm:min-h-screen">
        <div className="p-5 sm:p-14 sm:border sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h1 className="text-2xl font-bold text-customBrown leading-7 pb-4">
            Welcome back, login to your account
          </h1>
          <p className="text-base text-shadeGray">
            Login with your email address or phone number and password
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label
                htmlFor="email"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Email Address or Phone number
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email address or phone number"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="**************"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[60px] transform -translate-y-1/2 text-sm text-primary"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              <Link to="/recover-password">
                <p className="text-right cursor-pointer leading-8 text-sm text-shadeGray font-normal">
                  Forgot Password?
                </p>
              </Link>
            </div>
            <button
              type="submit"
              className="bg-primary rounded-lg p-4 w-full text-base text-white"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-black py-4">
            Don't have an account?
            <span className="text-primary font-bold">Create</span>
          </p>
          <div className="flex items-center gap-4 pb-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-customBrown text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex items-center justify-center gap-3 border border-[#6558F] rounded-xl py-5 lg:py-4 w-full">
              <img src="/faceblue.svg" alt="" />
              <p>Continue with Facebook</p>
            </div>
            <div className="flex items-center justify-center gap-3 border border-[#6558F] rounded-xl py-5 lg:py-4 w-full">
              <img src="/google.svg" alt="" />
              <p>Continue with Google</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
