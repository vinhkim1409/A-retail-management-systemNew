const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, require: true, minLength: 8 },
    tenantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
      required: true,
    },
    address: {
      type: [{ type: String, required: true }],
      default:[]
    },
    order: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }] },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    //commnets:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }] },
    avatar: { type: String },
    membershipPoint: { type: Number, required: true, default: 0 },
    banStatus: { type: String, required: true, default: "Active" },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
