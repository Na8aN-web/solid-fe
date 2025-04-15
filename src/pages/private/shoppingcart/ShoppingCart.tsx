import React, { useState } from "react";
import Navbar from "../../private/home/components/Navbar";
import { Plus, Minus, X } from "lucide-react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantityCount, setQuantityCount] = useState<number>(1);

  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="bg-[#F5F5F5]">
        <div className="px-5 py-6 bg-white lg:bg-[#F5F5F5] w-full">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
        </div>
        <div className="lg:flex lg:gap-5 lg:px-5 lg:pb-12">
          <div className="bg-white w-full lg:w-2/3 lg:p-5 self-start px-5 lg:rounded-lg lg:border lg:border-[#D9D9D9]">
            <table className="w-full">
              <tr className="w-full bg-[#F5F5F5]">
                <td className="pl-3 py-4 text-sm text-customGray1 font-normal lg:hidden">
                  subtotal: <span className="font-bold">3 items</span>
                </td>
                <td className="text-sm font-meduim pr-3 py-4 lg:hidden">
                  60,000
                </td>
                <td className="pl-5 py-4 text-sm text-customGray1 font-normal hidden lg:table-cell">
                  Item details
                </td>
                <td className="text-sm font-meduim pr-5 py-4 hidden lg:table-cell">
                  Item price total
                </td>
                <td className="text-sm font-meduim pr-5 py-4 hidden lg:table-cell">
                  Action
                </td>
              </tr>
              <tr className="border-t">
                <td>
                  <div className="flex gap-8 py-5 px-2 w-full">
                    {/* Image + Quantity on mobile */}
                    <div className="flex flex-col gap-4">
                      <img
                        src="/tyres.svg"
                        alt=""
                        className="w-[80px] h-[80px]"
                      />

                      {/* Mobile: quantity below image */}
                      <div className="flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px] lg:hidden">
                        <button
                          className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                          onClick={() =>
                            setQuantityCount((prev) =>
                              prev > 1 ? prev - 1 : 1
                            )
                          }
                        >
                          <Minus className="w-4" />
                        </button>
                        <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                          {quantityCount}
                        </span>
                        <button
                          className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                          onClick={() => setQuantityCount((prev) => prev + 1)}
                        >
                          <Plus className="w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info section */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-1/2 block">
                        <p className="text-sm text-customBrown">
                          Michelle Tyres
                        </p>
                        <p className="text-base text-customBrown">20,000.00</p>

                        {/* In Stock + Quantity on desktop */}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-[#15B70D]">
                            In Stock
                          </span>

                          {/* Desktop: quantity below "In Stock" */}
                          <div className="hidden lg:flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px]">
                            <button
                              className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                              onClick={() =>
                                setQuantityCount((prev) =>
                                  prev > 1 ? prev - 1 : 1
                                )
                              }
                            >
                              <Minus className="w-4" />
                            </button>
                            <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                              {quantityCount}
                            </span>
                            <button
                              className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                              onClick={() =>
                                setQuantityCount((prev) => prev + 1)
                              }
                            >
                              <Plus className="w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove (mobile only) */}
                      <div className="flex gap-2 items-center lg:hidden cursor-pointer">
                        <X className="w-4" />
                        <p className="text-sm text-customGray3">Remove</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell">20,000</td>
                <td className="hidden lg:table-cell">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <X className="w-4" />
                    <p className="text-sm text-customGray3">Remove</p>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td>
                  <div className="flex gap-8 py-5 px-2 w-full">
                    {/* Image + Quantity on mobile */}
                    <div className="flex flex-col gap-4">
                      <img
                        src="/tyres.svg"
                        alt=""
                        className="w-[80px] h-[80px]"
                      />

                      {/* Mobile: quantity below image */}
                      <div className="flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px] lg:hidden">
                        <button
                          className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                          onClick={() =>
                            setQuantityCount((prev) =>
                              prev > 1 ? prev - 1 : 1
                            )
                          }
                        >
                          <Minus className="w-4" />
                        </button>
                        <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                          {quantityCount}
                        </span>
                        <button
                          className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                          onClick={() => setQuantityCount((prev) => prev + 1)}
                        >
                          <Plus className="w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info section */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-1/2 block">
                        <p className="text-sm text-customBrown">
                          Michelle Tyres
                        </p>
                        <p className="text-base text-customBrown">20,000.00</p>

                        {/* In Stock + Quantity on desktop */}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-[#15B70D]">
                            In Stock
                          </span>

                          {/* Desktop: quantity below "In Stock" */}
                          <div className="hidden lg:flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px]">
                            <button
                              className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                              onClick={() =>
                                setQuantityCount((prev) =>
                                  prev > 1 ? prev - 1 : 1
                                )
                              }
                            >
                              <Minus className="w-4" />
                            </button>
                            <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                              {quantityCount}
                            </span>
                            <button
                              className="flex-1 w-full text-center active:bg-[#b5b4b4]"
                              onClick={() =>
                                setQuantityCount((prev) => prev + 1)
                              }
                            >
                              <Plus className="w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove (mobile only) */}
                      <div className="flex gap-2 items-center lg:hidden cursor-pointer">
                        <X className="w-4" />
                        <p className="text-sm text-customGray3">Remove</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell">20,000</td>
                <td className="hidden lg:table-cell">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <X className="w-4" />
                    <p className="text-sm text-customGray3">Remove</p>
                  </div>
                </td>
              </tr>
            </table>
            <div className="flex items-center gap-2 py-8 lg:pt-12 lg:pb-0">
              <img src="/arrowleft.svg" alt="" />
              <p className="text-sm text-primary">Continue Shopping</p>
            </div>
            <Link to="/checkout">
              <button className="bg-primary py-4 text-white text-sm rounded w-full lg:hidden">
                Proceed to checkout
              </button>
            </Link>
          </div>
          <div className="lg:w-1/3 bg-white p-5 lg:rounded-lg">
            <div className="hidden lg:block">
              <h2 className="text-sm font-semibold text-customBrown pb-1 border-b">
                Delivery
              </h2>
              <div>
                <form action="" className="pt-6">
                  <div className="flex flex-col border-b pb-6 mb-6">
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
                  <label
                    htmlFor="instruction"
                    className="text-sm font-semibold text-customBrown"
                  >
                    Instruction on Delivery
                  </label>
                  <textarea
                    name="instruction"
                    id=""
                    className="w-full border p-4 h-[100px] rounded-lg mt-3"
                    placeholder="e.g. Please ensure the part is compatible with a 2016 Toyota Corolla, model LE"
                  ></textarea>
                  <div className="relative pt-3 pb-5 border-b">
                    <img
                      src="/address-marker-outline.svg"
                      alt=""
                      className="w-4 absolute left-4 top-7"
                    />
                    <input
                      type="text"
                      placeholder="Enter Code Here"
                      className="border h-12 px-10 w-full rounded-lg bg-[#FFF8EE] text-base"
                    />
                    <span className="absolute right-4 bottom-9 text-xs text-customGold">
                      APPLY COUPON
                    </span>
                  </div>
                  <div className="space-y-2 pt-6">
                    <div className="flex justify-between text-sm font-semibold text-customBrown pb-1 border-b">
                      <h3>Order Summary</h3>
                      <p>3 Items</p>
                    </div>
                    <div className="flex justify-between pt-2">
                      <p className="text-sm text-customGray3">Subtotal:</p>
                      <span className="text-sm font-semibold text-customBrown">
                        60,000.00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3">Discount:</p>
                      <span className="text-xs text-customBrown font-meduim">
                        (20%) -20,000.00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3 flex gap-2 items-center">
                        Discount
                        <span className="text-[10px] text-primary font-meduim flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
                          standard
                          <img
                            src="/standardarrow.svg"
                            alt="Discount Type Arrow"
                          />
                        </span>
                      </p>
                      <span className="text-xs text-customBrown font-meduim">
                        2,000.00
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-customBrown pb-2 border-b">
                      <h3>Total</h3>
                      <p>60,000.00</p>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <button className="bg-primary py-4 text-white text-sm rounded w-full">
                      Proceed to checkout
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
