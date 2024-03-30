const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const { default: mongoose } = require("mongoose");

router.post("/createOrder", async (req, res) => {
  try {
    //create order
    const { products } = req.body;
    const newOrder = new Order(req.body);
    await newOrder.save();
    //delete product from cart
    const conditionCart = { _id: "65ff0b618c26cfb533caa40c" };
    const productIds = products.map((product) => {
      return product._id;
    });
    deleteProductFromCart(conditionCart, productIds);

    //tạo phiếu xuất
    // trừ đi số lượng trong kho
    // ghi lại vào lịch sử bán
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function deleteProductFromCart(conditionCart, idProductInCart) {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      conditionCart,
      { $pull: { products: { _id: idProductInCart } } },
      { new: true }
    );
    if (!updateCart) {
      console.log("Cart Order Failed");
    } else {
      console.log("Cart Order Success");
    }
  } catch (error) {
    console.error("Lỗi khi cố gắng xóa sản phẩm khỏi giỏ hàng:", error);
  }
}
module.exports = router;
