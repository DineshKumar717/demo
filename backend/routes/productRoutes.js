const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🔹 BULK ADD PRODUCTS
router.post("/bulk", async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
