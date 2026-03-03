const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String
    },

    quantity: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      default: "Placed" // Placed, Shipped, Delivered
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
