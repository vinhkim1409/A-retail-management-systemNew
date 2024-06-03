const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  tenantID:{ type: mongoose.Schema.Types.ObjectId, ref: "business", required: true},
  businessImg: { type: [String], required: true },
  logo:String,
 
},{
  timestamps: true,
});

const Website = mongoose.model("websites", websiteSchema);

module.exports = Website;
