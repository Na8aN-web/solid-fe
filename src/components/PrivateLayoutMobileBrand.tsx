import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BrandNav from "./BrandNav";
import Footer from "./Footer";


const PrivateLayoutMobileBrand = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="hidden md:block">
        <BrandNav isMenuOpen={isMenuOpen} />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayoutMobileBrand;
