import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getCart } from "../../utils/cartUtils";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  // Function which calculate the total number of items in the cart
  const updateCount = async () => {
    try {
      const cart = await getCart();
      const totalItemsInCart = cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      setCartCount(totalItemsInCart);
    } catch (err) {
      setCartCount(0);
    }
  };
  useEffect(() => {
    updateCount();
    // Add event listener to update the count when the cart is updated
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

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
        {cartCount > 0 && (
          <span
            style={{
              // position: "absolute",
              // top: "-10px",
              // right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "25%",
              padding: "2px 6px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {cartCount} 🛒
          </span>
        )}
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
