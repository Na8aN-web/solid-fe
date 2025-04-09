import React, { useState } from "react";
import Navbar from "../../private/home/components/Navbar";
import BrandNav from "../../private/home/components/BrandNav";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import RecommendedProduct from "../home/components/RecommendedProduct";

const ProductDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [quantityCount, setQuantityCount] = useState<number>(1);

  const DescriptionSection = () => (
    <section className="text-sm text-shadeGray pb-4 space-y-1 border-b">
      <div
        className="flex justify-between items-center pb-2 mb:hidden"
        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
      >
        <h2 className="text-sm text-primary font-meduim">Description</h2>
        <img
          src="/arrow-down.svg"
          alt=""
          className={`w-4 transform transition-transform duration-300 ${
            isDescriptionOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div className={!isDescriptionOpen ? "block" : "hidden"}>
        <p>
          Haier Thermocool is making life better with our amazing range of
          double door refrigerators, which are designed for Nigeria homes with
          stylish design, large freezer storage space (UP TO 95L) that can
          retain food freshness for 100 hours without electricity and built with
          durable tropical compressors.
        </p>
        <p>
          Redefining freshness in the Turbo Series with the best cooling speed
          and elegant glass finish.
        </p>
        <p>
          35% Energy Saving Saves money on electricity bills by reducing energy
          consumption.
        </p>
        <p>
          100hrs Cooling Retention After Power Cut Peace of mind with continuous
          freshness for 100 hours after a power cut.
        </p>
        <p>
          Super Fast Cooling Rapid Cooling to Keep Your Fresh in Less Than
          30min.
        </p>
        <p>
          Largest Freezer Ratio Refrigerator in Nigeria About 50% Freezer Ratio:
          Double Door Refrigerator. Store More and Shop Less.
        </p>
        <p>Aesthetics Handle Recessed</p>
        <p>Door Colours Silver (shining silver)</p>
        <p>Accessories Condenser type Outside</p>
        <p>Length of cable/incl. plug (cm) 2 meters</p>
        <p>
          Basic data Voltage/Frequency (V/Hz) Rated: 220-240V/50HZ, product can
          start under 187V and run under 170V
        </p>
        <p>Freezer Volume (L) 96</p>
        <p>Total Volume (L) 138</p>
        <p>Fridge Volume (L) 42</p>
        <p>Defrost Manual</p>
        <p>Net weight (Kg) 32</p>
        <p>Gross weight (Kg) 36</p>
      </div>
    </section>
  );

  const SpecsSection = () => (
    <section className="text-sm text-shadeGray pb-4 space-y-1 border-b">
      <div
        className="flex justify-between items-center pb-2 md:hidden"
        onClick={() => setIsSpecsOpen(!isSpecsOpen)}
      >
        <h2 className="text-sm text-primary font-meduim">Specifications</h2>
        <img
          src="/arrow-down.svg"
          alt=""
          className={`w-4 transform transition-transform duration-300 ${
            isSpecsOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <h2 className="text-sm text-primary font-meduim pb-2 hidden md:block">
        Reviews
      </h2>
      <div className={!isSpecsOpen ? "block" : "hidden"}>
        <div className="md:hidden">
          <table className="border w-full">
            <tbody>
              <tr>
                <th className="border py-3 px-2 text-left">Dimensions</th>
                <td className="border py-3 px-2 text-left">
                  32 cm x 25 cm x 14 cm
                </td>
              </tr>
              <tr>
                <th className="border py-3 px-2 text-left">Weight</th>
                <td className="border py-3 px-2 text-left">0.6 kg</td>
              </tr>
              <tr>
                <th className="border py-3 px-2 text-left">Main Material</th>
                <td className="border py-3 px-2 text-left">Metal</td>
              </tr>
              <tr>
                <th className="border py-3 px-2 text-left">Product Type</th>
                <td className="border py-3 px-2 text-left">Brain Box</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="hidden md:block">
          <table className="table-fixed w-full border">
            <thead>
              <tr className="divide-x">
                <th className="pt-5 px-2 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/specicon.svg"
                      alt="Dimensions Icon"
                      className="w-12 h-12 mb-1"
                    />
                    <span>Dimensions</span>
                  </div>
                </th>
                <th className="w-1/4 pt-5 px-2 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/specicon.svg"
                      alt="Weight Icon"
                      className="w-12 h-12 mb-1"
                    />
                    <span>Weight</span>
                  </div>
                </th>
                <th className="w-1/4 pt-5 px-2 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/specicon.svg"
                      alt="Material Icon"
                      className="w-12 h-12 mb-1"
                    />
                    <span>Main Material</span>
                  </div>
                </th>
                <th className="w-1/4 pt-5 px-2 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/specicon.svg"
                      alt="Product Type Icon"
                      className="w-12 h-12 mb-1"
                    />
                    <span>Product Type</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x">
                <td className="w-1/4 py-3 px-2 text-center">
                  32 cm x 25 cm x 14 cm
                </td>
                <td className="w-1/4 py-3 px-2 text-center">0.6 kg</td>
                <td className="w-1/4 py-3 px-2 text-center">Brain Box</td>
                <td className="w-1/4 py-3 px-2 text-center">Brain Box</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const ReviewsSection = () => (
    <section className="pb-4 space-y-1">
      <div
        className="flex justify-between items-center pb-2 md:hidden"
        onClick={() => setIsReviewsOpen(!isReviewsOpen)}
      >
        <h2 className="text-sm text-primary font-meduim">Reviews</h2>
        <img
          src="/arrow-down.svg"
          alt=""
          className={`w-4 transform transition-transform duration-300 ${
            isDescriptionOpen ? "" : ""
          }`}
        />
      </div>
      <div className={!isReviewsOpen ? "block" : "hidden"}>
        <div className="space-y-4 md:space-y-0 md:flex md:items-start gap-20 border-b md:border-b-0">
          <div className="space-y-2">
            <h3 className="text-xs text-customBrown">Total Review</h3>
            <p className="text-2xl text-customBrown">121</p>
            <span className="text-xs text-customGray3">Verified reviews</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs text-customBrown">Average Rating</h3>
            <div className="flex items-center gap-4">
              <p className="text-2xl text-customBrown">4.0</p>
              <img src="/stars.svg" alt="" />
            </div>
            <span className="text-xs text-customGray3">
              Average rating on this product
            </span>
          </div>
          <div className="space-y-1  pb-6">
            <div className="flex gap-3">
              <img src="/onestar.svg" alt="" />
              <span>5</span>
              <img src="/fivebar.svg" alt="" className="" />
              <span>60</span>
            </div>
            <div className="flex gap-3">
              <img src="/onestar.svg" alt="" />
              <span>4</span>
              <img src="/fourbar.svg" alt="" />
              <span>30</span>
            </div>
            <div className="flex gap-3">
              <img src="/onestar.svg" alt="" />
              <span>3</span>
              <img src="/threebar.svg" alt="" />
              <span>20</span>
            </div>
            <div className="flex gap-3">
              <img src="/onestar.svg" alt="" />
              <span>2</span>
              <img src="/twobar.svg" alt="" />
              <span>10</span>
            </div>
            <div className="flex gap-3">
              <img src="/onestar.svg" alt="" />
              <span>1</span>
              <img src="/onebar.svg" alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className="space-y-6 border-b md:border-b-0 py-6">
          <div className="flex items-center gap-6 md:gap-12">
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <div className="bg-[#D9E1E8] w-[50px] h-[50px] flex justify-center items-center rounded-full">
                <span className="text-primary text-xl">C</span>
              </div>
              <p className="text-xs text-primary font-bold">Chibuzor</p>
            </div>
            <div className="space-y-1">
              <div className="flex gap-8 pb-1">
                <img src="/stars.svg" alt="" />
                <p className="text-xs text-customGray3">20-11-2024</p>
              </div>
              <p className="text-xs text-primary font-semibold">Not too bad</p>
              <p className="text-xs text-customGray3">
                Smaller than i imagined but what i selected. Prompt Delivery.
                Thank you
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 md:gap-12">
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <div className="bg-[#D9E1E8] w-[50px] h-[50px] flex justify-center items-center rounded-full">
                <span className="text-primary text-xl">C</span>
              </div>
              <p className="text-xs text-primary font-bold">Chibuzor</p>
            </div>
            <div className="space-y-1">
              <div className="flex gap-8 pb-1">
                <img src="/stars.svg" alt="" />
                <p className="text-xs text-customGray3">20-11-2024</p>
              </div>
              <p className="text-xs text-primary font-semibold">Not too bad</p>
              <p className="text-xs text-customGray3">
                Smaller than i imagined but what i selected. Prompt Delivery.
                Thank you
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 md:gap-12">
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <div className="bg-[#D9E1E8] w-[50px] h-[50px] flex justify-center items-center rounded-full">
                <span className="text-primary text-xl">C</span>
              </div>
              <p className="text-xs text-primary font-bold">Chibuzor</p>
            </div>
            <div className="space-y-1">
              <div className="flex gap-8 pb-1">
                <img src="/stars.svg" alt="" />
                <p className="text-xs text-customGray3">20-11-2024</p>
              </div>
              <p className="text-xs text-primary font-semibold">Not too bad</p>
              <p className="text-xs text-customGray3">
                Smaller than i imagined but what i selected. Prompt Delivery.
                Thank you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-[#F5F5F5] pb-10">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <BrandNav isMenuOpen={isMenuOpen} />
      <section className="lg:px-5 lg:py-4">
        <h2 className="py-2 px-5">Body Parts</h2>
        <div className="lg:flex lg:gap-6">
          <div className="py-6 px-4 lg:px-8 flex flex-col lg:w-2/3 gap-6 lg:gap-10 lg:flex-row bg-white lg:rounded-lg">
            <div className="flex-1">
              <div className="flex flex-col flex-1 items-center gap-16 w-full pt-24">
                <div className="">
                  <img src="/tyres.svg" alt="" className="w-[220px]" />
                </div>
                <div className="flex items-center justify-between w-full max-w-[400px]">
                  <div className="border px-4 py-5 rounded flex justify-center items-center">
                    <img src="/tyres.svg" alt="tyres" className="w-[50px]" />
                  </div>
                  <div className="border px-4 py-5 rounded flex justify-center items-center">
                    <img src="/tyres.svg" alt="tyres" className="w-[50px]" />
                  </div>
                  <div className="border px-4 py-5 rounded flex justify-center items-center">
                    <img src="/tyres.svg" alt="tyres" className="w-[50px]" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-1 items-center pt-8">
                <p className="text-sm text-customGray3">Share This Product</p>
                <div className="flex gap-2">
                  <img src="/facebookshare.svg" alt="" />
                  <img src="/xshare.svg" alt="" />
                  <img src="/whatsappshare.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <h2 className="text-xl text-customBrown">Michellene Tyres</h2>
              {/* review */}
              <div className="flex gap-2 items-center">
                <img src="/stars.svg" alt="" />
                <span className="text-xs text-customGray3">(88 reviews)</span>
              </div>
              {/* brand */}
              <p className="text-sm text-customGray3">
                Brand: <span className="text-customBrown">Michellene</span>
              </p>
              {/* price */}
              <p className="text-xl text-customBrown">
                60,000.00{" "}
                <span className="text-sm text-customGray3">80,000.00</span>
              </p>
              <p className="text-xs text-customGray3">You save 20,000</p>
              <div className="flex gap-2 items-center">
                <img src="/vector.svg" alt="" />
                <span className="text-xs text-[#F24844]">2 Units left</span>
              </div>
              {/* description */}
              <div>
                <h3 className="text-sm text-shadeGray font-medium pb-2">
                  Description
                </h3>
                <p className="text-sm text-customGray2">
                  Designed for ultimate comfort and durability, featuring an
                  adjustable, ergonomic fit and advanced ventilation system,
                  with spacious compartments and easy access, it’s ideal for
                  snowy, summer and all seasons
                </p>
              </div>
              <div className="space-y-2 px-2 border rounded-xl">
                <div className="flex gap-6 items-center py-4">
                  <img src="/delivery.svg" alt="" />
                  <div className="space-y-1">
                    <h4 className="text-customBrown text-sm font-bold">
                      Delivery
                    </h4>
                    <p className="text-xs text-shadeGray">
                      Estimated delivery time 1-9 business days
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-center border-t border-b py-4">
                  <img src="/warranty.svg" alt="" />
                  <div className="space-y-1">
                    <h4 className="text-customBrown text-sm font-bold">
                      Warranty
                    </h4>
                    <p className="text-xs text-shadeGray">
                      Warranty information unavailable for this item.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-center py-4">
                  <img src="/return-policy.svg" alt="" />
                  <div className="space-y-1">
                    <h4 className="text-customBrown text-sm font-bold">
                      Return Policy
                    </h4>
                    <p className="text-xs text-shadeGray">
                      Eligible items can be returned for free within 7 days of
                      delivery
                    </p>
                  </div>
                </div>
              </div>
              {/* seller information */}
              <div className="space-y-3">
                <h3 className="text-sm text-shadeGray">Seller Information</h3>
                <div className="border rounded-xl flex justify-between items-center py-4 px-2">
                  <div className="flex gap-2">
                    <img src="/warehouse.svg" alt="" />
                    <div>
                      <p className="text-sm text-customBrown">
                        Solid Spare Parts Warehouse
                      </p>
                      <p className="text-xs text-shadeGray">
                        200 successful sales
                      </p>
                    </div>
                  </div>
                  <div className="border border-primary py-2 px-4 rounded-lg">
                    <p className="text-primary text-xs">Visit Store</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between pb-1">
                      <p className="text-xs text-shadeGray">Product Quality</p>
                      <span className="text-xs text-shadeGray">80%</span>
                    </div>
                    <img src="/progressbar.svg" alt="" />
                  </div>
                  <div>
                    <div className="flex justify-between pb-1">
                      <p className="text-xs text-shadeGray">Delivery Rate</p>
                      <span className="text-xs text-shadeGray">80%</span>
                    </div>
                    <img src="/progressbar.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 px-4 lg:px-8 bg-white lg:rounded-lg lg:w-1/3">
            {/* order details */}
            <div className="pb-6">
              <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
                Order Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-customGray3">Quantity:</p>
                  <div className="flex items-center justify-around border border-gray-300 rounded-[2px] w-[106px] h-[28px]">
                    <button
                      className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
                      onClick={() =>
                        setQuantityCount((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                    >
                      <Minus />
                    </button>
                    <span className="flex-1 w-full text-center border-l border-r text-customBrown text-base font-meduim">
                      {quantityCount}
                    </span>
                    <button
                      className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
                      onClick={() => setQuantityCount((prev) => prev + 1)}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3">Price:</p>
                  <span className="text-sm text-customBrown font-meduim">
                    60,000.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3">Discount:</p>
                  <span className="text-sm text-customBrown font-meduim">
                    (20%) -20,000.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3 flex gap-2 items-center">
                    Discount
                    <span className="text-[10px] text-customBrown font-meduim flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
                      standard
                      <img src="/standardarrow.svg" alt="Discount Type Arrow" />
                    </span>
                  </p>
                  <span className="text-sm text-customBrown font-meduim">
                    (20%) -20,000.00
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b pb-1">
              <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
                Delivery & Returns
              </h3>
              <p className="text-sm text-customGray3 font-normal">
                Same day delivery available in
              </p>
              <span className="text-sm text-customGray3 font-semibold">
                Lagos
              </span>
            </div>
            <form action="" className="py-6">
              <div className="flex flex-col border-b pb-6">
                <label
                  htmlFor="address"
                  className="text-sm text-customGray3 pb-3"
                >
                  Choose your location
                </label>
                <div className="relative">
                  <img
                    src="/address-marker-outline.svg"
                    alt=""
                    className="w-4 absolute left-4 top-4"
                  />
                  <input
                    type="text"
                    placeholder="Enter an address"
                    className="border h-12 px-10 w-full rounded-lg"
                  />
                  <img
                    src="/standardarrow.svg"
                    alt=""
                    className="w-4 absolute right-4 bottom-4"
                  />
                </div>
              </div>
              <div className="flex flex-col border-b pb-6 pt-6">
                <label
                  htmlFor="coupon"
                  className="text-sm text-customGray3 pb-3"
                >
                  COUPON
                </label>
                <div className="relative">
                  <img
                    src="/address-marker-outline.svg"
                    alt=""
                    className="w-4 absolute left-4 top-4"
                  />
                  <input
                    type="text"
                    placeholder="Enter Code Here"
                    className="border h-12 px-10 w-full rounded-lg"
                  />
                  <span className="absolute right-4 bottom-4 text-xs text-customGold">
                    APPLY COUPON
                  </span>
                </div>
              </div>
              <div className="pt-6 pb-4 border-b space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3">Subtotal:</p>
                  <span className="text-sm text-customBrown font-meduim">
                    60,000.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-customBrown font-medium">Total</p>
                  <span className="text-base text-customBrown font-meduim">
                    20,000.00
                  </span>
                </div>
              </div>
              <div className="space-y-6 pt-6">
                <button
                  type="submit"
                  className="bg-primary rounded-lg h-[60px] w-full text-base text-white"
                >
                  Buy Now
                </button>
                <button
                  type="submit"
                  className="bg-white border border-primary rounded-lg h-[60px] w-full text-base text-primary"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Specifications */}
      <section className="bg-white lg:rounded-lg px-4 lg:px-10 lg:m-5">
        {/* tab header */}
        <div className="hidden md:block">
          <div className="flex gap-20 border-b md:mb-6">
            {["description", "specs", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-sm font-medium py-2 ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-shadeGray"
                }`}
              >
                {tab === "description"
                  ? "Description"
                  : tab === "specs"
                    ? "Specifications"
                    : "Reviews"}
              </button>
            ))}
          </div>
          <div>
            {activeTab === "description" && <DescriptionSection />}
            {activeTab === "specs" && <SpecsSection />}
            {activeTab === "reviews" && <ReviewsSection />}
          </div>
        </div>
        <div className="block md:hidden space-y-8">
          <DescriptionSection />
          <SpecsSection />
          <ReviewsSection />
        </div>
      </section>
      <RecommendedProduct />
    </div>
  );
};

export default ProductDetails;
