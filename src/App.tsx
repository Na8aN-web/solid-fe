import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
<<<<<<< HEAD
import HomeGuest from "./pages/HomeGuest";
=======
import HomeGuest from "./pages/private/home/HomeGuest";
//example import, import Home from "./pages/Home";
>>>>>>> 5fb8cb3 (moved images to public folder)

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
