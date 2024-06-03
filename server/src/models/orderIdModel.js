const mongoose = require('mongoose');

const infoConnectSchema = new mongoose.Schema({
    tenantID: mongoose.Schema.Types.ObjectId,
    order_number: String
});

const OrderId = mongoose.model("orderId", infoConnectSchema, "orderids");

module.exports = OrderId;