import React from "react";
import { Link } from "react-router-dom";

const AddAddress = () => {
  return (
    <div className="p-5">
      <section className="sm:flex sm:justify-center sm:items-center sm:min-h-screen">
        <div className="sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h2>Add Delivery Address</h2>
          <form className="space-y-4 pt-4">
            <div className="sm:flex sm:gap-6 justify-between w-full">
              <div className="w-full">
                <label
                  htmlFor="firstname"
                  className="leading-8 text-sm text-customBrown font-normal"
                >
                  First Name
                </label>
                <input
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastname"
                  className="leading-8 text-sm text-customBrown font-normal"
                >
                  Last Name
                </label>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Email Address
              </label>
              <input
                name="email"
                type="text"
                placeholder="Enter Your Email Address"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="street"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Street Address
              </label>
              <input
                name="street"
                type="text"
                placeholder="Enter Your Street Address"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="direction"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Directions (optional)
              </label>
              <input
                name="direction"
                type="text"
                placeholder="Enter a descriptive additional address information"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder="Enter Your City"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                State
              </label>
              <select
                name="state"
                id=""
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Please Select state</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                City
              </label>
              <select
                name=""
                id=""
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Please select city</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <p className="text-customGray3 text-sm">Set as default address</p>
            </div>
            <div>
              <Link to="/checkout">
                <button
                  type="submit"
                  className="bg-primary rounded-lg p-4 w-full text-base text-white font-semibold mb-5"
                >
                  Save
                </button>
              </Link>
              <Link to="/checkout">
                <button
                  type="submit"
                  className="bg-white rounded-lg p-4 w-full text-base text-primary border border-primary font-semibold"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddAddress;
