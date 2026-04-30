import { useState, useEffect } from "react";
import { getCart, placeOrder } from "../../utils/cartUtils";
import { useNavigate } from "react-router-dom";

function OrderScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCartItems(data.items || []);
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    try {
      // Send FormData + COMMAND TO BACKEND
      const orderData = {
        orderItems: cartItems, // The name to be the same as in the backend
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
          country: "Romania",
        },
        totalPrice: totalPayment,
      };

      const createdOrder = await placeOrder(orderData); // Here call the function from cartUtils which make fetch to POST

      alert("The order was processed successfully!");
      navigate(`/order/${createdOrder._id}`); // Go to details page
    } catch (err) {
      alert("Error to process the order: " + err.message);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPayment = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      {/* SECTION 1: FORM DATE CLIENT */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>Shipping Details</h2>
        <form
          onSubmit={handleProcessOrder}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Street and Number"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Process your order
          </button>
        </form>
      </div>

      {/* SECTION 2: SUMMARY ORDER */}
      <div
        style={{
          flex: 1,
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              borderBottom: "1px solid #eee",
              pb: "10px",
            }}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              width="60"
              height="60"
              style={{ objectFit: "contain" }}
            />
            <div>
              <h4 style={{ margin: 0 }}>{item.product.name}</h4>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                {item.product.description.substring(0, 50)}...
              </p>
              <p>
                Qty: {item.quantity} x ${item.product.price}
              </p>
            </div>
          </div>
        ))}
        <hr />
        <p>
          Total Items: <strong>{totalItems}</strong>
        </p>
        <h3>
          Total Payment:{" "}
          <span style={{ color: "#28a745" }}>${totalPayment.toFixed(2)}</span>
        </h3>
      </div>
    </div>
  );
}

// Fast styles
const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
const buttonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.1rem",
  marginTop: "10px",
};

export default OrderScreen;

// {
/* <form
          onSubmit={handleProcessOrder}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="address"
            placeholder="Street and Number"
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <button type="submit" style={buttonStyle}>
            Process your order
          </button>
        </form>
      </div> */
// }
