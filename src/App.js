import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import BracketForm from "./pages/BracketForm";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./contexts/AuthContexts";

function App() {
  const { user } = useAuth();

  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<BracketForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
