import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../utils/cartUtils";
// import Products from "./Products";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products:</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: "1px solid #f4ecec", margin: 10, padding: 25 }}
        >
          <Link to={`/product/${product._id}`}>
            <h3>Product:</h3>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} width="50" />
          </Link>

          <p>Price: {product.price}</p>

          <button onClick={() => addToCart(product)}> Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
