const mongoose = require("mongoose");
const detailInfoProduct = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
  status: { type: Boolean, required: true },
});
const classSale = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});
const saleInfoProduct = new mongoose.Schema({
  class1: { type: classSale },
  class2: { type: classSale },
  buyPrice: { type: String, required: true },
  sellPrice: { type: String, required: true },
  quantity: { type: Number, required: true },
});
const productSchema = new mongoose.Schema(
  {
    // Định nghĩa các trường dữ liệu của sản phẩm ở đây
    name: { type: String, required: true },
    industry: { type: String, required: true },
    picture: { type: [String], required: true },
    decsciption: { type: String, required: true },
    detailInfo: { type: [detailInfoProduct], required: true },
    saleInfo: { type: [saleInfoProduct], required: true },
    isDeleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
