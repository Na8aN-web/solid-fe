import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./LandingNavbar";
// import Footer from "./Footer";


const PrivateLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default PrivateLayout