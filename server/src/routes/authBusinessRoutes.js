const businessController= require("../controllers/authBusinessController")
const express = require("express");
const router = express.Router();


router.post("/signup", businessController.registerBusiness)
router.post("/login", businessController.loginBusiness)
router.post("/check-email", businessController.checkEmail)
router.get("/info/:tenantURL", businessController.getBusinessInfo)

module.exports = router;