import { addToCart } from "../../utils/cartUtils";

const ProductCard = ({ product }) => {
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
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "contain" }}
      />
      <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>{product.name}</h3>
      <p style={{ fontWeight: "bold", color: "#28a745" }}>
        🏷️ ${product.price.toFixed(2)}
        <p>left in stock: {product.countInStock}</p>
      </p>
      <button
        onClick={() => addToCart(product._id, 1)}
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
