const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

async function deleteProductFromCart(conditionCart, idProductInCart) {
  try {
    const updateCart = await Cart.findOneAndUpdate(
      conditionCart,
      { $pull: { products: { _id: idProductInCart } } },
      { new: true }
    );
    if (!updateCart) {
      console.log("Cart Order Failed");
      return false;
    } else {
      console.log("Cart Order Success");
      return true;
    }
  } catch (error) {
    console.error("Lỗi khi cố gắng xóa sản phẩm khỏi giỏ hàng:", error);
  }
}

const cartController = {
  getCartByCustomerID: async (req, res) => {
    try {
      const getCartCondition = {
        customerID: req.user[0]._id,
      };
      const cart = await Cart.find(getCartCondition).populate(
        "products.product"
      );
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createNewCart: async (req, res) => {
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
  },
  addProductToCart: async (req, res) => {
    try {
      const { productId, variant, quantity } = req.body;
      const products = {
        product: new mongoose.Types.ObjectId(productId),
        variant: variant,
        quantity: quantity,
      };

      const addProductCartCondition = await Cart.findOne({
        customerID: req.user[0]._id,
      });
      const productNeed = addProductCartCondition.products.findIndex(
        (product) => product.product == productId && product.variant == variant
      );
      if (productNeed >= 0) {
        addProductCartCondition.products[productNeed].quantity =
          addProductCartCondition.products[productNeed].quantity + quantity;
        await addProductCartCondition.save();
        return res.json({ success: true, data: addProductCartCondition });
      } else {
        const addProductCart = await Cart.findOneAndUpdate(
          addProductCartCondition,
          { $push: { products: products } },
          { new: true }
        );
        res.json({ success: true, data: addProductCart });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProductFromCart: async (req, res) => {
    try {
      const conditionCart = {
        customerID: new mongoose.Types.ObjectId(req.user[0]._id),
      };
      const idProductInCart = req.params.id;
      if (deleteProductFromCart(conditionCart, idProductInCart)) {
        res.json({ success: true, data: idProductInCart });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartController;
