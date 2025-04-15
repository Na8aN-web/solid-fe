import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import HomeGuest from "./pages/private/home/HomeGuest";
import AccountTypeSelection from "./pages/authentication/AccountType";
import SignupScreen from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import RecoverPassword from "./pages/authentication/RecoverPassword";
import CreateNewPassword from "./pages/authentication/CreateNewPassword";
import EnterCode from "./pages/authentication/EnterCode";
import Product from "./pages/public/products/Product";
import About from "./pages/public/about/About";
import ProductDetails from "./pages/private/productdetails/ProductDetails";
import Footer from "./components/Footer";
import Blog from "./pages/public/blog/Blog";
import ShoppingCart from "./pages/private/shoppingcart/ShoppingCart";
import AddAddress from "./pages/private/shoppingcart/AddAddress";
import ChangeAddress from "./pages/private/shoppingcart/ChangeAddress";
import Checkout from "./pages/private/shoppingcart/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeGuest />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />

        {/* Authentication */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/change-address" element={<ChangeAddress />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
