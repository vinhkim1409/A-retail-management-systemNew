const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios"); // Thêm dòng này để import axios
const fs = require("fs"); // Thêm dòng này để import fs
const path = require('path');

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Hàm đăng nhập và lưu token
async function loginAndSaveToken() {
  const apiUrl = 'https://open.sendo.vn/login';

  const requestData = {
    shop_key: "ade9a5e7a2e84a8c99e95f3a58ef215d",
    secret_key: "126585a0ae2d4bfcbd8d4c50a3dfa6f2"
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;
    if (responseData.success) {
      const token = responseData.result.token;
      // Lưu token vào file
      const tokenPath = path.join(__dirname, 'token.txt'); // Xác định đường dẫn chính xác đến token.txt
      fs.writeFile(tokenPath, token, (err) => {
        if (err) throw err;
        console.log('Token đã được lưu vào file.');
      });
    } else {
      console.error('Đăng nhập không thành công:', responseData.error);
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error);
  }
}

loginAndSaveToken().then(() => {
  startServer();
}).catch((error) => {
  console.error('Lỗi khi đăng nhập:', error);
});

function startServer() {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const PORT = process.env.PORT || 5000;
  app.use(cors(corsOptions));
  // app.use(cors());
  const MONGODB_URI =
    "mongodb+srv://adminsystem:admin123456@database.a0scdtm.mongodb.net/";

  // // Kết nối với MongoDB
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Database",
  });

  // Middleware
  app.use(express.json());

  // Routes
  const productRoutes = require("./routes/productRoutes");
  const staffRoutes = require("./routes/staffRoutes");
  const websiteRoutes = require("./routes/wesiteRoutes");
  const categoryRoutes = require("./routes/categoryRoutes");
  const cartRoutes = require("./routes/cartRoutes");
  const orderRoutes = require("./routes/orderRoutes");
  const authBusinessRoutes = require("./routes/authBusinessRoutes");
  const customerRoutes = require("./routes/customerRoutes");
  const paymentRoutes = require("./routes/paymentRoutes");
  const attributeRoutes = require("./routes/attributeRoutes");
  const dashboardRoutes = require("./routes/dashboardRoutes")
  const reviewRoutes=require("./routes/reviewRoutes")
  const packageOrderRoutes=require("./routes/packageOrderRoutes")
  const adminRoutes=require("./routes/adminRoutes")
  // const infoRoutes = require("./routes/infoRoutes");
  const attributeApiRoutes = require('./scripts/attribute_api');
  const infoConnectRoutes = require("./routes/infoConnectRoutes")
 


  app.use("/product", productRoutes);
  app.use("/staff", staffRoutes);
  app.use("/website", websiteRoutes);
  app.use("/category", categoryRoutes);
  app.use("/cart", cartRoutes);
  app.use("/order", orderRoutes);
  app.use("/business", authBusinessRoutes);
  app.use("/payment", paymentRoutes);
  app.use("/customer", customerRoutes);
  app.use("/attributes", attributeRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/review", reviewRoutes);
  app.use("/package", packageOrderRoutes);
  app.use("/admin", adminRoutes);
  // app.use("/info", infoRoutes);
  app.use("/info-connect", infoConnectRoutes);
  app.use("/category-info", attributeApiRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}