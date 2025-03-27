import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ handleRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Real Estate Management System
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/property" className="mr-4">
              Property
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 mr-4 rounded hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => {
                handleRole("individual");
              }}
              className="bg-white-500 px-4 py-2 rounded hover:bg-gray-700"
            >
              SignUp
            </Link>
            <Link
              to="/register"
              onClick={() => {
                handleRole("agent");
              }}
              className="bg-white-500 px-4 py-2 rounded hover:bg-gray-700"
            >
              Agent SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
