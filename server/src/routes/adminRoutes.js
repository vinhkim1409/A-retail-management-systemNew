const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/get-data-card", adminController.getDataCardAdmin);
router.get("/get-data-dashboard", adminController.getDataRevenue);
router.get("/get-business", adminController.getBuisness);
router.post("/login", adminController.loginAdmin);
router.post("/signup", adminController.signupAdmin);
module.exports = router;