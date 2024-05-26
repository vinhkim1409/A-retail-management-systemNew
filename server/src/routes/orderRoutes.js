const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
const orderController = require("../controllers/orderController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post(
  "/createOrder",
  authMiddlewares.verifyTokenCustomer,
  orderController.createOrder
);
router.get("/", authMiddlewares.verifyToken, orderController.getOrderBusiness); //get of business
router.get(
  "/business/:orderID",
  authMiddlewares.verifyToken,
  orderController.getOrderBusinessById
); //get one of business
router.get(
  "/customer",
  authMiddlewares.verifyTokenCustomer,
  orderController.getOrderCustomer
); //get of customer

router.post(
  "/notify-payment",
  authMiddlewares.verifyTokenCustomer,
  orderController.notifyOrderCustomer
);
module.exports = router;
