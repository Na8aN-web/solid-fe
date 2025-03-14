import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomeGuest from "./pages/HomeGuest";
//example import, import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeGuest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;