const mongoose = require("mongoose");

const productOrder = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  class1: {
    type: String,
    required: true,
  },
  class2: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    //tenantId
    //customerID
    products: { type: [productOrder] },
    address: {
      type: String,
      required: true,
    },
    //statusShipping
    //shippingInfo
    statusPayment: {
      type: Boolean,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    paymentType: { type: String, required: true },
    shipMethod: {
      type: String,
      required: true,
    },
    shipPrice: { type: String, required: true },
    orderID:{ type: String}
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
