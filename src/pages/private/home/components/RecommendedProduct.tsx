import React from "react";
import ProductCard from "./ProductCard";

const RecommendedProduct = () => {
  const dummyProducts = Array(6).fill(null);
  return (
    <div className="bg-white px-4 md:px-5 py-2 mx-5 rounded hidden lg:block">
      <div className="flex gap-0 items-center">
        <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
        <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
          Customers Who Bought This Also Bought These
        </h2>
      </div>
      <div className="flex justify-between gap-4 py-4">
        {dummyProducts.map((_, index) => (
          <ProductCard
          productId={`dummy-product-${index}`} 
            key={index}
            image="/shock-absorber.svg"
            title="Shock Absorber"
            category="PERFORMANCE PARTS"
            price="N60,000.00"
            oldPrice="N80,000.00"
            discount="-18%"
            numReviews={88}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
