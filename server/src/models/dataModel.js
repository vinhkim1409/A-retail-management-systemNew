const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // 
});

const Data = mongoose.model('Product', dataSchema);

module.exports = Data;
