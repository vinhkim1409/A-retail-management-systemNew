const express = require("express");
const router = express.Router();
const Website = require("../models/websiteModel");
const Product = require("../models/productModel");
const Business = require("../models/businessModel");
const mongoose = require("mongoose");
const authMiddlewares = require("../middlewares/authMiddlewares");
router.get("/:tenantURL", async (req, res) => {
  try {
    const business = await Business.findOne({ tenantURL: req.params.tenantURL });
    const website = await Website.findOne({tenantID:business._id});
    if(business && !website) {
      const newWebsite = new Website({
        tenantID: business._id,
        businessImg:[],
        logo:""
      })
      newWebsite.save();
      return res.json(newWebsite);
    }
    return res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", authMiddlewares.verifyToken, async (req, res) => {
  try {
    const { picture } = req.body;
    const tenantID = req.tenantID;
    const newWebsite = new Website({
      businessImg: picture,
      tenantID: tenantID,
    });
    await newWebsite.save();
    res.json(newWebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/edit",authMiddlewares.verifyToken, async (req, res) => {
  try {
    const { picture, featProduct } = req.body;
    const newWebsite = {
      businessImg: picture,
    };
    const updateWebsite = await Website.findOneAndUpdate(
      {tenantID:req.tenantID},
      newWebsite,
      { new: true }
    );
    res.json(updateWebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
