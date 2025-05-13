// pages/products.tsx
import { useState } from "react";
import ProductPageLayout from "./ProductPageLayout";
import { productData } from "./data";
import Navbar from "../home/components/LandingNavbar";
import BrandNav from "../../private/home/components/BrandNav";

const ProductPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="hidden md:block">
        <BrandNav isMenuOpen={isMenuOpen} />
      </div>
      <ProductPageLayout products={productData} />
    </div>
  );
};

export default ProductPage;
