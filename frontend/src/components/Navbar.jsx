import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/dashboard">
        CareerNavigator AI
      </Link>

      {user && (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;