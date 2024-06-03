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
router.get(
  "/customer/:orderID",
  authMiddlewares.verifyTokenCustomer,
  orderController.getOrderCustomerById
); //get of customer
router.put(
  "/update-statuspayment",
  authMiddlewares.verifyToken,
  orderController.handlPayOrder
);

router.get("/info", authMiddlewares.verifyToken, orderController.getInfoOrder);
router.get(
  "/check-shipping-status",
  authMiddlewares.verifyTokenCustomer,
  orderController.checkShippingStatus
);
router.post("/notify-payment", orderController.notifyOrderCustomer);
router.post(
  "/create-request/:orderID",
  authMiddlewares.verifyTokenCustomer,
  orderController.createRedeliveryRequest
);
router.post(
  "/reject-request",
  authMiddlewares.verifyToken,
  orderController.rejectRequest
);
router.post(
  "/accept-request",
  authMiddlewares.verifyToken,
  orderController.acceptRequest
);
router.post(
  "/confirm-receipt",
  authMiddlewares.verifyTokenCustomer,
  orderController.confirmReceipt
);
router.delete("/delete/:orderID",orderController.deleteOrder)

module.exports = router;
