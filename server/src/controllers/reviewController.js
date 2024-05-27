const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

const reviewController = {
  addReview: async (req, res) => {
    try {
      const creator = req.user[0]._id;
      const idProduct = req.params.productID;
      const { desc, title, point } = req.body;
      const newReview = new Review({
        product: idProduct,
        title: title,
        ratingPoint: point,
        description: desc,
        creator: creator,
        tenantID: req.tenantID,
      });
      await newReview.save();
      const product = await Product.findOne({ _id: idProduct });
      const ratingPoint = product.ratingPoint;
      const ratingCount = product.ratingCount;
      const newRatingPoint = (
        (parseFloat(ratingPoint) * ratingCount + point) /
        (ratingCount + 1)
      ).toFixed(1);
      const newRatingCount = ratingCount + 1;

      const reviewedProduct = await Product.findOneAndUpdate(
        { _id: idProduct },
        { ratingPoint: newRatingPoint, ratingCount: newRatingCount }
      );

      res.json({
        success: true,
        data: { reviewedProduct,newReview},
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReviewByProduct: async (req, res) => {
    try {
      const review= await Review.find({product: req.params.productID}).populate("creator")
      res.json({
        success: true,
        data: review,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReviewById: async (req, res) => {},
  getReviewByUser: async (req, res) => {},
  getReviewByBusiness: async (req, res) => {},
};
module.exports = reviewController;
