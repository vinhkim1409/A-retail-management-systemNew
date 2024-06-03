const PackageOrder = require("../models/packageOrderModel");
const Business = require("../models/businessModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function getPercent(thisMonth, lastMonth) {
  if (thisMonth == 0) {
    return { type: 3, value: 0 };
  }
  if (lastMonth == 0) {
    return { type: 4, value: 0 };
  }
  if (thisMonth == lastMonth) {
    return {
      type: 1,
      value: 0,
    };
  }
  if (thisMonth > lastMonth) {
    return {
      type: 1,
      value: parseFloat(((lastMonth / thisMonth) * 100).toFixed(2)),
    };
  }
  return {
    type: 2,
    value: parseFloat(((thisMonth / lastMonth) * 100).toFixed(2)),
  };
}

const adminController = {
  getDataCardAdmin: async (req, res) => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const lastMonth = today.getMonth();
    const totalOrder = await PackageOrder.find();
    const totalBusiness = await Business.find();
    const paidThisMonth = totalOrder.filter(
      (order) => order.createdAt.getMonth() + 1 == thisMonth
    );
    const paidLastMonth = totalOrder.filter(
      (order) => order.createdAt.getMonth() == lastMonth
    );
    const registerThisMonth = totalBusiness.filter(
      (business) => business.createdAt.getMonth() + 1 == thisMonth
    ).length;
    const registerLastMonth = totalBusiness.filter(
      (business) => business.createdAt.getMonth() == lastMonth
    ).length;

    const revenueThisMonth = paidThisMonth.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);
    const revenueLastMonth = paidLastMonth.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);

    res.json({
      revenue: {
        thisMonth: revenueThisMonth,
        lastMonth: revenueLastMonth,
        percent: getPercent(revenueThisMonth, revenueLastMonth),
      },
      paid: {
        thisMonth: paidThisMonth.length,
        lastMonth: paidLastMonth.length,
        percent: getPercent(paidThisMonth.length, paidThisMonth.length),
      },
      register: {
        thisMonth: registerThisMonth,
        lastMonth: registerLastMonth,
        percent: getPercent(registerThisMonth, registerLastMonth),
      },
    });
  },
  getDataRevenue: async (req, res) => {
    const totalOrder = await PackageOrder.find();
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    let dayOfMonth = [];
    switch (month) {
      case 2:
        dayOfMonth[0] = {
          firstDate: new Date(`${year}-${month}-01`),
          endDate: new Date(`${year}-${month}-03`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-04`),
          endDate: new Date(`${year}-${month}-07`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-08`),
          endDate: new Date(`${year}-${month}-11`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-12`),
          endDate: new Date(`${year}-${month}-15`),
        };
        dayOfMonth[4] = {
          firstDate: new Date(`${year}-${month}-16`),
          endDate: new Date(`${year}-${month}-19`),
        };
        dayOfMonth[5] = {
          firstDate: new Date(`${year}-${month}-20`),
          endDate: new Date(`${year}-${month}-23`),
        };
        dayOfMonth[6] = {
          firstDate: new Date(`${year}-${month}-24`),
          endDate: new Date(`${year}-${month}-28`),
        };

        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dayOfMonth[0] = {
          firstDate: new Date(`${year}-${month}-01`),
          endDate: new Date(`${year}-${month}-04`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-05`),
          endDate: new Date(`${year}-${month}-09`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-10`),
          endDate: new Date(`${year}-${month}-13`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-14`),
          endDate: new Date(`${year}-${month}-17`),
        };
        dayOfMonth[4] = {
          firstDate: new Date(`${year}-${month}-18`),
          endDate: new Date(`${year}-${month}-22`),
        };
        dayOfMonth[5] = {
          firstDate: new Date(`${year}-${month}-23`),
          endDate: new Date(`${year}-${month}-26`),
        };
        dayOfMonth[6] = {
          firstDate: new Date(`${year}-${month}-27`),
          endDate: new Date(`${year}-${month}-31`),
        };
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dayOfMonth[0] = {
          firstDate: new Date(`${year}-${month}-01`),
          endDate: new Date(`${year}-${month}-04`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-05`),
          endDate: new Date(`${year}-${month}-09`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-10`),
          endDate: new Date(`${year}-${month}-13`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-14`),
          endDate: new Date(`${year}-${month}-17`),
        };
        dayOfMonth[4] = {
          firstDate: new Date(`${year}-${month}-18`),
          endDate: new Date(`${year}-${month}-22`),
        };
        dayOfMonth[5] = {
          firstDate: new Date(`${year}-${month}-23`),
          endDate: new Date(`${year}-${month}-26`),
        };
        dayOfMonth[6] = {
          firstDate: new Date(`${year}-${month}-27`),
          endDate: new Date(`${year}-${month}-30`),
        };
        break;
    }
    const InitialRevenueData = [0, 0, 0, 0, 0, 0, 0];
    const RevenueMonth = InitialRevenueData.map((data, index) => {
      const totalRevenueData = totalOrder.reduce(function (total, order) {
        if (
          order.createdAt >= dayOfMonth[index].firstDate &&
          order.createdAt <= dayOfMonth[index].endDate
        ) {
          return total + parseInt(order.totalPrice);
        } else {
          return total;
        }
      }, 0);
      return totalRevenueData;
    });
    res.json({
      success: true,
      data: { month: { dayOfMonth, RevenueMonth } },
    });
  },
  getBuisness: async (req, res) => {
    const business = await Business.find();
    res.json({ success: true, data: business });
  },
  signupAdmin: async (req, res) => {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const adminExitEmail = await Admin.findOne({ email });
      if (adminExitEmail) {
        return res.json({ success: false, message: "Email has been used" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newAdmin = new Admin({
        email: email,
        password: hashed,
        name: name,
        phoneNumber: phoneNumber,
      });
      await newAdmin.save();
      res.json({ success: true, data: newAdmin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const user = await Admin.findOne({ email: req.body.email });
      if (!user) {
        return res.json({
          success: false,
          message: "Wrong email or password!",
        });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.json({
          success: false,
          message: "Wrong email or password!",
        });
      }
      if (user) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        const { password, ...resAdmin } = user._doc;
        res.json({ success: true, data: { resAdmin, accessToken } });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = adminController;
