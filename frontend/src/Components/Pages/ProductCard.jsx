import { addToCart } from "../../utils/cartUtils";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Login first to add to cart", err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "150px", objectFit: "contain" }}
        />

        <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>{product.name}</h3>
      </Link>
      <div style={{ fontWeight: "bold", color: "#28a745" }}>
        <p>🏷️ ${product.price.toFixed(2)}</p>
        <p>left in stock: {product.countInStock}</p>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
