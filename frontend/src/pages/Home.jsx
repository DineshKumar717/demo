import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { cartCount } = useCart();

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: ""
  });

  const handleSave = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const newProduct = await res.json();
    setProducts(prev => [newProduct, ...prev]);

    setShowForm(false);
    setForm({ title: "", price: "", category: "", image: "" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Home</h1>

        <div className="flex items-center gap-4" style={{position:"relative", left:"1200px",top:"-50px"}}>
          <Link to="/products" className="font-medium" style={{position:"relative",left:"-100px"}}>
            All Products
          </Link>

          <Link to="/cart" className="relative text-2xl"  style={{position:"relative",left:"-50px"}}>
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSave}
            className="bg-white p-6 rounded w-[90%] max-w-sm space-y-3"
          >
            <input className="border p-2 w-full" placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input className="border p-2 w-full" placeholder="Price"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <input className="border p-2 w-full" placeholder="Category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
            <input className="border p-2 w-full" placeholder="Image URL"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
            />

            <div className="flex gap-2 pt-2">
              <button className="bg-black text-white w-full py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border w-full py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PRODUCTS – ONE BY ONE */}
{products.length === 0 ? (
  <p className="text-center text-gray-500">No products yet</p>
) : (
  <div className="flex flex-col gap-4 max-w-xl mx-auto">
    {products.map(p => (
      <ProductCard key={p._id} product={p} />
    ))}
  </div>
)}
    </div>
  );
};

export default Home;
