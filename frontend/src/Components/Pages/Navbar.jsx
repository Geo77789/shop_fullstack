import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px, 30px",
        backgroundColor: "#3f80c2",
        color: "white",
      }}
    >
      {/* 1. LOGO / BRAND */}
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Logo place 🛠 coming soon
        </Link>
      </div>
      {/* 1. LOGO / BRAND */}

      {/* 2. NAVIGATION LINKS */}
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/cart" style={{ color: "white" }}>
        Cart 🛒
      </Link>
      {/* 2. NAVIGATION LINKS */}

      {/* 3. WHAT THE USER SEE IF HE IS LOGGED IN */}
      {user ? (
        <div>
          <Link to="/profile">Profile</Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </div>
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
