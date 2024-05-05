const express = require("express");
const authMiddlewares = require('../middlewares/authMiddlewares')
const router = express.Router();

const MonoController = require("../controllers/testMomoController")
router.post("/payMomo",authMiddlewares.verifyTokenCustomer,MonoController.payOrderMomo)

module.exports = router;
