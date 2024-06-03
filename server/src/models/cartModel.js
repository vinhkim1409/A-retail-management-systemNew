const Product=require("./productModel")
const mongoose = require("mongoose");

const porductCart = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant:{
    type:Number,
    required: true,
    default:0
  },
  quantity:{
    type:Number,
    required: true,
    default:1
  },

});

const cartSchema = new mongoose.Schema(
  {
    customerID:{type: mongoose.Schema.Types.ObjectId, ref: "customers", required:true},
    //  tennatID:{type: mongoose.Schema.Types.ObjectId, ref: "businesses", required:true}
    products: { type: [porductCart], default:[]},
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
