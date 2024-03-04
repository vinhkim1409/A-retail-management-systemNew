const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Route để lấy toàn bộ dữ liệu sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
