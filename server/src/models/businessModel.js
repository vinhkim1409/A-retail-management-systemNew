const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true},
    password: {type: String, trim: true, require: true, minLength: 8},
    name: {type: String, required: true, minLength: 5},
    tenantURL: {type: String,},
    taxcode: {type: String, },
    location: {type: [String], },
    websiteConfig:{ type: mongoose.Schema.Types.ObjectId, ref: "websites" },
    package:{
        type:{
            typePackage:{type:Number, required: true},
            duration:{type: Number, required: true},
            startDate:{type: Date, required: true},
            endDate:{type: Date, required: true},
        },
    },
    customersWeb:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customers" }] },
    orderWeb:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }] },
    orderThird:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }] },
    status:{type:String} // status: active, ban, pending
},{
    timestamps:true,
});

const Business = mongoose.model('business', businessSchema);

module.exports = Business;
