const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  businessImg: { type: [String], required: true },
  featureProduct: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    // required: true,
  },
 //   tenantID:{ type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true},
},{
  timestamps: true,
});

const Website = mongoose.model("websites", websiteSchema);

module.exports = Website;
