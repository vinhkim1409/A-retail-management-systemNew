const Product = require("./productModel");
const mongoose = require("mongoose");

const productOrder = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  product_idThir: String,
  product_name: String,
  product_sku: String,
  variant: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unit_price: String,
  weight: String,
  product_img: [String],
  description: String,
  unit_id: Number,
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
    statusPayment: {
      type: String,
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
    typeOrder: { type: String, required: true,default:"Website" },
    orderStatus: { type: String },
    date_update_order_status: { type: Date, default: new Date() },
    shippingCode: String,
    shipping_status: { type: String },
    date_update_shipping_status: { type: Date, default: new Date() },
    is_refund:{type: Boolean, default:false},
    refund_picture: { type: [String], default:[]},
    type_reason:{ type: String, default:"" },
    refund_status:{ type: String, default:"" },
    is_cancel:{type: Boolean, default:false},
    data_cancel:{ type: Date}
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
