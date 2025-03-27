import React, { useState } from "react";
import Navbar from "../private/home/components/Navbar";
import { Link } from "react-router-dom";

const RecoverPassword = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // input values
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    handleLogin(email);
  };

  const handleLogin = (email: string) => {};

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
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-lg text-base"
                required
              />
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

export default RecoverPassword;
