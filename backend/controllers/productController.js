const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};
