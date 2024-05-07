const Review = require("../models/reviewModel")

const reviewController={
    addReview: async (req, res) => {
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
      },
      getReviewByProduct:async (req, res) => {},
      getReviewById:async (req, res) => {},
      getReviewByUser:async (req, res) => {},
      getReviewByBusiness:async (req, res) => {},
      
}
module.exports =reviewController