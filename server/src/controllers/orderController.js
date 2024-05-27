const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Business = require("../models/businessModel");
const { default: mongoose } = require("mongoose");
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
const createShippingOrder = async (order, COD) => {
  try {
    let maxHeight = 0;
    let maxWidth = 0;
    let maxLength = 0;
    order.products.forEach((product) => {
      if (
        product.product &&
        product.product.height &&
        product.product.height > maxHeight
      ) {
        maxHeight = product.product.height;
      }
      if (
        product.product &&
        product.product.width &&
        product.product.width > maxWidth
      ) {
        maxWidth = product.product.width;
      }
      if (
        product.product &&
        product.product.length &&
        product.product.length > maxLength
      ) {
        maxWidth = product.product.length;
      }
    });

    const weight = order.products.reduce((total, product) => {
      return total + product.product.weight * product.quantity;
    }, 0);
    const response = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "fee29a3e-08ed-11ef-a6e6-e60958111f48",
        },
        body: JSON.stringify({
          payment_type_id: 2,
          note: "Tintest 123",
          required_note: "KHONGCHOXEMHANG",
          return_phone: "0332190158",
          return_address: "39 NTT",
          return_district_id: null,
          return_ward_code: "",
          client_order_code: "",
          from_name: "TinTest124",
          from_phone: "0987654321",
          from_address:
            "KTX Khu A DHQG, P. Linh Trung, TP Thủ Đức, Hồ Chí Minh, Vietnam",
          from_ward_name: "P. Linh Trung",
          from_district_name: "TP Thủ Đức",
          from_province_name: "HCM",
          to_name: `${order.buyer_firstName}${order.buyer_lastName}`,
          to_phone: order?.buyer_phoneNumber,
          to_address: `${buyer_address_detail}, ${buyer_ward}, ${buyer_district}, ${buyer_province}, Vietnam`,
          to_ward_name: ` ${buyer_ward}`,
          to_district_name: `${buyer_district}`,
          to_province_name: `${buyer_province}`,
          cod_amount: 200000,
          content: "Theo New York Times",
          weight: weight,
          length: maxLength,
          width: maxWidth,
          height: maxHeight,
          cod_failed_amount: 2000,
          pick_station_id: 1444,
          deliver_station_id: null,
          insurance_value: 10000,
          service_id: 0,
          service_type_id: 2,
          coupon: null,
          pickup_time: 1692840132,
          pick_shift: [2],
          items: [
            {
              name: "Áo Polo",
              code: "Polo123",
              quantity: 1,
              price: 200000,
              length: 12,
              width: 12,
              weight: 1200,
              height: 12,
              category: {
                level1: "Áo",
              },
            },
          ],
        }),
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const orderController = {
  createOrder: async (req, res) => {
    try {
      //create order
      const user = req.user[0];
      const { products } = req.body;
      const newOrder = new Order({
        customerID: user._id,
        tenantID: req.tenantID,
        typeOrder: "Website",
        ...req.body,
      });
      await newOrder.save();
      //delete product from cart
      const conditionCart = { customerID: user._id };
      const productIds = products.map((product) => {
        return product._id;
      });
      deleteProductFromCart(conditionCart, productIds);

      // trừ đi số lượng trong kho
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderCustomer: async (req, res) => {
    try {
      const customer = req.user[0];
      const order = await Order.find({ customerID: customer._id })
        .populate("customerID")
        .populate("products.product");
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderCustomerById: async (req, res) => {
    try {
      const customer = req.user[0];
      const order = await Order.find({ customerID: customer._id,_id:req.params.orderID })
        .populate("customerID")
        .populate("products.product");
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderBusiness: async (req, res) => {
    try {
      const order = await Order.find({ tenantID: req.tenantID })
        .populate("customerID")
        .populate("products.product");
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderBusinessById: async (req, res) => {
    try {
      const order = await Order.findOne({
        tenantID: req.tenantID,
        _id: req.params.orderID,
      })
        .populate("customerID")
        .populate("products.product");
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  notifyOrderCustomer: async (req, res) => {
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
      if (resultCode === 0) {
        const firtStepOrder = await Order.findOne({
          _id: data.orderId,
        }).populate("products.product");
        const delivery = await createShippingOrder(firtStepOrder, false);
        const secondStepOrder = await Order.findOneAndUpdate(
          { _id: data.orderId },
          {
            statusPayment: "Paid",
            shippingCode: delivery.order_code,
          },
          { new: true }
        ).populate("products.product");

        console.log("success");
      } else {
        console.log(`Thanh toán thất bại, resultCode: ${resultCode}`);
      }
      return res.status(200).json("OK");
    } catch (error) {}
  },
};
module.exports = orderController;
