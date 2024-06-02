const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Business = require("../models/businessModel");
const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
const fetch = require("node-fetch");
async function deleteProductFromCart(conditionCart, idProductInCart) {
  try {
    const updateCart = await Cart.findOneAndUpdate(
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
async function reduceQuantity(productIncart) {
  const product = await Product.findOne({ _id: productIncart.product });
  if (productIncart.variant == 0) {
    product.stock_quantity = product.stock_quantity - productIncart.quantity;
    await product.save();
  } else {
    product.variants[productIncart.variant - 1].variant_quantity =
      product.variants[productIncart.variant - 1].variant_quantity -
      productIncart.quantity;
    await product.save();
  }
}

const createShippingOrder = async (order, COD, refund = false) => {
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
    let weight = 0;
    let totalPrice = 0;

    if (refund) {
      weight = order.products.reduce((total, product) => {
        return total + product.weight * product.quantity;
      }, 0);
      totalPrice = parseFloat(order.totalPrice);
    } else {
      weight = order.products.reduce((total, product) => {
        return total + product.product.weight * product.quantity;
      }, 0);
      totalPrice = order.totalPrice;
    }

    // console.log(order.buyer_ward.split("//")[0], typeof totalPrice);
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
          note: "Đơn hàng của BKM",
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
          to_name: `${order.buyer_firstName} ${order.buyer_lastName}`,
          to_phone: order?.buyer_phoneNumber,
          to_address: `${order?.buyer_address_detail}, ${
            order.buyer_ward.split("//")[0]
          }, ${order.buyer_district.split("//")[0]}, ${
            order.buyer_province.split("//")[0]
          }, Vietnam`,
          to_ward_name: `${order.buyer_ward.split("//")[0]}`,
          to_district_name: `${order.buyer_district.split("//")[0]}`,
          to_province_name: `${order.buyer_province.split("//")[0]}`,
          cod_amount: COD ? totalPrice : 0,
          content: "Theo New York Times",
          weight: weight,
          length: 10,
          width: 10,
          height: 10,
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
const getShippingStatus = async (order_code) => {
  try {
    const responseOrder = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "fee29a3e-08ed-11ef-a6e6-e60958111f48",
        },
        body: JSON.stringify({ order_code: order_code }),
      }
    );
    const data = await responseOrder.json();
    if (data) {
      return data.data;
    } else {
      return "Null";
    }
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

      const delivery = await createShippingOrder(req.body, true);
      const status = await getShippingStatus(delivery.order_code);
      const productArray = products.map((product) => {
        const productImg = product.product.pictures.map((productImage) => {
          return productImage.picture_url;
        });

        const productInOrder = {
          product: product.product._id,
          product_idThir: product.product.id,
          product_name: product.product.name,
          product_sku: product.product.sku,
          variant: product.variant,
          quantity: product.quantity,
          unit_price:
            product.variant == 0
              ? product.product.special_price
              : product.product.variants[product.variant - 1]
                  .variant_special_price,
          weight: product.product.weight,
          product_img: productImg,
          description: product.product.description,
          unit_id: product.product.unit_id,
        };
        return productInOrder;
      });
      const newOrder = new Order({
        customerID: user._id,
        tenantID: req.tenantID,
        typeOrder: "Website",
        shippingCode: delivery ? delivery.order_code : "null",
        orderStatus: "Delivery",
        shipping_status: status.status ? "ready_to_pick" : status.status,
        ...req.body,
        products: productArray,
      });
      await newOrder.save();
      if (products[0]._id != "buy now") {
        //delete product from cart
        // const conditionCart = { customerID: user._id };
        // deleteProductFromCart(conditionCart, productIds);
      }

      // const productIds = products.map((product) => {
      //   return product._id;
      // });

      newOrder.products.map((product) => {
        reduceQuantity(product);
      });

      res.json({ success: true, data: newOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderCustomer: async (req, res) => {
    try {
      const customer = req.user[0];
      const order = await Order.find({ customerID: customer._id }).populate(
        "customerID"
      );
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderCustomerById: async (req, res) => {
    try {
      const customer = req.user[0];
      const order = await Order.find({
        customerID: customer._id,
        _id: req.params.orderID,
      }).populate("customerID");
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
      const orderRequest = await Order.find({
        tenantID: req.tenantID,
        is_refund: true,
      })
        .populate("customerID")
        .populate("products.product");
      const arrayOrder = orderRequest.concat(order);
      const resOrder = [...new Set(arrayOrder)];
      res.json({ success: true, data: resOrder });
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
  handlPayOrder: async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.body.orderID },
        { statusPayment: "Paid" },
        { new: true }
      )
        .populate("customerID")
        .populate("products.product");
      if (order) {
        res.json({ success: true, data: order });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  notifyOrderCustomer: async (req, res) => {
    try {
      console.log("Notify Order Customer");
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
            shippingCode: delivery ? delivery.order_code : "null",
          },
          { new: true }
        ).populate("products.product");
        if (secondStepOrder) {
          console.log("success");
        }
        console.log("success");
      } else {
        console.log(`Thanh toán thất bại, resultCode: ${resultCode}`);
      }
      return res.status(200).json("OK");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  checkShippingStatus: async (req, res) => {
    try {
      const orders = await Order.find({ customerID: req.user[0]._id });
      let array = [];
      orders.map(async (order, index) => {
        if (!order.is_cancel && order.shippingCode) {
          const status = await getShippingStatus(order.shippingCode);
          if (status != null) {
            const orderUpdate = await Order.findOneAndUpdate(
              { _id: order._id },
              {
                shipping_status: status.status,
                date_update_shipping_statu: new Date(),
              },
              { new: true }
            );
          }
        }
      });

      res.json(array);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createRedeliveryRequest: async (req, res) => {
    try {
      const orderRedelivery = await Order.findOneAndUpdate(
        { _id: req.params.orderID },
        {
          is_refund: true,
          refund_picture: req.body.refund_picture,
          type_reason: req.body.reason,
          refund_status: "Pending",
          orderStatus: "Redelivery",
        },
        { new: true }
      );
      if (orderRedelivery) {
        return res.json({ success: true, data: orderRedelivery });
      }
      res.json({ success: false, data: "Create Request Failed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  rejectRequest: async (req, res) => {
    try {
      const orderRedelivery = await Order.findOneAndUpdate(
        { _id: req.body.orderID, tenantID: req.tenantID },
        {
          refund_status: "Reject",
        },
        { new: true }
      );
      if (orderRedelivery) {
        return res.json({ success: true, data: orderRedelivery });
      }
      res.json({ success: false, data: "Reject Request Failed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  acceptRequest: async (req, res) => {
    try {
      const orderRedelivery = await Order.findOneAndUpdate(
        { _id: req.body.orderID, tenantID: req.tenantID },
        {
          refund_status: "Accept",
        },
        { new: true }
      );
      //tạo một đơn hàng mới
      let newOrderData = orderRedelivery.toObject();
      delete newOrderData._id;
      delete newOrderData.createdAt;
      delete newOrderData.updatedAt;
      const delivery = await createShippingOrder(orderRedelivery, true, true);
      const status = await getShippingStatus(delivery?.order_code);
      const newOrder = new Order({
        ...newOrderData,
        type_reason: "",
        refund_status: "",
        is_refund: false,
        shippingCode: delivery ? delivery.order_code : "null",
        shipping_status: status.status ? "ready_to_pick" : status.status,
        refund_picture: [],
        orderStatus: "Delivery",
      });
      await newOrder.save()
      res.json({ success: true, newOrder, orderRedelivery });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  confirmReceipt: async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.body.orderID, tenantID: req.tenantID },
        {
          is_confirmed: true,
        },
        { new: true }
      );
      if (order) {
        return res.json({ success: true, data: order });
      }
      res.json({ success: false, data: "Confirm Failed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = orderController;
