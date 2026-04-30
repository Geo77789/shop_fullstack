import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        marginTop: "50px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Products
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Categories
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          About
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Contact
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
