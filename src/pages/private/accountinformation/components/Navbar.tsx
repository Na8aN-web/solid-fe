import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";

interface NavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);


  const getInitial = (name: string | undefined | null): string => {
    if (!name) {
      return '';
    }
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <div className="relative bg-white">
      <header>
        <div className="flex items-center py-6 px-5 w-full relative lg:gap-20 lg:border-b lg:pb-9 lg:pt-9">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="flex justify-between">
              <div className="flex gap-4">
                {isMenuOpen ? (
                  <img
                    src="/cancel.svg"
                    alt="close"
                    className="w-4 lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />
                ) : (
                  <img
                    src="/hamburger.svg"
                    alt="open"
                    className="w-6 lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />
                )}
                <Link to="/home">
                  <img
                    src="/Frame 47.svg"
                    alt="solid-logo"
                    className="w-32 lg:w-44"
                  />
                </Link>
              </div>
              <Link to="/cart">
                <img src="/cart.svg" alt="cart" className="w-8 lg:hidden" />
              </Link>
            </div>
            {/* mobile input */}
           
          </div>
          {/* desktop */}
          <div className="hidden lg:flex w-full">
            <div className="flex gap-4 w-full">
              <div className="flex w-full">
                <div className="flex justify-around items-center w-52 gap-1 h-12 px-2 border border-r-0 rounded-l-lg">
                  <p className="text-sm">All Categories</p>
                  <img src="/arrow-down.svg" alt="arrow-down" className="w-3" />
                </div>
                <div className="relative max-w-96 w-full">
                  <img
                    src="/search.svg"
                    alt="search"
                    className="absolute top-4 left-5 w-5"
                  />
                  <input
                    type="text"
                    className="border h-12 w-full p-2 rounded-r-lg text-sm pl-12"
                    placeholder="Search by part name or OEM number"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="border h-12 rounded-lg bg-primary text-white px-4 text-base font-semibold"
              >
                Search
              </button>
            </div>
            {/* User Options */}
            <div className="flex gap-4 items-center justify-end w-full">
              <div className="flex gap-1 items-center">
                <img src="/wishList.svg" alt="help" className="w-6" />
                <p className="text-sm">Wishlist</p>
              </div>
              <div className="flex gap-1 items-center">
                <img src="/help.svg" alt="help" className="w-6" />
                <select defaultValue="" name="" id="" className="text-sm">
                  <option value="">Help</option>
                </select>
              </div>
              <Link to="/cart">
                <div className="flex gap-1 items-center">
                  <img src="cart.svg" alt="cart" className="w-6" />
                  <p className="text-sm">My Cart</p>
                </div>
              </Link>
              <div className="flex gap-1 items-center">
                <div className="w-[40px] h-[40px] bg-[#E3E6EA] rounded-[200px] flex items-center justify-center">
                  <p className="text-base font-semibold text-customBrown">
                    {getInitial(isAuthenticated && user?.firstName)}
                  </p>
                </div>
                <img src="arrow-down.svg" alt="" className="w-4" />
              </div>
            </div>
          </div>
        </div>
        {/* mobile nav dropdown */}
        <section
          className={`fixed top-16 z-10 max-h-full pt-4 pb-40 overflow-y-auto bg-white w-full lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-10 opacity-0 invisible"
          }`}
        >
          <div className="py-5 px-5">
            <div className="flex gap-3 items-center">
              <div className="w-[40px] h-[40px] bg-[#E3E6EA] rounded-[200px] flex items-center justify-center">
                <p className="text-base font-semibold text-customBrown">
                  {getInitial(user?.firstName)}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-customDark text-base font-semibold">
                  {user?.firstName}
                </p>
                <p className="text-xs text-customGray3">{user?.email}</p>
              </div>
            </div>
          </div>
          {/* profile */}
          <div>
            <ul className="flex flex-col items-center gap-3 border-t border-b w-full py-4 px-4">
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/profile.svg" alt="person" className="w-5 h-5" />
                  <span className="text-sm font-normal text-shadeGray">
                    Profile
                  </span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/orders.svg" alt="order" className="w-5 h-5" />
                  <span className="text-sm font-normal text-shadeGray">
                    Orders
                  </span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img
                    src="/favourite.svg"
                    alt="favourite"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-normal text-shadeGray">
                    Sved Items
                  </span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img
                    src="/track-orders.svg"
                    alt="order"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-normal text-shadeGray">
                    Track Order
                  </span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/chat.svg" alt="chat" className="w-5 h-5" />
                  <span className="text-sm font-normal text-shadeGray">
                    Messages
                  </span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
            </ul>
          </div>
          {/* categories */}
          <div className="px-5 py-5">
            <h2 className="text-customBrown font-semibold text-base pb-5">
              Categories
            </h2>
            <ul className="flex flex-col justify-around items-start gap-3 h-inherit text-gray-500 text-sm font-normal">
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/game-icons_race-car.svg" alt="body-part" />
                  <span>Body Parts</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/iconoir_electronics-chip.svg" alt="electronics" />
                  <span>Electronics</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="performance-part.svg" alt="performance-part" />
                  <span>Performance Parts</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/repair-parts.svg" alt="repair-parts" />
                  <span>Repairs Parts</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/wheels-tyres.svg" alt="wheels-tyres" />
                  <span>Wheels & Tyres</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/tools-equip.png" alt="tools-equip" />
                  <span>Tools & Equipments</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/steering.svg" alt="steering" />
                  <span>Steering Systems</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/filter.svg" alt="filters" />
                  <span>Filters</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/cooling-heat.svg" alt="cooling-heat" />
                  <span>Cooling & Heating Systems</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src="/air-conditioner.svg" alt="air-condition" />
                  <span>Air Conditioning</span>
                </div>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="w-4 h-4"
                />
              </li>
              <li>See More +</li>
            </ul>
          </div>
          {/* more options */}
          <div className="px-5 py-5">
            <div className="block pb-6">
              <h2 className="text-customBrown font-semibold text-base pb-1">
                Support
              </h2>
              <span className="bg-customGold rounded block w-12 h-[4px]"></span>
            </div>
            <p className="text-gray-500 font-normal text-sm pb-3">
              Help Center
            </p>
            <p className="text-gray-500 font-normal text-sm pb-3">FAQs</p>
            <p className="text-gray-500 font-normal text-sm pb-3">
              Terms of Service
            </p>
            <p className="text-gray-500 font-normal text-sm pb-3">
              Privacy Policy
            </p>
          </div>
          {/* contact us */}
          <div className="w-full max-w-xs px-5 py-5">
            <div className="pb-6">
              <h2 className="text-customBrown font-semibold text-base pb-1">
                Contact Us
              </h2>
              <span className="bg-customGold rounded block w-12 h-[4px]"></span>
            </div>
            <p className="text-gray-500 text-sm font-normal pb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex gap-3 items-start">
              <img src="/address-marker-outline.svg" alt="address-marker" />
              <p className="text-gray-500 font-normal text-sm pb-3">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <img src="/tabler_phone.svg" alt="phone" />
              <p className="text-gray-500 font-normal text-sm pb-3">
                08012300000, 070123456789
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <img src="/tabler_mail.svg" alt="mail" />
              <p className="text-gray-500 font-normal text-sm pb-3">
                tanya.hill@example.com
              </p>
            </div>
          </div>
          {/* latest offers */}
          <div className="flex flex-col justify-between px-5 py-5">
            <div>
              <h3 className="text-customBrown font-semibold text-base pb-6">
                Get The Latest From Us
              </h3>
              <p className="text-sm font-normal text-shadeGray pb-3">
                Subscribe to our newsletter to get updates on our latest offres
              </p>
              <div>
                <div className="flex gap-2 items-center w-full justify-between">
                  <div className="relative w-full">
                    <img
                      src="/message-icon.svg"
                      alt="message-icon"
                      className="absolute top-4 left-5 w-5"
                    />
                    <input
                      type="text"
                      className="border h-12 p-2 w-full rounded-lg text-sm pl-12"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button className="bg-primary text-white text-base font-normal rounded-lg w-32 h-12">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* join us */}
          <div className="px-5 py-2">
            <h2 className="text-customBrown font-semibold text-base pb-6">
              Join Us On
            </h2>
            <div className="flex gap-6">
              <img src="/facebook-dark.svg" alt="facebook" className="w-auto" />
              <img src="/youtube-dark.svg" alt="youtube" className="w-auto" />
              <img src="/twitter-dark.svg" alt="twitter" className="w-auto" />
              <img src="/instagram-dark.svg" alt="insta" className="w-auto" />
              <img src="/tiktok-dark.svg" alt="tiktok" className="w-auto" />
            </div>
          </div>
        </section>
        <section className="flex justify-evenly items-center w-full bg-white fixed bottom-0 py-4 z-10 lg:hidden">
          <div className="flex flex-col items-center">
            <img src="/home.svg" alt="home" className="w-auto h-5" />
            <p className="text-sm">Home</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/categories.svg" alt="category" className="w-auto h-5" />
            <p className="text-sm">Categories</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/you.svg" alt="you" className="w-auto h-5" />
            <p className="text-sm">My Profile</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/helpp.svg" alt="help" className="w-auto h-5" />
            <p className="text-sm">Help</p>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Navbar;
