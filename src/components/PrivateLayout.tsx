import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const PrivateLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateLayout