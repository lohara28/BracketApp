import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import BracketForm from "./pages/BracketForm";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<BracketForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
