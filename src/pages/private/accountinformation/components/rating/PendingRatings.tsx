import { Star } from "lucide-react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  orderNo: string;
  deliveryDate: string;
  image: string;
}

const PendingRatings = () => {
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [rateColor, setRateColor] = useState<number | null>(null);
  
  // Sample product data - you can replace with your actual data
  const pendingProducts: Product[] = [
    {
      id: 1,
      name: "Michellene Tyres",
      orderNo: "2354857892089",
      deliveryDate: "10/12/2025",
      image: "/tyres.svg"
    }
    // Add more products as needed
  ];

  const handleRateProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowRatingForm(true);
  };

  const handleBackToList = () => {
    setShowRatingForm(false);
    setRating(null);
  };

  // Content for the pending ratings list view
  const renderPendingRatingsList = () => {
    return (
      <section>
        <h2 className="text-customBrown text-base font-medium md:text-xl pb-4">
          Pending Ratings
        </h2>
        {pendingProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 w-full h-[190px] md:h-[222px] flex items-center gap-4 md:gap-6"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-[140px] md:w-[160px] h-[134px] md:h-[153px]"
            />
            <div className="flex flex-col justify-between h-full max-h-[125px] md:max-h-[140px]">
              <h2 className="text-xs lg:text-xl text-customBrown font-normal lg:font-semibold">
                {product.name}
              </h2>
              <p className="font-meduim text-xs lg:text-base text-customGray3">
                Order no: {product.orderNo}
              </p>
              <p className="font-normal text-xs text-customGray3">
                Delivered on: {product.deliveryDate}
              </p>
              <button 
                className="border border-primary w-[136px] h-[44px] text-primary rounded-[4px] hover:bg-primary hover:text-white"
                onClick={() => handleRateProduct(product)}
              >
                Rate this Product
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  };

  // Content for the rating form view
  const renderRatingForm = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="pb-8">
        <section>
          <div className="flex items-center mb-4">
            <button 
              onClick={handleBackToList} 
              className="mr-4 text-primary flex items-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-customBrown text-base font-medium md:text-xl">
              Rate and Review Product
            </h2>
          </div>
          
          <div className="border rounded-lg">
            <div className="p-4 space-y-3 w-full h-[190px] md:h-[222px] flex items-center gap-4 md:gap-6 border-b">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-[140px] md:w-[160px] h-[134px] md:h-[153px]"
              />
              <div className="flex flex-col justify-between h-full max-h-[125px] md:max-h-[140px]">
                <h2 className="text-xs lg:text-xl text-customBrown font-normal lg:font-semibold">
                  {selectedProduct.name}
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
                        onMouseEnter={() => setRateColor(currentRate)}
                        onMouseLeave={() => setRateColor(null)}
                        className="cursor-pointer"
                      >
                        <Star
                          color={
                            currentRate <= (rateColor ?? rating ?? 0)
                              ? "gold"
                              : "lightgrey"
                          }
                          size={20}
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
              <form className="space-y-4">
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

  // Conditionally render either the pending ratings list or the rating form
  return showRatingForm ? renderRatingForm() : renderPendingRatingsList();
};

export default PendingRatings;