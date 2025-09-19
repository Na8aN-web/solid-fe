import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BrandNav from "./BrandNav";
// import Footer from "./Footer";


const PrivateLayoutBrand = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <BrandNav isMenuOpen={isMenuOpen} />
      <main><Outlet /></main>
      {/* <Footer /> */}
    </div>
  );
};

export default PrivateLayoutBrand;
