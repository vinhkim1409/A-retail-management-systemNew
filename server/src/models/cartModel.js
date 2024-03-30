const mongoose = require("mongoose");

const porductCart = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  class1:{
    type:String,
    required: true,
  },
  class2:{
    type:String,
    required: true,
  },
  price:{
    type:String,
    required: true,
  }
});

const cartSchema = new mongoose.Schema(
  {
    // customerID:{type: mongoose.Schema.Types.ObjectId, ref: "customers", required:true}
    //  tennatID:{type: mongoose.Schema.Types.ObjectId, ref: "businesses", required:true}
    products: { type: [porductCart]},
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
