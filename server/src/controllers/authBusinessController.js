const Business = require("../models/businessModel");
const Staff = require("../models/staffModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const businessController = {
  // đăng nhập lần đầu sẽ tại websiteConfig => giải quyết đc coi cái đó có đăng nhập lần đầu chưa
  registerBusiness: async (req, res, next) => {
    try {
      const {
        email,
        password,
        name,
        tenantURL,
        taxcode,
        location,
        phoneNumber,
      } = req.body;

      const businessExitEmail = await Business.findOne({ email });
      if (businessExitEmail) {
        return res.json({ success: false, message: "Email has been used" });
      }
      const businessExitURL = await Business.findOne({ tenantURL });
      if (businessExitURL) {
        return res.json({ success: false, message: "Shop URL has been used" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newBusiness = new Business({
        email: email,
        name: name,
        tenantURL: tenantURL,
        taxcode: taxcode,
        location: location,
        password: hashed,
      });

      await newBusiness.save();
      const firstStaff = new Staff({
        firstname: "Administrator",
        lastname: name,
        tenantID: newBusiness._id,
        email: email,
        phoneNumber: phoneNumber,
        position: "Admin",
        canModify: false,
        password: hashed,
        avatar:""
      });
      await firstStaff.save();

      res.json({ success: true, data: { newBusiness, firstStaff } });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginBusiness: async (req, res, next) => {
    try {
      const business = await Business.findOne({
        tenantURL: req.body.tenantURL,
      });
      const user = await Staff.findOne({
        email: req.body.email,
        tenantID: business._id,
      });

      if (!user) {
        return res.status(404).json({sucess:false,message:"Wrong email or password!"});
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json({sucess:false,message:"Wrong email or password!"});
      }
      if (user ) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            position: user.position,
            tenantID: user.tenantID,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        const { password, ...resUser } = user._doc;
        res.json({ resUser, accessToken,tenantURL:business.tenantURL });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = businessController;
