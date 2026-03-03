import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const buyNow = async () => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image
      })
    });

    alert("Order placed");
  };

  return (
    <div className="border p-3 rounded shadow">
      <img
        src={product.image}
        className="h-40 mx-auto object-contain"
      />

      <h2 className="font-semibold mt-2">{product.title}</h2>
      <p className="text-green-600 font-bold">₹{product.price}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 border py-1 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={buyNow}
          className="flex-1 bg-black text-white py-1 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
