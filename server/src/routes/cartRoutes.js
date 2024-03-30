const express = require("express");
const router = express.Router();

const Cart = require("../models/cartModel");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const getCartCondition = {
      customerID: "123",
      tenantID: "123",
    };
    const cart = await Cart.find().populate("products.product");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//[POST] '/cart/:id' se lay id tu token
router.post("/:id", async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.json({
      success: true,
      message: "New cart is created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//[PUT] '/cart/add-product' se lay id tu token
router.put("/add-product", async (req, res) => {
  try {
    const { productId, saleInfo, quantity } = req.body;
    const products = {
      product: new mongoose.Types.ObjectId(productId),
      class1: saleInfo.class1,
      class2: saleInfo.class2,
      price: saleInfo.sellPrice,
      quantity: quantity,
    };
    const addProductCartCondition = { _id: "65ff0b618c26cfb533caa40c" };
    const addProductCart = await Cart.findOneAndUpdate(
      addProductCartCondition,
      { $push: { products:  products  } },
      { new: true }
    );
    res.json(addProductCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
