import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Property from "./pages/Property";
import { useState } from "react";

import { useAuth } from "./context/AuthContext";

function App() {
  const [role, setRole] = useState("individual");

  const { user } = useAuth();
  const handleRole = (value) => {
    setRole(value);
  };

  return (
    <Router>
      <Navbar handleRole={handleRole} />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/property" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/property" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/property" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/property" replace />
            ) : (
              <Register role={role} />
            )
          }
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/property"
          element={user ? <Property /> : <Navigate to="/login" replace />}
        />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register role={role} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/property" element={<Property />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
