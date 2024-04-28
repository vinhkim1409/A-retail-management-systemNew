const businessController= require("../controllers/authBusinessController")
const express = require("express");
const router = express.Router();


router.post("/signup", businessController.registerBusiness)
router.post("/login", businessController.loginBusiness)

module.exports = router;