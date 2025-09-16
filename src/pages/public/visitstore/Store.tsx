import { useState } from "react";
import ProductPageLayout from "../products/ProductPageLayout";
import { MapPin, Search } from "lucide-react";
import { FaStar } from "react-icons/fa";

const Store = () => {
  const [rating, setRating] = useState<number | null>(4);
  const [rateColor, setRateColor] = useState<number | null>(null);
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <section className="flex flex-col gap-6 lg:flex-row p-4 lg:gap-16 lg:px-16 bg-white lg:py-6">
        <div className="space-y-4 w-full">
          <div className="bg-primary w-full p-5 rounded-xl space-y-1">
            <p className="text-xl font-semibold text-white">
              Solid Spare Parts Warehouse
            </p>
            <p className="text-sm font-normal text-white">
              <span className="font-semibold">200</span> successful sales
            </p>
            <p className="text-sm font-normal text-white">
              <span className="font-semibold">5 months</span> selling on Solid
              Spare Parts
            </p>
            <div className="flex gap-2 items-center pt-4">
              <MapPin className="text-white" />
              <p className="text-sm font-normal text-white">Nigeria</p>
            </div>
          </div>
          <div className="relative">
            <Search strokeWidth={1} className="absolute z-1000 top-5 left-4" />
            <input
              type="text"
              id="searchProd"
              name="searchProd"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-4 pl-14 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search other products by seller"
              required
            />
          </div>
        </div>

        <div className="space-y-4 w-full lg:w-9/12">
          <div>
            <div className="flex justify-between pb-1">
              <p className="text-xs text-shadeGray">Product Quality</p>
              <span className="text-xs text-shadeGray">80%</span>
            </div>
            <img src="/progressbar2.svg" alt="" className="w-full"/>
          </div>
          <div>
            <div className="flex justify-between pb-1">
              <p className="text-xs text-shadeGray">Delivery Rate</p>
              <span className="text-xs text-shadeGray">80%</span>
            </div>
            <img src="/progressbar2.svg" alt="" className="w-full"/>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-base text-customGray3 font-meduim">4.6</span>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                return (
                  <div key={currentRate} className="cursor-pointer">
                    <Star
                      color={
                        currentRate <= (rateColor ?? rating ?? 0)
                          ? "gold"
                          : "lightgrey"
                      }
                    />
                  </div>
                );
              })}
            </div>
            <span className="text-base text-customGray3 font-meduim">
              from (88 reviews)
            </span>
          </div>
        </div>
      </section>

      <ProductPageLayout pageTitle="Visit Store" />
    </div>
  );
};

export default Store;
