const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddlewares");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Kiểm tra xem id có phải là ObjectId hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const deletedProduct = await Product.findOneAndDelete({_id:productId});

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
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

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

router.put("/update-quantity", async (req, res) => {
  const { id, quantity, variant_sku } = req.body;

  try {
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
      variant.variant_quantity = variant.variant_quantity + quantity;
    } else {
      product.stock_quantity = product.stock_quantity + quantity;
    }

    await product.save();
    res.json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product quantity", error });
  }
});

module.exports = router;
