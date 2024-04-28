const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  businessImg: { type: [String], required: true },
  tenantID:{ type: mongoose.Schema.Types.ObjectId, ref: "business", required: true},
},{
  timestamps: true,
});

const Website = mongoose.model("websites", websiteSchema);

module.exports = Website;
