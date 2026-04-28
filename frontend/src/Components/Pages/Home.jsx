import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { addToCart } from "../../utils/cartUtils";
import { filterItems } from "../../utils/searchUtils";
import ProductCard from "./ProductCard";
// import Products from "./Products";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input default state

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Apply the filtering before rendering
  const filteredProducts = filterItems(products, searchTerm, "name");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Discover our Products</h1>

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
