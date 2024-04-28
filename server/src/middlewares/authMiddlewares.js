const jwt = require("jsonwebtoken");
const Staff=require("../models/staffModel")
const Customer=require("../models/customerModel")

const authMiddlewares={
    //verifyToken
    verifyToken: async (req,res,next)=>{
        let token
        if(req.header('Authorization') && req.header('Authorization').startsWith('Bearer')){
            token = req.header('Authorization').split(' ')[1]
            if(!token){
                return res.json("You are not authenticated")
            }
            
            jwt.verify(token,process.env.JWT_SECRET_KEY, async(err,user)=>{
                if(err)
                {
                    return res.json("You are not authenticated")
                }
                req.user=await Staff.find({_id:user.id,tenantID:user.tenantID}).select('-password')
                req.tenantID=user.tenantID
                next()
            })
        }
        if(!token){
           return res.json("You are not authenticated")
        }
        
    }
    ,
    verifyAdminAuth: (req, res,next) => {
        authMiddlewares.verifyToken(req,res,()=>{
            if(req.user[0].position === "Admin" || req.user[0].id===req.params.id){
                next();
            }
            else{
               return res.json({success:false,data:"You are not authorization"})
            }
        })
    },
    verifyTokenCustomer:async (req,res,next)=>{
        let token
        if(req.header('Authorization') && req.header('Authorization').startsWith('Bearer')){
            token = req.header('Authorization').split(' ')[1]
            if(!token){
                return res.json("You are not authenticated")
            }
            
            jwt.verify(token,process.env.JWT_SECRET_KEY, async(err,user)=>{
                if(err)
                {
                    return res.json("You are not authenticated")
                }
                req.user=await Customer.find({_id:user.CustomerID,tenantID:user.tenantID}).select('-password')
                req.tenantID=user.tenantID
                next()
            })
        }
        if(!token){
           return res.json("You are not authenticated")
        }
        
    }
}
module.exports =authMiddlewares