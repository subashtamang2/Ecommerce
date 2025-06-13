const express = require("express");
const Cart = require("../models/Cart");
const Products = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// Helper function to get a cart by user id or guest id
const getCart = async(userId, guestId) = {
  if(userId) {
    return await Cart.findOne({ user: userId });
  } else if(guestId) {
    return await Cart.findOne({ guestId })

  }
  return null;
};

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({
      message: "Product not found"
    });
  }
})