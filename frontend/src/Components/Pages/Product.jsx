import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../utils/cartUtils";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

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
      <p>Stock: {product.countInStock}</p>

      <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
    </div>
  );
}

export default Product;
