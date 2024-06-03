const express = require("express");
const router = express.Router();

const Cart = require("../models/cartModel");
const { default: mongoose } = require("mongoose");
const authMiddlewares = require("../middlewares/authMiddlewares");
const cartController = require("../controllers/cartController");

router.get(
  "/",
  authMiddlewares.verifyTokenCustomer,
  cartController.getCartByCustomerID
);

//[POST] '/cart/:id' se lay id tu token
router.post("/:id", cartController.createNewCart);

//[PUT] '/cart/add-product' se lay id tu token
router.put(
  "/add-product",
  authMiddlewares.verifyTokenCustomer,
  cartController.addProductToCart
);
router.put(
  "/delete-product/:id",
  authMiddlewares.verifyTokenCustomer,
  cartController.deleteProductFromCart
);
module.exports = router;
