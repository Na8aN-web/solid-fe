// src/components/layout/Header.jsx
import React, { useState } from 'react';
import Navbar from './components/LandingNavbar';
import HeroSection from './components/Hero';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="w-full">
      {/* Top Navigation Bar */}
      <Navbar />
      <HeroSection />
    </header>
  );
};

export default Header;