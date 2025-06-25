import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import ProductDetails from "./pages/public/products/productdetails/ProductDetails";
import Footer from "./components/Footer";
import Blog from "./pages/public/blog/Blog";
import ShoppingCart from "./pages/private/shoppingcart/ShoppingCart";
import AddAddress from "./pages/private/shoppingcart/AddAddress";
import ChangeAddress from "./pages/private/shoppingcart/ChangeAddress";
import Account from "./pages/private/accountinformation/Account";
import Checkout from "./pages/private/shoppingcart/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import { useAppDispatch } from "./store/hooks";
import { setUser, setAuthenticated } from "./store/slices/authSlice";
import { useEffect } from "react";
import ContactUs from "./pages/public/contactus/ContactUs";
import RateReviewProduct from "./pages/private/accountinformation/components/rating/RateReviewProduct";
import AccountInformation from "./pages/private/accountinformation/components/AccountInformation";
import Store from "./pages/public/visitstore/Store";
import HelpCenter from "./pages/private/help/Help";

//Admin
import Dashboard from "./pages/admin/dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const noFooterPaths = ["/admin/dashboard"]; // add more if needed
  const shouldShowFooter = !noFooterPaths.includes(location.pathname)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser)));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Private Routes: This component is only accessible to authenticated users */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeGuest />
            </PrivateRoute>
          }
        />

        {/* <Route path="/home" element={<HomeGuest />} /> */}
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/store" element={<Store />} />

        {/* Authentication */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/enter-code" element={<EnterCode />} />

        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <ShoppingCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-address"
          element={
            <PrivateRoute>
              <AddAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-address"
          element={
            <PrivateRoute>
              <ChangeAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        {/* <Route path="/account-information" element={<Account />} />
        <Route path="/rate-product" element={<RateReviewProduct />} /> */}
        <Route path="/account-information" element={<Account />}>
          <Route index element={<AccountInformation />} />
          <Route path="rate-product" element={<RateReviewProduct />} />
        </Route>

        <Route
          path="/help"
          element={
            <HelpCenter />
          }
        />

        {/* Admin*/}
        <Route
          path="/admin/dashboard"
          element={
            <Dashboard />
          }
        />
      </Routes>
       {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
