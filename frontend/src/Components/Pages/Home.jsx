import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { filterItems } from "../../utils/searchUtils";
import ProductCard from "./ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input default state
  const [selectedCategory, setSelectedCategory] = useState("All"); // useState for selected category

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Apply the filtering before rendering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to Shopping Store</h1>
      <h2>Discover our products</h2>
      <h3>New Brands Arrive Every Month 🛍️</h3>
      <div>
        <h4>Search by Category:</h4>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #007bff",
              backgroundColor: selectedCategory === cat ? "#007bff" : "white",
              color: selectedCategory === cat ? "white" : "#007bff",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        <h4>Search Products:</h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "30px",
            width: "100%",
            maxWidth: "400px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}

export default Home;

// return (
//   <div>
//     <h1 style={{ textAlign: "center" }}>Welcome to Shopping</h1>
//     <h1>
//       Products: <span>Check our new brand products</span>
//     </h1>
//     <form onChange={(e) => e.preventDefault()}>
//       <input
//         type="search"
//         input="text"
//         placeholder="Search for products..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)} // update in real time
//         style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
//       />
//     </form>

//     <div className="products-list">
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <div key={product.id}>
//             {" "}
//             {product.name} - ${product.price}
//           </div>
//         ))
//       ) : (
//         <p>No products found for {searchTerm}</p>
//       )}
//     </div>
//       {products.map((product) => (
//         <div
//           key={product._id}
//           style={{ border: "1px solid #f4ecec", margin: 10, padding: 25 }}
//         >
//           <Link to={`/product/${product._id}`}>
//             <h3>Product:</h3>
//             <h3>{product.name}</h3>
//             <img src={product.image} alt={product.name} width="50" />
//           </Link>
//           <p>Description: {product.description} </p>
//           <p>Stock: {product.stock}</p>
//           <p>Price: {product.price}</p>

//           <button onClick={() => addToCart(product._id, 1)}>
//             {" "}
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
