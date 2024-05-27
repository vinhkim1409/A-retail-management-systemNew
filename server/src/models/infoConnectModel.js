const mongoose = require('mongoose');

const infoConnectSchema = new mongoose.Schema({
    tenantID: mongoose.Schema.Types.ObjectId,
    shop_key: String,
    secret_key: String
});

const InfoConnect = mongoose.model('InfoConnect', infoConnectSchema, 'infoconnects');

module.exports = InfoConnect;