const express = require("express");
const router = express.Router();

const Review = require("../models/reviewModel");
const authMiddlewares = require("../middlewares/authMiddlewares");
const reviewController = require("../controllers/reviewController");

router.post("/add/:productID",authMiddlewares.verifyTokenCustomer,reviewController.addReview);
router.get("/get-by-product/:productID",reviewController.getReviewByProduct)

module.exports = router;
