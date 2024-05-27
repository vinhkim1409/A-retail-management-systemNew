const express = require("express");
const router = express.Router();

//load model
const Category = require("../models/categoryModel");
const authMiddlewares =require("../middlewares/authMiddlewares")
const CategoryController=require("../controllers/categoryController")


router.get("/",CategoryController.getAllCategory );
router.get("/:id",CategoryController.getCategoryById);
router.post("/",authMiddlewares.verifyToken,CategoryController.addNewCategory);
router.put("/add-product/:id",CategoryController.addProductToCategory);

module.exports = router;
