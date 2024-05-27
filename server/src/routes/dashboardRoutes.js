const express = require("express");
const router = express.Router();
const dashboardController=require("../controllers/dashboardController")
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get('/get-order-week',authMiddlewares.verifyToken,dashboardController.getDataOrderWeek)
router.get('/get-revenue',authMiddlewares.verifyToken,dashboardController.getDataRevenue)
router.get('/top-selling',authMiddlewares.verifyToken,dashboardController.getTopSelling)
router.get('/card-data',authMiddlewares.verifyToken,dashboardController.getDataCard)
module.exports = router;