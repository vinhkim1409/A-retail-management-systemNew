const Customer = require("../models/customerModel");
const Business = require("../models/businessModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const customerController = {
  customerRegister: async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, password, email, tenantURL } =
        req.body;
      const business = await Business.findOne({ tenantURL: tenantURL });

      const checkEmail = await Customer.findOne({
        tenantID: business._id,
        email: email,
      });
      if (checkEmail) {
        return res.json({ success: false, message: "Email has been used" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // tạo một cart cho customer
      const newCustomer = new Customer({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        tenantID: business._id,
        password: hashed,
      });
      await newCustomer.save();
      const newCart = new Cart({
        customerID: newCustomer._id,
      });
      await newCart.save();

      res.json({ success: true, data: newCustomer });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  customerLogin: async (req, res) => {
    try {
      const business = await Business.findOne({
        tenantURL: req.body.tenantURL,
      });
      const customer = await Customer.findOne({
        email: req.body.email,
        tenantID: business._id,
      });
      if (!customer) {
        return res.json({ sucess: false, message: "Wrong email or password!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        customer.password
      );
      if (!validPassword) {
        return res.json({ sucess: false, message: "Wrong email or password!" });
      }
      if (customer) {
        const accessToken = jwt.sign(
          {
            customerID: customer._id,
            tenantID: business._id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        const { password, ...resCustomer } = customer._doc;
        return res.json({
          success: true,
          data: {
            resCustomer,
            accessToken,
          },
        });
      }
      res.json({ success: false, message: "An unknown error" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  customerAddAddress: async (req, res) => {
    try {
      const newAddress = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        province: req.body.province,
        district: req.body.district,
        ward: req.body.ward,
        detail: req.body.detail,
      };
      const addNewAddress = await Customer.findByIdAndUpdate(
        { _id: req.user[0]._id },
        { $push: { address: newAddress } },
        { new: true }
      );
      const { password, ...resCustomer } = addNewAddress._doc;
      if (addNewAddress) {
        return res.json({ success: true, data: resCustomer });
      }
      return res.json({ success: false, data: "Add new address failed" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSelfCustomer: async (req, res) => {
    try {
      if (req.user) {
        return res.json({ success: true, data: req.user[0] });
      }
      return res.json({ success: false, data: "Get customer failed" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getWebsiteCustomerByBusiness: async (req, res) => {
    try {
      const customer = await Customer.find({ tenantID: req.tenantID });
      if (customer) {
        return res.json({ success: true, data: customer });
      }
      return res.json({ success: false, data: "An Unknown error" });
    } catch (error) {}
  },
  checkerEmail: async (req, res) => {
    try {
      const customer = await Customer.findOne({ email: req.body.email });
      if (customer) {
        res.json({ success: false, message: "email already use" });
      } else {
        res.json({ success: true, message: "email not use" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = customerController;
