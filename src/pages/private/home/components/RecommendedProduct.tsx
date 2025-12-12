import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../../../services/products/types";

interface RecommendedProductProps {
  relatedProducts?: Product[] | any;
}

const RecommendedProduct: React.FC<RecommendedProductProps> = ({ relatedProducts = [] }) => {

  const productsArray = React.useMemo(() => {
    if (!relatedProducts) return [];

    // If it's an object with products property
    if (typeof relatedProducts === 'object' && relatedProducts.products && Array.isArray(relatedProducts.products)) {
      return relatedProducts.products;
    }

    // If it's already an array
    if (Array.isArray(relatedProducts)) {
      return relatedProducts;
    }

    // Fallback for unexpected formats
    console.warn('Unexpected relatedProducts format:', relatedProducts);
    return [];
  }, [relatedProducts]);

  // If no related products, don't show the section
  if (!productsArray || productsArray.length === 0) {
    return null;
  }

  return (
    <div className="bg-white px-4 md:px-5 py-2 mx-5 rounded hidden lg:block">
      <div className="flex gap-0 items-center">
        <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
        <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
          Customers Who Bought This Also Bought These
        </h2>
      </div>
      <div className="flex justify-between gap-4 py-4">
         {productsArray.slice(0, 6).map((product: { _id: string; image: string; name: string; categoryName: string; displayPrice: number; regularPrice: any; numReviews: number; rating: number; }, index: any) => {
          const productId = product._id || `dummy-${index}`;
          const image = product.image || "/shock-absorber.svg";
          const name = product.name || "Product Name";
          const category = product.categoryName || "CATEGORY";
          const salesPrice = product.displayPrice || 0;
          const regularPrice = product.regularPrice;
          const discount = regularPrice && salesPrice 
            ? Math.round(((regularPrice - salesPrice) / regularPrice) * 100)
            : undefined;
          const numReviews = product.numReviews || 0;
          const rating = product.rating || 0;

          return (
            <ProductCard
              key={productId}
              productId={productId}
              image={image}
              title={name}
              category={category}
              price={`₦${salesPrice.toLocaleString()}`}
              oldPrice={regularPrice ? `₦${regularPrice.toLocaleString()}` : undefined}
              discount={discount ? `-${discount}%` : undefined}
              numReviews={numReviews}
              rating={rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProduct;
