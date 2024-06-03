const PackageOrder = require("../models/packageOrderModel");
const { default: mongoose } = require("mongoose");
const packageOrderController = {
  createOrder: async (req, res) => {
    const newOrder = new PackageOrder({
    tenantID: new mongoose.Types.ObjectId(req.body.tenantID),
      typePackage: req.body.typePackage,
      totalPrice: req.body.totalPrice,
    });
    await newOrder.save()
    res.json(newOrder);
  },
};

module.exports =packageOrderController;
