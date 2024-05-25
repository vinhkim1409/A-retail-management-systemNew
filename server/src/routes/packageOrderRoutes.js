const express = require("express");
const router = express.Router();
const packageOrderController = require("../controllers/packageOrderController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/createOrder", packageOrderController.createOrder);

module.exports = router;
