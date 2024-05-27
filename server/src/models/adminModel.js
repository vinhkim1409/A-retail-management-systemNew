const mongoose=require('mongoose')
 
const adminSchema= new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password:{type:String,required:true},
    phoneNumber:{type:String},


},{
    timestamps:true
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin