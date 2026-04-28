import { useEffect, useState } from "react";
import { getProducts } from "../../utils/productUtils";
import { getSummary } from "../../utils/adminUtils";
import {
  loadDashboardData,
  handleDelete,
  handleCreate,
  handleUpdate,
} from "./adminFunctions";

// test@test.com - 12345
// test1@test1.com - 123456
// test2@test2.com - 1234567

function AdminScreen() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const fetchSummary = async () => {
    const data = await getSummary();
    setSummary(data);
  };

  useEffect(() => {
    loadDashboardData(setProducts, setSummary, setLoading, setError);
  }, []);

  if (loading) return <p> Loading the products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <h1>Admin Dashboard - Hello, </h1>
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
      </div>
      {/* 2. Table section */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingProduct && (
            <div
              style={{
                background: "#f9f9f9",
                padding: "20px",
                marginBottom: "20px",
                border: "1px solid #7ac0e5",
                borderRadius: "8px",
              }}
            >
              <h3>Edit Product: {editingProduct.name}</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <span>Price:</span>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="Price"
                />
                <span>Stock:</span>
                <input
                  type="number"
                  value={editingProduct.countInStock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      countInStock: Number(e.target.value),
                    })
                  }
                  placeholder="Stock"
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
                  style={{ backgroundColor: "#28a745", color: "white" }}
                >
                  Save Changes
                </button>

                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </div>
          )}

          <h2>Management Products Table:</h2>
          <button
            onClick={() => handleCreate(fetchProducts, fetchSummary)}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Add new product
          </button>
        </div>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#eee", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th>Img</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{product._id.slice(-5)}</td>
                <td>
                  <img src={product.image} width="30" alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: "#5be1a7",
                      fontSize: "12px",
                      border: "1px solid #050a08",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: "#f0f0f0",
                      fontSize: "12px",
                      border: "1px solid #ddd",
                    }}
                  >
                    {product.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: "#7ac0e5",
                    fontSize: "12px",
                    // border: "0.5px solid #2d8e67",
                    textAlign: "center",
                    color: product.countInStock <= 5 ? "red" : "white",
                    fontWeight: "bold",
                  }}
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
//           <li style={{ padding: "10px 0" }}>📦 Produse</li>
//           <li style={{ padding: "10px 0" }}>👥 Utilizatori</li>
//           <li style={{ padding: "10px 0" }}>📊 Statistici</li>
//         </ul>
//       </div>

//       {/* Conținutul Tabelului (cel pe care l-am scris anterior) */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h1>Management Produse</h1>
//         {/* AICI pui tabelul tău cu produse */}
//       </div>
//     </div>
//   );
// }
