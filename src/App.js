import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import BracketForm from "./pages/BracketForm";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./contexts/AuthContexts";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  const hideNavbarPaths = ["/"]; // paths where Navbar should be hidden

  const shouldShowNavbar = user && !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
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
