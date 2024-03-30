const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    type: [String],
    required: true,
  },
  order: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }] },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  //commnets:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }] },
  avatar: { type: String, required: true },
  password: { type: String, trim: true, require: true, minLength: 8 },
  membershipPoint: { type: Number, required: true },
  tenantID:{ type: mongoose.Schema.Types.ObjectId, ref: "business" },
  email: {type: String, trim: true, required: true},
},{
    timestamps:true
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
