import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  const buyNow = async (item) => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item._id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.qty
      })
    });

    alert("Order placed successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 shadow"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="h-40 mx-auto object-contain"
              />

              {/* Title */}
              <h2 className="font-semibold mt-2">
                {item.title}
              </h2>

              {/* Price */}
              <p className="text-green-600 font-bold">
                ₹{item.price * item.qty}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="border px-3 py-1 rounded"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => buyNow(item)}
                  className="flex-1 bg-black text-white py-1 rounded"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="flex-1 border py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
