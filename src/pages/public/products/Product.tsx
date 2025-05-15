// pages/products.tsx
import { useState, useEffect } from "react";
import ProductPageLayout from "./ProductPageLayout";
import Navbar from "../home/components/LandingNavbar";
import BrandNav from "../../private/home/components/BrandNav";

const ProductPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="">
        <BrandNav isMenuOpen={isMenuOpen} />
      </div>
      <ProductPageLayout />
    </div>
  );
};

export default ProductPage;
