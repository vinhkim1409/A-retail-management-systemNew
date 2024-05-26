const { createHmac } = require("crypto");
const fetch = require("node-fetch");
const Order = require("../models/orderModel");
const Business = require("../models/businessModel");
async function deleteProductFromCart(conditionCart, idProductInCart) {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      conditionCart,
      { $pull: { products: { _id: idProductInCart } } },
      { new: true }
    );
    if (!updateCart) {
      console.log("Cart Order Failed");
    } else {
      console.log("Cart Order Success");
    }
  } catch (error) {
    console.error("Lỗi khi cố gắng xóa sản phẩm khỏi giỏ hàng:", error);
  }
}

const MonoController = {
  payOrderMomo: async (req, res) => {
    //Tạo 1 order có status là chưa thanh toán xong đưa order id vào data sau khi thanh toán xong thì lấy order id ra chỉnh
    const user = req.user[0];
    const partnerCode = process.env.PARTNER_CODE;
    const accessKey = process.env.ACCESS_KEY;
    const secretkey = process.env.SECRET_KEY;
    const lang = "vi";
    const requestType = "linkWallet";
    const orderInfo = "Thanh toán qua ví MoMo";
    const ipnUrl = process.env.IPN_URL_ORDER;
    const redirectUrl = `${process.env.REDIRECT_URL_ORDER}${req.body.tenantURL}/customer/cart`;
    const partnerClientId = process.env.PARTNER_CLIENT_ID;

    const newOrder = new Order({
      customerID: user._id,
      tenantID: req.tenantID,
      typeOrder: "Website",
      ...req.body,
    });
    await newOrder.save();
    const data = {
      buyer: user._id.toString(),
      orderId: newOrder._id,
    };
    const deliveryFee = 0;
    const extraData = Buffer.from(JSON.stringify(data)).toString("base64");
    const requestId = "657342ee8e03b1440287e216" + new Date().getTime();
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      req.body.totalPrice +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      requestId +
      "&orderInfo=" +
      orderInfo +
      "&partnerClientId=" +
      partnerClientId +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerClientId: partnerClientId,
      requestId: requestId,
      amount: req.body.totalPrice,
      orderId: requestId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      requestType: requestType,
      extraData: extraData,
      lang: lang,
      signature: signature,
    });

    const response = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    res
      .status(200)
      .json({ momoInfo: await response.json(), orderInfo: newOrder });
  },
  payPackageMomo: async (req, res) => {
    const partnerCode = process.env.PARTNER_CODE;
    const accessKey = process.env.ACCESS_KEY;
    const secretkey = process.env.SECRET_KEY;
    const lang = "vi";
    const requestType = "linkWallet";
    const orderInfo = "Thanh toán qua ví MoMo";
    const ipnUrl = process.env.IPN_URL_PACKAGE;
    const redirectUrl = `${process.env.REDIRECT_URL_ORDER}${req.body.tenantURL}/business`;
    const partnerClientId = process.env.PARTNER_CLIENT_ID;

    const today = new Date();
    const data = {
      buyer: req.tenantID.toString(),
      typePackage: req.body.typePackage,
      duration: req.body.duration,
      startDate: today,
      totalPrice: req.body.totalPrice,
    };
    const extraData = Buffer.from(JSON.stringify(data)).toString("base64");
    const requestId = req.tenantID.toString() + new Date().getTime();
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      req.body.totalPrice +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      requestId +
      "&orderInfo=" +
      orderInfo +
      "&partnerClientId=" +
      partnerClientId +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerClientId: partnerClientId,
      requestId: requestId,
      amount: req.body.totalPrice,
      orderId: requestId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      requestType: requestType,
      extraData: extraData,
      lang: lang,
      signature: signature,
    });

    const response = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    res
      .status(200)
      .json({success:true, momoInfo: await response.json()});
  },
  packageNotification: async (req, res) => {
   try {
     const accessKey = process.env.ACCESS_KEY;
     const secretkey = process.env.SECRET_KEY;
 
     const {
       partnerCode,
       orderId,
       requestId,
       amount,
       orderInfo,
       orderType,
       transId,
       resultCode,
       message,
       payType,
       responseTime,
       extraData,
       signature,
     } = req.body;
     const data = JSON.parse(Buffer.from(extraData, "base64").toString());
     if (resultCode == 0) {
       const endDate = new Date(startDate);
       endDate.setDate(endDate.getDate() + newPackage.duration);
       const newPackage = {
         typePackage: data.typePackage,
         duration: data.duration,
         startDate: data.startDate,
         endDate: endDate,
       };
       const business = await Business.findOneAndUpdate(
         { _id: data.buyer },
         {
           package: newPackage,
         },
         { new: true }
       );
       console.log("success");
       return res.status(200).json("OK");
     }
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
  },
};
module.exports = MonoController;
