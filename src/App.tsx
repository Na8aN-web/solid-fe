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
import ProductDetails from "./pages/private/productdetails/ProductDetails";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/private/shoppingcart/ShoppingCart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeGuest />} />
        <Route path="/products" element={<Product />} />

        {/* Authentication */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
