import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/authContext";

function Profile() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    // If no user or token, stop executing
    if (!user || !user.token) return;

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []); // Ne asigurăm că data e array
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMyOrders();
  }, []);

  if (!user) return <p>Not logged in</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile: {user.username}</h1>
      <h3>Orders History:</h3>
      {orders.length === 0 ? (
        <p>No any orders.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th>Order ID:</th>
              <th>Data:</th>
              <th>Total:</th>
              <th>Status:</th>
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{order._id.slice(-5)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <Link to={`/order/${order._id}`}>Check details:</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Profile;

// import { useEffect, useState } from "react";

// function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("user"));
//     setUser(data);
//   }, []);

//   if (!user) return <p>Not logged in</p>;

//   return (
//     <div>
//       <h1>User Profile</h1>

//       <p>Username: {user.username}</p>
//       <p>Email: {user.email}</p>

//       <p>First Name: {user.firstName}</p>
//       <p>Last Name: {user.lastName}</p>
//       <p>Address: {user.address}</p>
//     </div>
//   );
// }

// export default Profile;
