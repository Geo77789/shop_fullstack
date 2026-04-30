import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../utils/cartUtils";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1); // useState for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async () => {
    await addToCart(product._id, qty);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div>
      <h1>{product.name}:</h1>
      <img
        style={{
          border: "2px solid #f4ecec",
          margin: 25,
          padding: 25,
        }}
        src={product.image}
        alt={product.name}
        width="100"
      />
      <h4>Description:</h4>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>
        {product.countInStock > 0 ? "In Stock:" : "out of stock"}{" "}
        {product.countInStock}
      </p>

      {product.countInStock > 0 && (
        <div>
          <label>Quantity:</label>
          <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <button disabled={product.countInStock === 0} onClick={handleAddToCart}>
        {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default Product;
