const express = require("express");
const router = express.Router();

//load model
const Category = require("../models/categoryModel");
const authMiddlewares =require("../middlewares/authMiddlewares")
const CategoryController=require("../controllers/categoryController")


router.get("/by-tenantURL/:tenantURL",CategoryController.getAllCategory );
router.get("/:id/:tenantURL",CategoryController.getCategoryById);
router.post("/",authMiddlewares.verifyToken,CategoryController.addNewCategory);
router.put("/delete",authMiddlewares.verifyToken,CategoryController.deleteCategory);
router.put("/add-product/:id",CategoryController.addProductToCategory);

module.exports = router;
