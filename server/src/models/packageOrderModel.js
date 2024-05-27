const mongoose = require("mongoose");

const packageOrderSchema = new mongoose.Schema({
  tenantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },
  typePackage: { type: Number, required: true },
  totalPrice: { type: Number, required: true}
},{timestamps:true});

const PackageOrder=mongoose.model("PackageOrder",packageOrderSchema)
module.exports = PackageOrder;
