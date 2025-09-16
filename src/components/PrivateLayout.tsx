import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./LandingNavbar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};


const PrivateLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateLayout