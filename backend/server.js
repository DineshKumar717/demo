const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const Order = require("./models/Order");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// GET products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

app.post("/api/orders", async (req, res) => {
  const order = new Order(req.body);
  const saved = await order.save();
  res.status(201).json(saved);
});

app.use("/api/orders", orderRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
