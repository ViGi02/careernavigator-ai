import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/dashboard">
        CareerNavigator AI
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      {user && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;