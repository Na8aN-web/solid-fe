import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    // TODO: Hook this to your backend API
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };
  return (
    <div>
      <section className="hidden bg-[#E6EBF0] lg:flex justify-between gap-8 px-10 py-14 h-96 w-full">
        <div className="flex flex-col justify-between">
          <img src={Logo} alt="solid-logo" className="w-[175px] h-[45px]" />
          <div>
            <h3 className="text-[#00152B] font-semibold text-base pb-6">
              Join Us On
            </h3>
            <div className="flex gap-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img src="/facebook.svg" alt="facebook" className="w-7" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <img src="/youtube.svg" alt="youtube" className="w-7" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img src="/twitter.svg" alt="twitter" className="w-7" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src="/instagram.svg" alt="instagram" className="w-7" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <img src="/tiktok.svg" alt="tiktok" className="w-7" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-[#00152B] font-semibold text-base pb-6">
              Get The Latest From Us
            </h3>
            <p className="text-[#002448] font-normal text-sm pb-3">
              Subscribe to our newsletter to get updates on our latest offres
            </p>
            <div>
              <div className="flex gap-4 items-center">
                <div className="relative w-full">
                  <img
                    src="/tabler_mail.svg"
                    alt="message-icon"
                    className="absolute top-4 left-5 w-5"
                  />
                  <input
                    type="email"
                    className="border h-12 w-full min-w-[330px] p-2 rounded-lg text-sm pl-12 bg-[#B0C0D0] placeholder:text-white text-white"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="bg-primary text-white text-sm font-normal rounded-lg h-12 px-6 m-auto"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS SECTION */}
          <div>
            <h3 className="text-[#00152B] font-semibold text-base pb-6">
              Payment Methods & Delivery Partners
            </h3>
            <div className="flex gap-6">
              <img
                src="/lineicons_mastercard.svg"
                alt="mastercard"
                className="w-8"
              />
              <img src="/cib_visa.svg" alt="visa" className="w-8" />
              <img src="/simple-icons_dhl.svg" alt="dhl" className="w-8" />
              <img
                src="/game-icons_take-my-money.svg"
                alt="take-money"
                className="w-8"
              />
              <img src="/tiktok.svg" alt="tiktok" className="w-8" />
            </div>
          </div>
        </div>

        {/* DOWNLOAD APP SECTION */}
        <div>
          <h3 className="text-[#00152B] font-semibold text-base pb-6">
            Download The App
          </h3>
          <p className="text-[#002448] font-normal text-sm pb-8">
            Get a better experience with our App
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <img src="/apple-fill.svg" alt="apple" />
              <div>
                <p className="text-[#335C85] text-xs">Download on the</p>
                <p className="text-[#002448] text-xl font-semibold">
                  App Store
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/google-play.svg" alt="google-play" />
              <div>
                <p className="text-[#335C85] text-xs">GET IT ON</p>
                <p className="text-[#002448] text-xl font-semibold">
                  Google Play
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#00152B] flex justify-between px-5 sm:px-10 pt-14 pb-28 lg:pb-14 w-full">
        {/* contact us */}
        <div className="hidden w-full max-w-xs lg:block">
          <div className="pb-6">
            <h3 className="text-[#FFFFFF] font-semibold text-base pb-1">
              Contact Us
            </h3>
            <span className="bg-[#8AA1B9] rounded block w-12 h-[4px]"></span>
          </div>
          <p className="text-[#F9F9F9] font-normal text-sm pb-6">
            Solid Spare Parts provides quality automotive parts for cars and
            trucks across Nigeria. Reach us today for bulk orders, delivery, or
            inquiries.
          </p>
          <div className="flex gap-3 items-start">
            <img src="/address-marker-outline.svg" alt="address-marker.svg" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=2972+Westheimer+Rd+Santa+Ana,+Illinois+85486"
              target="_blank"
              rel="noreferrer"
              className="text-[#C7C7CC] text-sm pb-3 hover:underline"
            >
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </a>
          </div>
          <div className="flex gap-3 items-start">
            <img src="/tabler_phone.svg" alt="phone.svg" />
            <p className="text-[#C7C7CC] font-normal text-sm pb-3">
              08012300000, 070123456789
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <img src="/tabler_mail.svg" alt="mail.svg" />
            <p className="text-[#C7C7CC] font-normal text-sm pb-3">
              tanya.hill@example.com
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <img src="/whatsapp-icon.svg" alt="whatsapp.svg" />
            <p className="text-[#C7C7CC] font-normal text-sm pb-3">
              +2348012300000
            </p>
          </div>
        </div>
        
          {/* INFORMATION */}
          <div>
          <h3 className="text-white font-semibold text-base pb-1 hidden sm:block">
            Information
          </h3>
          <span className="hidden sm:block bg-[#8AA1B9] rounded w-12 h-[4px] mb-6"></span>

          <Link to="/about" className="text-customLight text-sm pb-3 block">
            About Us
          </Link>
          <Link to="/contact" className="text-customLight text-sm pb-3 block">
            Contact Us
          </Link>
          <Link to="/how-it-works" className="text-customLight text-sm pb-3 block">
            How It Works
          </Link>
        </div>

        {/* support */}
        <div>
          <div className="hidden sm:block pb-6">
            <h3 className="text-white font-semibold text-base pb-1">Support</h3>
            <span className="bg-[#8AA1B9] rounded block w-12 h-[4px]"></span>
          </div>
           <Link to="/help" className="text-customLight text-sm pb-3 block">
            Help Center
          </Link>
          <p className="text-customLight font-normal text-sm pb-3">FAQs</p>
          <p className="text-customLight font-normal text-sm pb-3">
            Terms of Service
          </p>
          <p className="text-customLight font-normal text-sm pb-3">
            Privacy Policy
          </p>
        </div>
        {/* quick links */}
        <div>
          <div className="hidden sm:block pb-6">
            <h3 className="text-white font-semibold text-base pb-1">
              Quick Links
            </h3>
            <span className="bg-[#8AA1B9] rounded block w-12 h-[4px]"></span>
          </div>
         
          <Link to="/about" className="text-customLight text-sm pb-3 block">About Us</Link>
          <Link to="/products" className="text-customLight text-sm pb-3 block">Products</Link>
          <Link to="/blog" className="text-customLight text-sm pb-3 block">Blog</Link>
        </div>
        <div className="hidden md:block">
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">Gallery</h3>
            <span className="bg-[#8AA1B9] rounded block w-12 h-[4px]"></span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <img src="/frame-1.svg" alt="frame.svg" className="w-10" />
            <img src="/frame-2.svg" alt="frame.svg" className="w-10" />
            <img src="/frame-3.svg" alt="frame.svg" className="w-10" />
            <img src="/frame-4.svg" alt="frame.svg" className="w-10" />
            <img src="/frame-5.svg" alt="frame.svg" className="w-10" />
            <img src="/frame-6.svg" alt="frame.svg" className="w-10" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
