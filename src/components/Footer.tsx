import React from "react";
import footerLogo from "../images/solid-footer-logo.svg";
import facebook from "../images/facebook.svg";
import youtube from "../images/youtube.svg";
import twitter from "../images/twitter.svg";
import insta from "../images/instagram.svg";
import tiktok from "../images/tiktok.svg";
import messageIcon from "../images/message-icon.svg";
import mastercard from "../images/mastercard.svg";
import visa from "../images/visa.svg";
import dhl from "../images/dhl.svg";
import takeMoney from "../images/take-my-money.svg";
import apple from "../images/apple-fill.svg";
import googlePlay from "../images/google-play.svg";
import addressMarker from "../images/address-marker-outline.svg";
import phone from "../images/tabler_phone.svg";
import mail from "../images/tabler_mail.svg";
import whiteFrame from "../images/white-frame.svg";

const Footer = () => {
  return (
    <div>
      <section className="bg-customDark flex justify-between px-10 py-14 h-96 w-full">
        <div className="flex flex-col justify-between">
          <img src={footerLogo} alt="solid-logo" />
          <div>
            <h3 className="text-white font-semibold text-base pb-6">
              Join Us On
            </h3>
            <div className="flex gap-6">
              <img src={facebook} alt="facebook" className="w-7" />
              <img src={youtube} alt="youtube" className="w-7" />
              <img src={twitter} alt="twitter" className="w-7" />
              <img src={insta} alt="insta" className="w-7" />
              <img src={tiktok} alt="tiktok" className="w-7" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold text-base pb-6">
              Get The Latest From Us
            </h3>
            <p className="text-white font-normal text-sm pb-3">
              Subscribe to our newsletter to get updates on our latest offres
            </p>
            <div>
              <div className="flex gap-6 items-center">
                <div className="relative">
                  <img
                    src={messageIcon}
                    alt="message-icon"
                    className="absolute top-4 left-5 w-5"
                  />
                  <input
                    type="text"
                    className="border h-12 w-96 p-2 rounded-lg text-sm pl-12"
                    placeholder="Enter your email address"
                  />
                </div>
                <button className="bg-primary text-white text-base font-normal rounded-lg w-24 h-14">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base pb-6">
              Payment Methods & Delivery Partners
            </h3>
            <div className="flex gap-6">
              <img src={mastercard} alt="mastercard" className="w-7" />
              <img src={visa} alt="visa" className="w-7" />
              <img src={dhl} alt="dhl" className="w-7" />
              <img src={takeMoney} alt="take-money" className="w-7" />
              <img src={tiktok} alt="tiktok" className="w-7" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-base pb-6">
            Download The App
          </h3>
          <p className="text-white font-normal text-sm pb-8">
            Get a better experience with our App
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <img src={apple} alt="apple" />
              <div>
                <p className="text-white text-xs">Download on the</p>
                <p className="text-white text-xl font-semibold">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={googlePlay} alt="google-play" />
              <div>
                <p className="text-white text-xs">GET IT ON</p>
                <p className="text-white text-xl font-semibold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-customBrown flex justify-between px-10 py-14 w-full">
        <div className="w-full max-w-xs">
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">
              Contact Us
            </h3>
            <span className="bg-customGold rounded block w-12 h-[4px]"></span>
          </div>
          <p className="text-white font-normal text-sm pb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex gap-3 items-start">
            <img src={addressMarker} alt="address-marker" />
            <p className="text-white font-normal text-sm pb-3">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <img src={phone} alt="phone" />
            <p className="text-white font-normal text-sm pb-3">
              08012300000, 070123456789
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <img src={mail} alt="mail" />
            <p className="text-white font-normal text-sm pb-3">
              tanya.hill@example.com
            </p>
          </div>
        </div>
        <div>
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">
              Information
            </h3>
            <span className="bg-customGold rounded block w-12 h-[4px]"></span>
          </div>
          <p className="text-customLight font-normal text-sm pb-3">About Us</p>
          <p className="text-customLight font-normal text-sm pb-3">
            Customer Service
          </p>
          <p className="text-customLight font-normal text-sm pb-3">
            Privacy Policy
          </p>
          <p className="text-customLight font-normal text-sm pb-3">
            Contact Us
          </p>
        </div>
        <div>
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">Support</h3>
            <span className="bg-customGold rounded block w-12 h-[4px]"></span>
          </div>
          <p className="text-customLight font-normal text-sm pb-3">
            Help Center
          </p>
          <p className="text-customLight font-normal text-sm pb-3">FAQs</p>
          <p className="text-customLight font-normal text-sm pb-3">
            Terms of Service
          </p>
          <p className="text-customLight font-normal text-sm pb-3">
            Privacy Policy
          </p>
        </div>
        <div>
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">
              Quick Links
            </h3>
            <span className="bg-customGold rounded block w-12 h-[4px]"></span>
          </div>
          <p className="text-customLight font-normal text-sm pb-3">About Us</p>
          <p className="text-customLight font-normal text-sm pb-3">Products</p>
          <p className="text-customLight font-normal text-sm pb-3">
            How It Work
          </p>
          <p className="text-customLight font-normal text-sm pb-3">Blog</p>
        </div>
        <div>
          <div className="pb-6">
            <h3 className="text-white font-semibold text-base pb-1">Gallery</h3>
            <span className="bg-customGold rounded block w-12 h-[4px]"></span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <img src={whiteFrame} alt="white-frame" className="w-10" />
            <img src={whiteFrame} alt="white-frame" className="w-10" />
            <img src={whiteFrame} alt="white-frame" className="w-10" />
            <img src={whiteFrame} alt="white-frame" className="w-10" />
            <img src={whiteFrame} alt="white-frame" className="w-10" />
            <img src={whiteFrame} alt="white-frame" className="w-10" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
