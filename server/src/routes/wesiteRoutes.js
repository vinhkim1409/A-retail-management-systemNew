const express = require("express");
const router = express.Router();
const Website = require("../models/websiteModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  try {
    const website = await Website.find()
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { picture, featProduct } = req.body;

    const newFeatProduct = featProduct.map((product) => {
      return mongoose.Types.ObjectId(product._id);
    });

    const newWebsite = new Website({
      businessImg: picture,
      featureProduct: newFeatProduct,
    });
    await newWebsite.save();
    res.json(newWebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/edit", async (req, res) => {
  try {
    const { picture, featProduct } = req.body;
    
    const newFeatProduct =featProduct.map((product) => {
      return new mongoose.Types.ObjectId(product._id);
     
    });
    const updateWebCondition={_id:"65f46182d5b409e1e06b8960"}
    const newWebsite = {
      businessImg: picture,
      featureProduct: newFeatProduct,
    };
   const updateWebsite=await Website.findByIdAndUpdate(updateWebCondition,newWebsite,{ new: true })
    res.json(updateWebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
