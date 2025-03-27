import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import Layout from "./Layout";
import HomeGuest from "./pages/private/home/HomeGuest";
import AccountTypeSelection from "./pages/authentication/AccountType";
import SignupScreen from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import RecoverPassword from "./pages/authentication/RecoverPassword";
import CreateNewPassword from "./pages/authentication/CreateNewPassword";
import EnterCode from "./pages/authentication/EnterCode";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<HomeGuest />} />

        {/* Authentication */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/enter-code" element={<EnterCode />} />
      </Route>
    </Routes>
  );
}

export default App;
