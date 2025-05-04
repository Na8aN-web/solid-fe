import React from "react";

const TrackOrder = () => {
  return (
    <div>
      <h1 className="text-customBrown font-medium text-xl pb-4">Saved Items</h1>
      <section className="border py-4 px-8 bg-white">
        <h2 className="text-customBrown text-base font-semibold pb-10">Track the status of your order</h2>
        <form action="">
          <label
            htmlFor="tracking"
            className="leading-8 text-sm text-customBrown font-normal"
          >
            Tracking Number
          </label>
          <input
            type="text"
            placeholder="Please enter your tracking number"
            className="w-full p-4 border rounded-lg text-base shadow-sm text-customGray3 focus:outline-none focus:ring-customBrown focus:border-customBrown mb-14"
          />
            <button
              type="submit"
              className="bg-customBrown md:bg-primary rounded-lg p-5 w-full text-base text-white"
            >
              Track
            </button>
        </form>
      </section>
    </div>
  );
};

export default TrackOrder;
