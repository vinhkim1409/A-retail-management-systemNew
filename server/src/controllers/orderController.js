const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Business = require("../models/businessModel");
const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path');
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
    console.log(order.buyer_ward.split("//")[0]);
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
          to_name: `${order.buyer_firstName}${order.buyer_lastName}`,
          to_phone: order?.buyer_phoneNumber,
          to_address: `${order?.buyer_address_detail}, ${order.buyer_ward.split("//")[0]
            }, ${order.buyer_district.split("//")[0]}, ${order.buyer_province.split("//")[0]
            }, Vietnam`,
          to_ward_name: `${order.buyer_ward.split("//")[0]}`,
          to_district_name: `${order.buyer_district.split("//")[0]}`,
          to_province_name: `${order.buyer_province.split("//")[0]}`,
          cod_amount: COD ? order.totalPrice : 0,
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
const getLocalDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
const orderController = {
  accessToken: "",
  loadAccessToken: function () {
    const tokenPath = path.join(__dirname, '../token.txt');
    fs.readFile(tokenPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading access token file:', err);
        process.exit(1);
      }
      this.accessToken = data.trim();
      console.log('Access Token loaded:', this.accessToken);
    });
  },
  createOrder: async (req, res) => {
    try {
      //create order
      const user = req.user[0];
      const { products } = req.body;
      //delete product from cart
      const delivery = await createShippingOrder(req.body, true);
      const newOrder = new Order({
        customerID: user._id,
        tenantID: req.tenantID,
        typeOrder: "Website",
        shippingCode: delivery ? delivery.order_code : "null",
        ...req.body,
      });
      await newOrder.save();
      const conditionCart = { customerID: user._id };
      const productIds = products.map((product) => {
        return product._id;
      });
      deleteProductFromCart(conditionCart, productIds);
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
      const order = await Order.find({
        customerID: customer._id,
        _id: req.params.orderID,
      })
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
    } catch (error) { }
  },
  getInfoOrder: async (req, res) => {
    try {
      const date_to = getLocalDateString();

      const response = await fetch('https://open.sendo.vn/api/partner/salesorder/search', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${orderController.accessToken}`,
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify({
          "page_size": 50,
          "order_status": 2,
          "order_date_from": "2024/03/20",
          "order_date_to": date_to,
          "order_status_date_from": null,
          "order_status_date_to": null,
          "token": null
        })
      });

      const data = await response.json();

      if (data.success) {
        const skuDetails = data.result.data.map(order => order.sku_details);
        const flattenedSkuDetails = skuDetails.flat();

        for (const skuDetail of flattenedSkuDetails) {
          const product = await Product.findOne({ sku: skuDetail.sku });

          if (product) {
            product.stock_quantity -= skuDetail.quantity;
            await product.save();
            console.log(`Updated stock for product ${skuDetail.product_name}: ${product.stock_quantity}`);
          } else {
            // Tách giá trị SKU thành hai phần
            const [productSku, variantSku] = skuDetail.sku.split('-');

            // Tìm sản phẩm dựa trên SKU sản phẩm
            const product = await Product.findOne({ sku: productSku });

            if (product) {
              // Tìm variant dựa trên variant_sku
              const variant = product.variants.find(v => v.variant_sku === variantSku);

              if (variant) {
                variant.variant_quantity -= skuDetail.quantity;
                await product.save();
                console.log(`Updated stock for variant ${skuDetail.product_name} (${variantSku}): ${variant.variant_quantity}`);
              } else {
                console.error(`Variant with SKU ${variantSku} not found for product ${productSku}`);
              }
            } else {
              console.error(`Product with SKU ${productSku} not found`);
            }
          }
        }

        console.log("skuDetails", skuDetails);
        res.json({ success: true, sku_details: skuDetails });
      } else {
        res.status(500).json({ message: 'Failed to fetch order details from Sendo' });
      }
    } catch (error) {
      console.error('Lỗi khi gọi API Sendo:', error);
      res.status(500).json({ message: error.message });
    }
  },



  init: function () {
    this.loadAccessToken();
  }
};
orderController.init();

module.exports = orderController;
