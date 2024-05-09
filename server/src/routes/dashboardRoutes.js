const express = require("express");
const router = express.Router();
const dashboardController=require("../controllers/dashboardController")
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get('/get-order-week',dashboardController.getDataOrderWeek)
router.get('/get-revenue',dashboardController.getDataRevenue)
router.get('/top-selling',dashboardController.getTopSelling)
module.exports = router;