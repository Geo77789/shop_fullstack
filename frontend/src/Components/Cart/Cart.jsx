import { useEffect, useState } from "react";
import { getCart } from "../../utils/cartService";

function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCart(data.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0,
  );

  return (
    <div>
      <h1>Cart</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.product.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Price: {item.product.price}</p>
        </div>
      ))}

      <h2>Total: {total}</h2>
    </div>
  );
}

export default Cart;
