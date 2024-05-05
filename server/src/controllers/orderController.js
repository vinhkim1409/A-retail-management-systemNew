const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
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
const createShippingOrder = async (product, order, cod) => {
    try {
      const response = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "fee29a3e-08ed-11ef-a6e6-e60958111f48",
        },
        body: JSON.stringify({
          payment_type_id: 2,
          note: "Đơn hàng của Business",
          required_note: "CHOXEMHANGKHONGTHU",
          from_name: product.lastName,
          from_phone: product.phoneNumber,
          from_address: `${product.address}, ${product.ward.split("//")[0]}, ${product.district.split("//")[0]}, ${
            product.province.split("//")[0]
          }, Vietnam `,
          from_ward_name: product.ward.split("//")[0],
          from_district_name: product.district.split("//")[0],
          from_province_name: product.province.split("//")[0],
          return_phone: product.lastName,
          return_address: `${product.address}, ${product.ward.split("//")[0]}, ${product.district.split("//")[0]}, ${
            book.province.split("//")[0]
          }, Vietnam `,
          return_district_id: null,
          return_ward_code: "",
          client_order_code: "",
          to_name: order.name,
          to_phone: order.phone,
          to_address: `${order.address}, ${order.ward.split("//")[0]}, ${order.district.split("//")[0]}, ${
            order.province.split("//")[0]
          }, Vietnam `,
          to_ward_code: String(order.ward.split("//")[1]),
          to_district_id: 1444,
          cod_amount: cod ? book.price : 0,
          content: "Theo New York Times",
          weight: 1,
          length: 1,
          width: 1,
          height: 1,
          pick_station_id: 1444,
          deliver_station_id: null,
          insurance_value: 10000,
          service_id: 0,
          service_type_id: 2,
          coupon: null,
          pick_shift: [2],
          items: [
            {
              name: book.name,
              code: "BKBook2023",
              quantity: 1,
              price: book.price,
              length: 1,
              width: 1,
              height: 1,
              weight: 100,
            },
          ],
        }),
      });
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
      const { products } = req.body;
      const newOrder = new Order(req.body);
      await newOrder.save();
      //delete product from cart
      const conditionCart = { _id: "65ff0b618c26cfb533caa40c" };
      const productIds = products.map((product) => {
        return product._id;
      });
      deleteProductFromCart(conditionCart, productIds);

      //tạo phiếu xuất
      // trừ đi số lượng trong kho
      // ghi lại vào lịch sử bán
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderCustomer: async (req, res) => {
    try {
      const customer = req.user[0];
      const order = await Order.find({ customerIDid: customer._id });
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderBusiness: async (req, res) => {
    try {
      const business = req.user[0];
      const order = await Order.find();
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  notifyOrderCustomer: async (req, res) => {
    console.log("Ok");
  }
};
module.exports = orderController;
