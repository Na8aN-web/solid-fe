import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import Layout from "./Layout";
import HomeGuest from "./pages/private/home/HomeGuest";
import AccountTypeSelection from "./pages/authentication/AccountType";
import SignupScreen from "./pages/authentication/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<HomeGuest />} />

        {/* Authentication */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
