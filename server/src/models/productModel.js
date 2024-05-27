const mongoose = require("mongoose");

const variantAttributeSchema = new mongoose.Schema({
  attribute_id: Number,
  option_id: Number
});

const variantSchema = new mongoose.Schema({
  variant_attributes: [variantAttributeSchema],
  variant_sku: String,
  variant_price: Number,
  variant_promotion_start_date: Date,
  variant_promotion_end_date: Date,
  variant_special_price: Number,
  variant_quantity: Number
});

const pictureSchema = new mongoose.Schema({
  picture_url: String
});

const attributeValueSchema = new mongoose.Schema({
  id: Number,
  value: String,
  attribute_img: String,
  is_selected: Boolean,
  is_custom: Boolean
});

const attributeSchema = new mongoose.Schema({
  attribute_id: Number,
  attribute_is_custom: Boolean,
  attribute_is_checkout: Boolean,
  attribute_values: [attributeValueSchema]
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: String,
  price: Number,
  weight: Number,
  stock_availability: Boolean,
  description: String,
  cat_4_id: Number,
  product_image: String,
  height: Number,
  length: Number,
  width: Number,
  unit_id: Number,
  stock_quantity: Number,
  avatar: pictureSchema,
  pictures: [pictureSchema],
  attributes: [attributeSchema],
  promotion_from_date: Date,
  promotion_to_date: Date,
  is_promotion: Boolean,
  extended_shipping_package: {
    is_using_instant: Boolean,
    is_using_in_day: Boolean,
    is_self_shipping: Boolean,
    is_using_standard: Boolean
  },
  is_config_variant: Boolean,
  variants: [variantSchema],
  special_price: Number,
  voucher: {
    product_type: Number,
    start_date: Date,
    end_date: Date,
    is_check_date: Boolean
  },
  ratingPoint: {type:String,default:"0"},
  ratingCount: {type:Number,default:0},
  isDelete:{type:Boolean,default:false},
  tenantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
}, {
  timestamps: true
});

productSchema.path('variants').required(false);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
