const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Business = require("../models/businessModel");
const authMiddleware = require("../middlewares/authMiddlewares");
const { default: mongoose } = require("mongoose");
const productController = require("../controllers/productController");

router.get("/by-tenantURL/:tenantURL", productController.getByTenantURL);
router.get("/get/top-sale/:tenantURL", productController.getTopSale);

router.get("/sendo", authMiddleware.verifyToken, productController.fetchSendoProducts);
router.get("/create-sendo", authMiddleware.verifyToken, productController.createSendoProduct);
router.put("/quantitySendo", authMiddleware.verifyToken, productController.updateQuantitySendo);

router.post(
  "/add",
  authMiddleware.verifyToken,
  productController.addNewProduct
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,
  productController.deleteProduct
);

router.get("/:id", productController.getById);

router.put(
  "/update-quantity",
  authMiddleware.verifyToken,
  productController.updateQuantity
);

router.put("/updateId", authMiddleware.verifyToken, productController.updateProductId);
router.put("/:id", authMiddleware.verifyToken, productController.updateProduct);


module.exports = router;
