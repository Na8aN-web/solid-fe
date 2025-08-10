import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DeliveryType | null>(null);

  enum DeliveryType {
    FastDelivery = "fast-delivery",
    StandardDelivery = "standard-delivery",
  }

  const deliveryTypes = [
    {
      type: DeliveryType.FastDelivery,
      label: "Fast Delivery",
      price: "7,700.00",
      description: "To be delivered Tomorrow 03-24",
      recommendation: "Recommended",
    },
    {
      type: DeliveryType.StandardDelivery,
      label: "Standard Delivery",
      price: "1,700.00",
      description: "To be delivered between Fri 03 -10 Dec 24",
    },
  ];

  const handleAccountTypeSelect = (type: DeliveryType) => {
    setSelectedType(type);
  };

  const ProductReview = () => (
    <div className="pt-8">
      <h3 className="text-sm font-semibold text-customGray1 pb-3">
        Product Details & Review
      </h3>
      <div className="border-b lg:border lg:rounded-xl lg:p-5 border-[#D9D9D9] pb-4 mb-4 w-full">
        <div className="flex gap-6 items-center">
          <div className="lg:border lg:rounded-2xl lg:px-5 py-3">
            <img src="/tyres.svg" alt="" className="w-[100px]" />
          </div>
          <div className="lg:flex lg:justify-between w-full space-y-1">
            <div className="space-y-1">
              <p className="text-xs text-customBrown font-normal">
                Michellene Tyres
              </p>
              <p className="text-xs text-customGray3 hidden lg:block">
                Seller: Solid Spare Parts
              </p>
              <p className="text-xs text-customGray3 hidden lg:block">
                Delivery fee:{" "}
                <span className="text-[#15B70D] font-semibold">Free</span>
              </p>
              <p className="text-sm font-semibold text-customBrown">
                60,000.00 <span className="text-customGray3">per item</span>
              </p>
            </div>
            <div className="flex gap-1 items-center lg:flex-col lg:gap-6">
              <p className="text-xs lg:text-sm text-customGray3">Quantity: 4</p>
              <p className="text-xs lg:text-base lg:text-primary text-customGray3 font-bold">
                (240,000.00)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b lg:border lg:rounded-xl lg:p-5 border-[#D9D9D9] pb-4 mb-4 w-full">
        <div className="flex gap-6 items-center">
          <div className="lg:border lg:rounded-2xl lg:px-5 py-3">
            <img src="/tyres.svg" alt="" className="w-[100px]" />
          </div>
          <div className="lg:flex lg:justify-between w-full space-y-1">
            <div className="space-y-1">
              <p className="text-xs text-customBrown font-normal">
                Michellene Tyres
              </p>
              <p className="text-xs text-customGray3 hidden lg:block">
                Seller: Solid Spare Parts
              </p>
              <p className="text-xs text-customGray3 hidden lg:block">
                Delivery fee:{" "}
                <span className="text-[#15B70D] font-semibold">Free</span>
              </p>
              <p className="text-sm font-semibold text-customBrown">
                60,000.00 <span className="text-customGray3">per item</span>
              </p>
            </div>
            <div className="flex gap-1 items-center lg:flex-col lg:gap-6">
              <p className="text-xs lg:text-sm text-customGray3">Quantity: 4</p>
              <p className="text-xs lg:text-base lg:text-primary text-customGray3 font-bold">
                (240,000.00)
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-base text-primary font-semibold text-center">
        Modify Cart
      </p>
    </div>
  );

  return (
    <div>
      <section className="p-5 sm:px-8 lg:px-10 lg:bg-[#F5F5F5]">
        <h2 className="text-xl text-customBrown font-semibold lg:hidden">
          Checkout
        </h2>
        <Link
          to="/cart"
          className="hidden lg:flex items-center gap-2 pb-6 pt-2"
        >
          <img src="/arrowleft.svg" alt="" />
          <p className="text-sm text-primary font-semibold">Back to cart</p>
        </Link>
        <section className="lg:flex lg:gap-5 lg:pb-12">
          {/* Payment details and review Desktop*/}
          <section className="bg-white w-full lg:w-2/3 lg:px-10 self-start lg:pb-8 lg:rounded-lg lg:border lg:border-[#D9D9D9]">
            <div className="hidden lg:block">
              <ProductReview />
            </div>
            {/* Delivery Address */}
            <div className="pt-6">
              <h3 className="text-sm font-semibold text-customGray1 pb-3">
                Delivery Address
              </h3>
              <div className="shadow-[0_4px_12px_#00000026] rounded-lg p-5 flex justify-center items-center flex-col text-center space-y-3">
                <img src="/checkoutaddress.svg" alt="" />
                <p className="text-base text-customBrown">No address saved</p>
                <p className="text-xs text-customGray3">
                  Add an address to specify your delivery address
                </p>
                <Link to="/add-address" className="w-full">
                  <button className="bg-primary rounded p-4 w-full text-base text-white font-normal">
                    Add delivery address
                  </button>
                </Link>
              </div>
            </div>
            {/* Delivery Shipping */}
            <div className="pt-8">
              <h3 className="text-sm text-customGray1 pb-3 font-semibold">
                Delivery Shipping
              </h3>
              <div className="space-y-4">
                {deliveryTypes.map((deliveryType) => (
                  <div
                    key={deliveryType.type}
                    className={`
        border rounded-lg p-4 cursor-pointer transition-all duration-300
        ${
          selectedType === deliveryType.type
            ? "border-[#003366]"
            : "border-[#E3E6EA] hover:border-blue-300"
        }
      `}
                    onClick={() => handleAccountTypeSelect(deliveryType.type)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3
            ${
              selectedType === deliveryType.type
                ? "border-[#003366] bg-[#003366] text-white"
                : "border-[#E3E6EA]"
            }
          `}
                      >
                        {selectedType === deliveryType.type && (
                          <span className="text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex justify-between w-full">
                        <h3
                          className={`font-normal text-sm ${
                            selectedType === deliveryType.type
                              ? "text-customBrown"
                              : "text-[#5E5E5E]"
                          }
          `}
                        >
                          {deliveryType.price}{" "}
                          <span className="inline-block bg-gray-200 h-2 w-2 mb-[2px] rounded-full"></span>{" "}
                          {deliveryType.label}
                        </h3>
                        {deliveryType.recommendation && (
                          <div className="px-2 py-[5px] rounded-md bg-[#BFCCD8]">
                            <p className="text-xs text-primary">
                              {deliveryType.recommendation}
                            </p>
                          </div>
                        )}
                        {/* <p className="text-xs text-primary px-2 py-[5px] rounded-md bg-[#BFCCD8]">{deliveryType.recommendation}</p> */}
                      </div>
                    </div>
                    <p
                      className={`text-[#5E5E5E] text-sm mt-2 pl-8  ${
                        selectedType === deliveryType.type
                          ? "text-[#003366]"
                          : "text-[#5E5E5E]"
                      }
          `}
                    >
                      {deliveryType.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="lg:w-1/3 bg-white lg:px-8 lg:pb-8 self-start lg:rounded-lg">
            <div className="pt-6">
              <label
                htmlFor="InstructDelivery"
                className="leading-8 text-sm text-customGray1 pb-3 font-semibold"
              >
                Instruction on Delivery
              </label>
              <input
                name="InstructDelivery"
                type="text"
                placeholder="e.g. Please ensure the part is compatible with a 2016 Toyota Corolla, model LE"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* Payment Methods */}
            <div className="pt-8">
              <h3 className="text-sm text-customGray1 pb-2 font-semibold">
                Payment Methods
              </h3>
              <p className="text-sm text-customGray3 pb-3">
                Select a payment method
              </p>
              <div className="flex justify-between gap-4">
                <div className="flex-1 border px-5 py-7 rounded-xl">
                  <img src="/paymentcard.svg" alt="" />
                  <p className="text-sm text-customGray3 pt-2">
                    Pay with Debit card/ Credit card
                  </p>
                </div>
                <div className="flex-1 border px-5 py-7 rounded-xl">
                  <img src="/bank.svg" alt="" />
                  <p className="text-sm text-customGray3 pt-2">
                    Pay with Bank transfer
                  </p>
                </div>
              </div>
            </div>
            {/* Card Details */}
            <div className="pt-8 space-y-6 pb-2 hidden lg:block">
              <h3 className="text-customGray3 text-sm">Card Details</h3>
              <input
                name="card-name"
                type="text"
                placeholder="Card Name e.g Marvellous Calebs"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                name="card-details"
                type="number"
                placeholder="Enter card details"
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="sm:flex sm:gap-6 justify-between w-full">
                <input
                  name="expdate"
                  type="number"
                  placeholder="Expiry card details"
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  name="cvv"
                  type="number"
                  placeholder="CVV"
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <p className="text-customGray2 text-sm">
                Payments are secure and encrypted
              </p>
            </div>
            {/* Payment details and review Mobile*/}
            <div className="lg:hidden">
              <ProductReview />
            </div>
            {/* Payment details price */}
            <div>
              <div className="space-y-2 pt-6">
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
                      <img src="/standardarrow.svg" alt="Discount Type Arrow" />
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
              <button className="bg-primary py-4 text-white text-sm rounded w-full">
                Pay 60,000.00
              </button>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Checkout;
