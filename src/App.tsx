import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/public/home/Home'
import Layout from "./Layout";
import HomeGuest from "./pages/HomeGuest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomeGuest />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;