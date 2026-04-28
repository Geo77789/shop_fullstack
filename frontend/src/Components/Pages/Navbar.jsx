import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>

      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && user.isAdmin && (
        <>
          <Link to="/admin" style={{ color: "gold", fontWeight: "bold" }}>
            ADMIN DASHBOARD: {user.username}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
