const { createHmac } = require("crypto");
const fetch = require("node-fetch");

const MonoController = {
  payOrderMomo: async (req, res) => {
    //Tạo 1 order có status là chưa thanh toán xong đưa order id vào data sau khi thanh toán xong thì lấy order id ra chỉnh
     const user=req.user[0]
      const partnerCode = process.env.PARTNER_CODE;
      const accessKey = process.env.ACCESS_KEY;
      const secretkey = process.env.SECRET_KEY;
      const lang = "vi";
      const requestType = "linkWallet";
      const orderInfo = "Thanh toán qua ví MoMo";
      const ipnUrl = "http://localhost:3001/order/notify_payment";
      const redirectUrl = `${process.env.REDIRECT_URL_ORDER}/${req.body.tenantURL}/customer/cart`;
      const partnerClientId = process.env.PARTNER_CLIENT_ID;
      const data = {
        buyer:user._id.toString(),
        products:req.body.products.toString(),
       
      };
      const deliveryFee =  0;
      const extraData = Buffer.from(JSON.stringify(data)).toString("base64");
      res.json(data)
      // const requestId = "657342ee8e03b1440287e216" + new Date().getTime();
      // const rawSignature =
      //   "accessKey=" +
      //   accessKey +
      //   "&amount=" +
      //   (req.body.totalPrice) +
      //   "&extraData=" +
      //   extraData +
      //   "&ipnUrl=" +
      //   ipnUrl +
      //   "&orderId=" +
      //   requestId +
      //   "&orderInfo=" +
      //   orderInfo +
      //   "&partnerClientId=" +
      //   partnerClientId +
      //   "&partnerCode=" +
      //   partnerCode +
      //   "&redirectUrl=" +
      //   redirectUrl +
      //   "&requestId=" +
      //   requestId +
      //   "&requestType=" +
      //   requestType;

      // const signature = createHmac("sha256", secretkey).update(rawSignature).digest("hex");

      // const requestBody = JSON.stringify({
      //   partnerCode: partnerCode,
      //   partnerClientId: partnerClientId,
      //   requestId: requestId,
      //   amount: req.body.totalPrice,
      //   orderId: requestId,
      //   orderInfo: orderInfo,
      //   redirectUrl: redirectUrl,
      //   ipnUrl: ipnUrl,
      //   requestType: requestType,
      //   extraData: extraData,
      //   lang: lang,
      //   signature: signature,
      // });

      // const response = await fetch("https://test-payment.momo.vn/v2/gateway/api/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: requestBody,
      // });
      // return res.status(200).json(await response.json());
  

  },
};
module.exports =MonoController
