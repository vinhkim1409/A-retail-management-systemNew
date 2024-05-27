const express = require("express");
const authMiddlewares = require('../middlewares/authMiddlewares')
const router = express.Router();

const MonoController = require("../controllers/MomoController")
router.post("/payMomo",authMiddlewares.verifyTokenCustomer,MonoController.payOrderMomo)
router.post("/payPackage",authMiddlewares.verifyToken,authMiddlewares.verifyAdminAuth,MonoController.payPackageMomo)

module.exports = router;
