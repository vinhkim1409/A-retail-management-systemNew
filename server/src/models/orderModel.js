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
    tenantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
      required: true,
    },

    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    products: { type: [productOrder] },
    buyer_firstName: {
      type: String,
      required: true,
    },
    buyer_lastName: {
      type: String,
      required: true,
    },
    buyer_phoneNumber: {
      type: String,
      required: true,
    },
    buyer_province: {
      type: String,
      required: true,
    },
    buyer_district: {
      type: String,
      required: true,
    },
    buyer_ward: {
      type: String,
      required: true,
    },
    buyer_address_detail: {
      type: String,
      required: true,
    },
    //statusShipping
    //shippingInfo
    statusPayment: {
      type: Boolean,
      required: true,
      default: false,
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
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
