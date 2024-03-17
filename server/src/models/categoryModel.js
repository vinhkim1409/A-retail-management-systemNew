const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  product: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  },
//   tenantID:{ type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true},
isDeleted:{type:Boolean, required: true}
});

const Category = mongoose.model("categorys", categorySchema);

module.exports = Category;
