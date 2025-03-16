import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import Layout from "./Layout";
import HomeGuest from "./pages/private/home/HomeGuest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<HomeGuest />} />
      </Route>
    </Routes>
  );
}

export default App;
