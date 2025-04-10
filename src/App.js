import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import BracketCreator from "./pages/BracketCreator";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<BracketCreator />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
