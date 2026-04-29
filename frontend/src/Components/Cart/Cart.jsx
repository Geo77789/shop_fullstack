import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../../utils/cartUtils";
import { placeOrder } from "../../utils/cartUtils";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setUpdatingId(true);
      const createOrder = await placeOrder();

      alert(`Order placed successfully! Order ID: ${createOrder._id}`);

      // empty the cart (backend already does this)
      setCart([]);

      navigate("/order/${createdOrder._id}");
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, delta) => {
    if (updatingId) return; // if something is being updated, don't update again

    try {
      setUpdatingId(true); // set updatingId to prevent concurrent updates
      const updatedCart = await addToCart(productId, delta);
      setCart(updatedCart.items || []);
    } catch (err) {
      setError(err.message);

      fetchCart();
    } finally {
      setUpdatingId(false); // unlock the buttons
    }
  };

  const handleRemove = async (productId) => {
    if (updatingId) return;
    try {
      setUpdatingId(true);
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart?.items || []);
    } catch (err) {
      setError(err.message);
      fetchCart();
    } finally {
      setUpdatingId(false);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0,
  );

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h1> 🛒 Shopping Cart</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {cart.length === 0 ? (
        <p>
          Cart is empty: Return to <span>Home Page</span>
          <span>Products Page</span>
        </p>
      ) : (
        cart.map((item) => {
          // verify if product was correctly loaded
          if (!item.product || typeof item.product === "string") {
            return <div key={item._id}>Loading product details...</div>;
          }

          return (
            <div
              key={item.product._id}
              style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
            >
              <h3>Product: {item.product.name}</h3>
              <img
                src={item.product.image}
                alt={item.product.name}
                width="50"
              />
              <p>Price: ${(item.product.price || 0).toFixed(2)}</p>
              <p>
                Quantity:
                <button
                  onClick={() => handleQuantityChange(item.product._id, -1)}
                  disabled={updatingId}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, +1)}
                  disabled={
                    updatingId || item.quantity >= item.product.countInStock
                  }
                >
                  +
                </button>
                {item.quantity >= item.product.countInStock && (
                  <span
                    style={{ color: "orange", fontSize: "12px", opacity: 0.5 }}
                  >
                    {" "}
                    stock reached the limit
                  </span>
                )}
              </p>
              <button
                onClick={() => handleRemove(item.product._id)}
                disabled={updatingId}
                style={{ cursor: updatingId ? "not-allowed" : "pointer" }}
              >
                {updatingId ? "Processing... " : "Remove from cart"}
              </button>
            </div>
          );
        })
      )}

      <h2>Total: ${total.toFixed(2)}</h2>
      <button
        onClick={() => handleCheckout}
        disabled={cart.length === 0 || updatingId}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px",
          width: "25%",
          fontSize: "1.2rem",
          marginTop: "20px",
          cursor: "pointer",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {updatingId ? "Processing... " : "Checkout"}
      </button>
    </div>
  );
}

export default Cart;
