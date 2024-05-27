const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Business = require("../models/businessModel");
const { default: mongoose } = require("mongoose");

const productController={
    getByTenantURL: async (req, res) => {
        try {
          const business = await Business.find({ tenantURL: req.params.tenantURL });
          const products = await Product.find({ tenantID: business[0]._id });
          res.json(products);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
    getTopSale:async (req, res) => {
        try {
          const business = await Business.find({ tenantURL: req.params.tenantURL });
          const products = await Product.find({ tenantID: business[0]._id });
          const totalOrder = await Order.find({ tenantID: business[0]._id });
          const listProducts = [];
          for (let order in totalOrder) {
            for (let product in totalOrder[order].products) {
              listProducts.push(totalOrder[order].products[product]);
            }
          }
          const productCount = {};
          listProducts.forEach((product) => {
            const productId = product.product;
            if (productCount[productId]) {
              productCount[productId] += product.quantity;
            } else {
              productCount[productId] = product.quantity;
            }
          });
          const productList = Object.keys(productCount).map((productId) => ({
            productId,
            count: productCount[productId],
          }));
          productList.sort((a, b) => b.count - a.count);
          res.json(productList);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
    addNewProduct:async (req, res) => {
        try {
          const productData = req.body;
          const newProduct = new Product({ tenantID: req.tenantID, ...productData });
          await newProduct.save();
          res.status(201).json(newProduct);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    deleteProduct: async (req, res) => {
        try {
          const productId = req.params.id;
      
          // Kiểm tra xem id có phải là ObjectId hợp lệ hay không
          if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
          }
          const deletedProduct = await Product.findOneAndDelete({ _id: productId });
      
          if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct,
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error deleting product", error: error.message });
        }
      },
    getById: async (req, res) => {
        try {
          const product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.json(product);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    updateQuantity:async (req, res) => {
        const { id, quantity, variant_sku } = req.body;
      
        const intQuantity = parseInt(quantity);
        try {
          // const productId = mongoose.Types.ObjectId(id);
          const product = await Product.findById(id);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          if (product.is_config_variant) {
            const variant = product.variants.find(
              (v) => v.variant_sku === variant_sku
            );
            if (!variant) {
              return res.status(404).json({ message: "Variant not found" });
            }
            variant.variant_quantity = variant.variant_quantity + intQuantity;
          } else {
            product.stock_quantity = product.stock_quantity + intQuantity;
          }
      
          await product.save();
          res.json({ message: "Product quantity updated successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error updating product quantity", error });
        }
      },
    updateProduct:async (req, res) => {
        try {
          const productId = req.params.id;
          const updateData = req.body;
          const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
          );
      
          if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
          });
        } catch (error) {
          res.status(500).json({ message: "Error updating product", error });
        }
      },

}
module.exports =productController