const express = require("express");
const router = express.Router();

const Review = require("../models/reviewModel");

router.post("add/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;
    const { desc, title, point } = req.body;
    const newReview = new Review({
      product: idProduct,
      title: title,
      ratingPoint: point,
      description: desc,
    });
    await newReview.save();
    res.json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id",async (req,res)=>{
    
})

module.exports = router;
