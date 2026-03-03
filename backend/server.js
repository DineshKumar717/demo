const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/Product");
const Order = require("./models/Order");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
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

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);