const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config()
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const PORT = 3001;
app.use(cors());
const MONGODB_URI =
  "mongodb+srv://admin:admin123@database.vaoigd5.mongodb.net/";

// // Connect
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
const paymentRoutes = require("./routes/paymentRoutes")
app.use("/product", productRoutes);
app.use("/staff", staffRoutes);
app.use("/website", websiteRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/business", authBusinessRoutes);
app.use("/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
