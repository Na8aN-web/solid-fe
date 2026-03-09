import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
const RateReviewProduct = () => {
  const [rating, setRating] = useState<number | null>(null);
  
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="pb-8">
      <section className="px-5">
        <h1 className="text-customBrown text-base font-medium md:text-xl pb-4">
          Pending Ratings
        </h1>
        <div className="border">
          <div className="p-4 space-y-3 w-full h-[190px] md:h-[222px] flex items-center gap-4 md:gap-6 border-b">
            <img
              src="/tyres.svg"
              alt=""
              className="w-[140px] md:w-[160px] h-[134px] md:h-[153px]"
            />
            <div className="flex flex-col justify-between h-full max-h-[125px] md:max-h-[140px]">
              <h2 className="text-xs lg:text-xl text-customBrown font-normal lg:font-semibold">
                Michellene Tyres
              </h2>
              <p className="font-meduim text-base text-customGray3">
                Product Rating
              </p>
              <p className="font-normal text-xs text-[#919191]">
                Select ratings for this product
              </p>
              {/* star rating */}
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const currentRate = index + 1;
                  return (
                    <div
                      key={currentRate}
                      onClick={() => setRating(currentRate)}
                      className="cursor-pointer"
                    >
                      <Star
                        color={currentRate <= (rating ?? 0) ? "gold" : "lightgrey"}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-customBrown text-base font-semibold md:text-xl pb-3">
              Write a review
            </h2>
            <form action="" className="space-y-4">
              <div className="lg:flex lg:items-center lg:justify-between lg:gap-6 w-full">
                <div className="w-full">
                  <label
                    htmlFor="review-title"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    Review Title
                  </label>
                  <input
                    id="review-title"
                    name="reviewTitle"
                    type="text"
                    placeholder="e.g good product / bad product"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="reviewer-name"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    Your Name
                  </label>
                  <input
                    id="reviewer-name"
                    name="reviewerName"
                    type="text"
                    placeholder="Your name"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="pb-2">
                <label
                  htmlFor="review-text"
                  className="leading-8 text-sm text-customBrown font-normal"
                >
                  Review
                </label>
                <input
                  id="review-text"
                  name="reviewText"
                  type="text"
                  placeholder="Describe your experience with this product!"
                  className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary rounded-lg p-4 w-full text-base text-white"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RateReviewProduct;
