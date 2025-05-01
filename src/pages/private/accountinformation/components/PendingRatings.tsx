import React from "react";
import { Link } from "react-router-dom";

const PendingRatings = () => {
  return (
    <div>
      <section>
        <h2 className="text-customBrown text-base font-medium md:text-xl pb-4">
          Pending Ratings
        </h2>
        <div className="bg-white shadow-custom rounded-xl p-4 space-y-3 w-full h-[190px] md:h-[222px] flex items-center gap-4 md:gap-6">
          <img
            src="/tyres.svg"
            alt=""
            className="w-[140px] md:w-[160px] h-[134px] md:h-[153px]"
          />
          <div className="flex flex-col justify-between h-full max-h-[125px] md:max-h-[140px]">
            <h2 className="text-xs lg:text-xl text-customBrown font-normal lg:font-semibold">
              Michellene Tyres
            </h2>
            <p className="font-meduim text-xs lg:text-base text-customGray3">
              Order no: 2354857892089
            </p>
            <p className="font-normal text-xs text-customGray3">
              Delivered on: 10/12/2025
            </p>
            <Link to="rate-product"> 
              <button className="border border-primary w-[136px] h-[44px] rounded-[4px] hover:bg-primary hover:text-white">
                Rate this Product
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PendingRatings;
