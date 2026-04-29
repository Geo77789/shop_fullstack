import { useEffect, useState } from "react";
import { getProducts } from "../../utils/productUtils";
import { getSummary } from "../../utils/adminUtils";
import { filterItems } from "../../utils/searchUtils";
import {
  loadDashboardData,
  handleDelete,
  handleCreate,
  handleUpdate,
} from "./adminFunctions";

function AdminScreen() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const displayedProducts = filterItems(products, searchTerm);

  // Statistics
  const totalProfit = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalItemsSold = orders.reduce(
    (acc, o) =>
      acc + o.OrderItems.reduce((sum, item) => sum + item.quantity, 0),
    0,
  );
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const fetchSummary = async () => {
    const data = await getSummary();
    setSummary(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/orders", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  const handleUpdateStatus = async (id) => {
    if (!window.confirm("Mark this order as delivered?")) return;
    try {
      const res = await fetch(`/api/orders/${id}/deliver`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadDashboardData(setProducts, setSummary, setLoading, setError);
    fetchOrders();
  }, []);

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard - Hello, {user.username}</h1>

      {/* 1. SELLING STATISTICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#e3f2fd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Total Profit</h4>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            ${totalProfit.toFixed(2)}
          </p>
        </div>
        <div
          style={{
            background: "#f1f8e9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Items Sold</h4>
          <p style={{ fontSize: "1.5rem" }}>{totalItemsSold}</p>
        </div>
        <div
          style={{
            background: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Pending</h4>
          <p style={{ fontSize: "1.5rem" }}>{pendingOrders}</p>
        </div>
        <div
          style={{
            background: "#e8f5e9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Delivered</h4>
          <p style={{ fontSize: "1.5rem" }}>{deliveredOrders}</p>
        </div>
      </div>

      {/* 2. ORDER MANAGEMENT */}
      <h2>Order Management</h2>
      <table
        style={{
          width: "100%",
          marginBottom: "50px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#eee", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{order._id.slice(-5)}</td>
              <td>{order.user?.username || "Deleted User"}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <span
                  style={{
                    color: order.status === "Delivered" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === "Pending" && (
                  <button onClick={() => handleUpdateStatus(order._id)}>
                    Deliver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* 3. PRODUCT INVENTORY */}
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Product Inventory</h2>
          <button
            onClick={() => handleCreate(fetchProducts, fetchSummary)}
            style={{
              background: "#28a745",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            + Add New Product
          </button>
        </div>

        {editingProduct && (
          <div
            style={{
              background: "#f0f0f0",
              padding: "20px",
              margin: "20px 0",
              borderRadius: "8px",
              border: "1px solid #007bff",
            }}
          >
            <h3>Edit: {editingProduct.name}</h3>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: Number(e.target.value),
                })
              }
            />
            <button
              onClick={() =>
                handleUpdate(
                  editingProduct._id,
                  editingProduct,
                  fetchProducts,
                  fetchSummary,
                  setEditingProduct,
                )
              }
            >
              Save
            </button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        )}

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", margin: "20px 0", width: "300px" }}
        />

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th>Img</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{product._id.slice(-5)}</td>
                <td>
                  <img src={product.image} width="30" alt="" />
                </td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td
                  style={{ color: product.countInStock < 5 ? "red" : "black" }}
                >
                  {product.countInStock}
                </td>
                <td>
                  <button onClick={() => setEditingProduct(product)}>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        product._id,
                        products,
                        setProducts,
                        fetchSummary,
                      )
                    }
                    style={{ color: "red", marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminScreen;

/* <div style={{ padding: "20px" }}>
      {" "}
      <h1>Admin Dashboard - Hello, {user.username}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h4>Total Products/Items:</h4>
          <p>{summary.totalProducts || 0}</p>
        </div>
        <div>
          <h4>Total Stock:</h4>
          <p>{summary.totalStock || 0} units</p>
        </div>
        <div>
          <h4>Inventory Value $:</h4>
          <p>${(summary.totalValue || 0).toFixed(2)}</p>
        </div>
        <div>
          <h4>Total Users:</h4>
          <p>{summary.userCount || 0}</p>
        </div>
      </div> */

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar-ul de Admin */}
//       <div
//         style={{
//           width: "250px",
//           background: "#2c3e50",
//           color: "white",
//           padding: "20px",
//         }}
//       >
//         <h2>Admin Menu</h2>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           <li style={{ padding: "10px 0" }}>📦 </li>
//           <li style={{ padding: "10px 0" }}>👥 </li>
//           <li style={{ padding: "10px 0" }}>📊 </li>
//         </ul>
//       </div>

//       {/*) */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h1>Management Produse</h1>
//         {/*  */}
//       </div>
//     </div>
//   );
// }
