import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import BracketForm from "./pages/BracketForm";
import About from "./pages/About";
import BracketDisplay from "./pages/BracketDisplay";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./contexts/AuthContexts";
import PrivateRoute from './components/PrivateRoute';

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

         {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><BracketForm /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/my-brackets" element={<PrivateRoute><BracketDisplay /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
