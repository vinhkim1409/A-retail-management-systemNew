const Category = require("../models/categoryModel");
const { default: mongoose } = require("mongoose");
const CategoryController = {
  getAllCategory: async (req, res, next) => {
    try {
      const categorys = await Category.find({ isDeleted: false });
      res.json(categorys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCategoryById: async (req, res, next) => {
    try {
      const categorys = await Category.find({
        isDeleted: false,
        _id: req.params.id,
      }).populate("products");
      res.json(categorys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addNewCategory: async (req, res, next) => {
    try {
      const newCategorys = new Category({ ...req.body, isDeleted: false });
      await newCategorys.save();
      res.json(newCategorys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addProductToCategory: async (req, res, next) => {
    try {
      const { product } = req.body;
      const addProductCondition = { _id: req.params.id };
      const listProduct = product.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
      const addProduct = await Category.findOneAndUpdate(
        addProductCondition,
        { $set: { product: listProduct } },
        { new: true }
      );
      res.json(addProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CategoryController
