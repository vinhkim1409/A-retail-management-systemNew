const customerController =require('../controllers/authCustomerController')
const authMiddlewares = require('../middlewares/authMiddlewares')
const express = require("express");
const router = express.Router();

router.post("/signup", customerController.customerRegister)
router.post("/login", customerController.customerLogin)
router.put("/add-address",authMiddlewares.verifyTokenCustomer, customerController.customerAddAddress)
router.get("/get-self",authMiddlewares.verifyTokenCustomer,customerController.getSelfCustomer)
router.get("/website-business",authMiddlewares.verifyToken,customerController.getWebsiteCustomerByBusiness)

module.exports = router;