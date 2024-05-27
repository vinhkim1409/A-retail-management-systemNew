const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName:{
    type: String,required:true
  },
  lastName:{
    type: String,required:true
  },
  phoneNumber:{
    type: String,required:true
  },
  province:{
    type: String,required:true
  },
  district:{
    type: String,required:true
  },
  ward:{
    type: String,required:true
  },
  detail:{
    type: String,required:true
  },
})

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
      type: [addressSchema],
      default:[]
    },
    order: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }] },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    //commnets:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }] },
    avatar: { type: String },
    membershipPoint: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
