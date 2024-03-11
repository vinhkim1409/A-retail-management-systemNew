const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  businessImg: { type: [String], required: true },
  featureProduct: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // required: true,
  },
  isDelete: { type: Boolean, required: true },
});

const Website = mongoose.model("websites", websiteSchema);

module.exports = Website;
