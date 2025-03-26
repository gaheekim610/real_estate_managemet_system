import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("");

  const handleRole = (value) => {
    setRole(value);
  };

  return (
    <Router>
      <Navbar handleRole={handleRole} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register role={role} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
