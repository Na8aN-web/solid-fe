import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/public/home/Home";
import HomeGuest from "./pages/private/home/HomeGuest";
import AccountTypeSelection from "./pages/authentication/AccountType";
import SignupScreen from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import RecoverPassword from "./pages/authentication/RecoverPassword";
import CreateNewPassword from "./pages/authentication/CreateNewPassword";
import EmailVerification from "./pages/authentication/EmailVerification";
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
import { SetStateAction, useEffect, useState } from "react";
import ContactUs from "./pages/public/contactus/ContactUs";
import RateReviewProduct from "./pages/private/accountinformation/components/rating/RateReviewProduct";
import AccountInformation from "./pages/private/accountinformation/components/AccountInformation";
import Store from "./pages/public/visitstore/Store";
import HelpCenter from "./pages/private/help/Help";
import KycForm from "./pages/private/accountinformation/kyc/KycForm";
import PrivateLayout from "./components/PrivateLayout";
import PrivateLayoutBrand from "./components/PrivateLayoutBrand";
import PrivateLayoutMobileBrand from "./components/PrivateLayoutMobileBrand";
import Layout from "./components/Layout";
import BusinessInfo from "./pages/private/accountinformation/kyc/BusinessInfo";

//Admin
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Products from "./pages/admin/products/Products";
import ProductCategory from "./pages/admin/products/productCategory/ProductCat";
import AddProduct from "./pages/admin/products/addProduct/AddProduct";
import Orders from "./pages/admin/orders/Orders";
import Users from "./pages/admin/users/Users";
import Inventory from "./pages/admin/inventory/Inventory";
import Transactions from "./pages/admin/transactions/Transactions";
import Manufacturers from "./pages/admin/manufacturers/Manufacturers";
import Partners from "./pages/admin/partners/Partners";
import Settings from "./pages/admin/settings/Settings";
import Inbox from "./pages/admin/inbox/Inbox";
import KycVerification from "./pages/admin/kycverification/KycVerification";
import ReportsAnalytics from "./pages/admin/report/Report";
import SendNotifications from "./pages/admin/notifications/SendNotifications";
import SentNotifications from "./pages/admin/notifications/SentNotifications";

import { useAppSelector } from "./store/hooks";
import { Navigate } from "react-router-dom";
import Order from "./pages/private/accountinformation/components/orders/Orders";


interface AdminRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; // New prop to restrict to full admins only
}

interface UnauthorizedAccessProps {
  userRole: string;
}

// Component to show when subdistributor tries to access admin-only pages
const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({
  userRole,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Access Restricted
      </h2>
      <p className="text-gray-600 mb-6">
        This page is only available to full administrators. As a{" "}
        {userRole === "SubDistributor" ? "Subdistributor" : userRole}, you don't
        have permission to access this resource.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => window.history.back()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={() => (window.location.href = "/admin/dashboard")}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
);

const EmailVerificationRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { emailVerification, user } = useAppSelector(state => state.auth);

  // If user is already verified, redirect to home
  if (user?.verified) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Hide footer for all admin routes
  const shouldShowFooter = !location.pathname.startsWith("/admin");

  const AdminRoute: React.FC<AdminRouteProps> = ({
    children,
    adminOnly = false,
  }) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" replace />;
    }

    // Check if user has admin access (either SubDistributor or full Admin)
    const isAdmin = user.role === "Admin" || user.role === "SuperAdmin";
    const isSubDistributor =
      user.role === "SubDistributor" || user.role === "sub-distributors";

    // If user doesn't have any admin access, redirect to home
    if (!isAdmin && !isSubDistributor) {
      return <Navigate to="/home" replace />;
    }

    // If this is an admin-only route and user is subdistributor, show unauthorized access
    if (adminOnly && !isAdmin) {
      return <UnauthorizedAccess userRole={user.role} />;
    }

    return <>{children}</>;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser)));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* layout for landing page without siging in */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        {/* Private layout without brands nav */}
        <Route element={<PrivateLayout />}>
          {/* Authentication */}
          <Route path="/account-type" element={<AccountTypeSelection />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route
            path="/verify-email"
            element={
              <EmailVerificationRoute>
                <EmailVerification />
              </EmailVerificationRoute>
            }
          />
          <Route path="/kyc-form" element={<KycForm />} />
          <Route path="/business-information" element={<BusinessInfo />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
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
        </Route>

        {/* Private layout with brands nav */}
        <Route element={<PrivateLayoutBrand />}>
          {/* Private Routes: This component is only accessible to authenticated users */}
          <Route path="/home" element={<HomeGuest />} />
          <Route path="/products" element={<Product />} />
          <Route path="/store" element={<Store />} />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
        </Route>



        {/* Private layout with brands nav */}
        <Route element={<PrivateLayoutMobileBrand />}>
          <Route path="/account-information" element={<Account />}>
            <Route index element={<AccountInformation />} />
            <Route path=":section" element={<AccountInformation />} />
            <Route path="rate-product" element={<RateReviewProduct />} />
          </Route>
          <Route path="/help" element={<HelpCenter />} />
        </Route>

        <Route
          path="/add-address"
          element={
            <PrivateRoute>
              <AddAddress />
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

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/change-address"
          element={
            <PrivateRoute>
              <ChangeAddress />
            </PrivateRoute>
          }
        />

        {/* Admin Routes - Accessible to both SubDistributors and full Admins */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product-category"
          element={
            <AdminRoute>
              <ProductCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/report"
          element={
            <AdminRoute>
              <ReportsAnalytics />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <AdminRoute>
              <Inventory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <AdminRoute>
              <Transactions />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/inbox"
          element={
            <AdminRoute>
              <Inbox />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/send-notifications"
          element={
            <AdminRoute>
              <SendNotifications />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sent-notifications"
          element={
            <AdminRoute>
              <SentNotifications />
            </AdminRoute>
          }
        />
        
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/help" element={<HelpCenter />} />
        
        {/* Admin-Only Routes - Restricted from SubDistributors */}
        <Route
          path="/admin/manufacturers"
          element={
            <AdminRoute adminOnly={true}>
              <Manufacturers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <AdminRoute adminOnly={true}>
              <Partners />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/kyc-verification"
          element={
            <AdminRoute adminOnly={true}>
              <KycVerification />
            </AdminRoute>
          }
        />

        {/* Redirect /admin to dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
