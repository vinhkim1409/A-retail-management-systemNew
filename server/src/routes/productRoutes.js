const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Route để lấy toàn bộ dữ liệu sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({isDeleted:false});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//[POST] /product/add
router.post('/add', async (req, res) => {
  const {name,industry,picture,decsciption,detailInfo,saleInfo}=req.body
  const saleInfoProduct=saleInfo.map((info)=>{
    return {
      class1:{
        id:info.color.id,
        name:info.color.name
      },
      class2:{
        id:info.size.id,
        name:info.size.name
      },
      buyPrice:info.buy,
      sellPrice:info.sell,
      quantity:info.quantity
    }
  })
  const newProduct=new Product({
    name:name,
    industry:industry,
    picture:picture,
    decsciption:"decsciption",
    detailInfo:detailInfo,
    saleInfo:saleInfoProduct,
    isDeleted:false
  })
  await newProduct.save()
  res.json(newProduct);
})
router.put('/delete/:id',async (req, res)=>{
  try {
    const productDeleteCondition={ _id: req.params.id }; // tenantId:tenantId
    const deleteProduct=await Product.findByIdAndUpdate(productDeleteCondition,{$set:{isDeleted:true}})
    if (!deleteProduct) {
      return res
        .status(401)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
      staff: deleteProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})
module.exports = router;
