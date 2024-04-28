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
      const salt = await bcrypt.genSalt(11);
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
      const newCart = new Cart({
        customerID: newCustomer._id,
      });
      await newCustomer.save();
      await newCart.save();
      const resCustomer = { ...newCustomer };
      delete resCustomer.password;
      res.json({ success: true, data: resCustomer._doc });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const business = await Business.findOne({
        tenantURL: req.body.tenantURL,
      });
      const customer = await Customer.findOne({
        email: req.body.email,
        tenantID: business._id,
      });
      if (!customer) {
        return res.json("Wrong email or password!");
      }
      const validPassword = bcrypt.compare(
        req.body.password,
        customer.password
      );
      if (!validPassword) {
        return res.json("Wrong email or password!");
      }
      if (customer) {
        const accessToken = jwt.sign(
          {
            customerID: customer._id,
            tenantID: business._id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
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
};
