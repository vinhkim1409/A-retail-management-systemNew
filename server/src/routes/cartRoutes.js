const express = require("express");
const router = express.Router();

const Cart = require("../models/cartModel");
const { default: mongoose } = require("mongoose");
const authMiddlewares=require("../middlewares/authMiddlewares")


async function deleteProductFromCart(conditionCart, idProductInCart) {
  try {
    const updateCart = await Cart.findOneAndUpdate(
      conditionCart,
      { $pull: { products: { _id: idProductInCart } } },
      { new: true }
    );
    if (!updateCart) {
      console.log("Cart Order Failed");
      return false
    } else {
      console.log("Cart Order Success");
      return true
    }
  } catch (error) {
    console.error("Lỗi khi cố gắng xóa sản phẩm khỏi giỏ hàng:", error);
  }
}

router.get("/",authMiddlewares.verifyTokenCustomer, async (req, res) => {
  try {
    const getCartCondition = {
      customerID: req.user[0]._id,
    };
    const cart = await Cart.find(getCartCondition).populate("products.product");
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
router.put("/add-product",authMiddlewares.verifyTokenCustomer, async (req, res) => {
  try {
    const { productId, variant, quantity } = req.body;
    const products = {
      product: new mongoose.Types.ObjectId(productId),
      variant:variant,
      quantity: quantity,
    };
    const addProductCartCondition = { customerID: req.user[0]._id };
    const addProductCart = await Cart.findOneAndUpdate(
      addProductCartCondition,
      { $push: { products:  products  } },
      { new: true }
    );
    res.json({success:true,data:addProductCart});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/delete-product/:id",authMiddlewares.verifyTokenCustomer, async (req, res) => {
  try {

    const conditionCart = {customerID:new mongoose.Types.ObjectId(req.user[0]._id)}
    const idProductInCart=req.params.id
    if(deleteProductFromCart(conditionCart,idProductInCart))
      {
        res.json({success:true,data:idProductInCart});
      }
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
module.exports = router;
