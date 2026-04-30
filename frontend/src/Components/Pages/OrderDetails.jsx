import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setOrder(data);
    };
    fetchOrder();
  }, [id]);
  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h2>Order Details:</h2>
      <h3>Command #{order._id.slice(-5)}</h3>
      <div>
        <div>
          <h3>Client Details:</h3>
          <p>
            <strong>Name:</strong>
            {user.username}
          </p>
          <p>
            <strong>Email:</strong>
            {user.email}
          </p>
          <p>
            <strong>Status:</strong>
            {order.status}
          </p>
        </div>
        {/* SHIPPING ADDRESS */}
        <div>
          <h3>Shipping Address:</h3>
          {order.shippingAddress ? (
            <div>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}
              </p>
              <p>
                <strong>City:</strong>
                {order.shippingAddress.city}
              </p>

              <p>
                <strong>Country:</strong>
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>Phone:</strong>
                {order.shipping.phone}
              </p>
            </div>
          ) : (
            <p>No shipping address</p>
          )}
        </div>
      </div>
      <div>
        <h3>Ordered Products:</h3>
        {order.OrderItems.map((item) => (
          <div key={item._id}>
            <img src={item.image} alt={item.name} width="50" />
            <p>
              {item.name} (x{item.quantity})
            </p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h2>Total Order: ${order.totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default OrderDetails;
