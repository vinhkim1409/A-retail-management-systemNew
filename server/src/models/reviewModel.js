const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    ratingPoint : Number,
    description : String,
    title: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }
    ,tenantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business",
    }
},{
    timestamps:true
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
