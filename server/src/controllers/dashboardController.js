const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
function getDayOfWeek(day) {
  let dayOfWeek;
  switch (day) {
    case 0:
      dayOfWeek = "Sun";
      break;
    case 1:
      dayOfWeek = "Mon";
      break;
    case 2:
      dayOfWeek = "Tue";
      break;
    case 3:
      dayOfWeek = "Wed";
      break;
    case 4:
      dayOfWeek = "Thu";
      break;
    case 5:
      dayOfWeek = "Fri";
      break;
    case 6:
      dayOfWeek = "Sat";
  }
  return dayOfWeek;
}
function get7Days() {
  const today = new Date("2024-05-08T17:07:06.495+00:00");
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    let weekDay = new Date(today);
    weekDay.setDate(today.getDate() - i);
    weekDays.push({
      dayOfWeek: getDayOfWeek(weekDay.getDay()),
      day: weekDay.toISOString().split("T")[0],
      numberOfOrder: [0, 0],
    });
  }

  return weekDays;
}
function getPercent(thisMonth, lastMonth) {
  if (thisMonth == 0) {
    return { type: 3, value: 0 };
  }
  if (lastMonth == 0) {
    return { type: 4, value: 0 };
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

const dashboardController = {
  getDataOrderWeek: async (req, res) => {
    const InitialorderInWeek = get7Days();
    const totalOrder = await Order.find({ tenantID: req.tenantID });
    const orderInWeek = InitialorderInWeek.map((day) => {
      let numOrderWebsite = totalOrder.reduce(function (total, order) {
        if (
          order.createdAt.toISOString().startsWith(day.day) &&
          order.typeOrder === "Website"
        ) {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
      let numOrderSendo = totalOrder.reduce(function (total, order) {
        if (
          order.createdAt.toISOString().startsWith(day.day) &&
          order.typeOrder === "Sendo"
        ) {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
      return { ...day, numberOfOrder: [numOrderWebsite, numOrderSendo] };
    });
    res.json(orderInWeek);
  },
  getDataRevenue: async (req, res) => {
    const InitialorderInWeek = get7Days();
    const totalOrder = await Order.find({
      tenantID: req.tenantID,
      // ,is_refund:false
      // ,shipping_status:"delivered"
    });
    const RevenueInWeek = InitialorderInWeek.map((day) => {
      let numOrderWebsite = totalOrder.reduce(function (total, order) {
        if (
          order.createdAt.toISOString().startsWith(day.day) &&
          order.typeOrder === "Website"
        ) {
          return total + parseInt(order.totalPrice);
        } else {
          return total;
        }
      }, 0);
      let numOrderSendo = totalOrder.reduce(function (total, order) {
        if (
          order.createdAt.toISOString().startsWith(day.day) &&
          order.typeOrder === "Sendo"
        ) {
          return total + parseInt(order.totalPrice);
        } else {
          return total;
        }
      }, 0);
      return { ...day, numberOfOrder: [numOrderWebsite, numOrderSendo] };
    });
    RevenueInWeek.reverse();

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    let dayOfMonth = [];
    switch (month) {
      case 2:
        dayOfMonth[0] = {
          firstDate: new Date(`${year}-${month}-01`),
          endDate: new Date(`${year}-${month}-07`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-08`),
          endDate: new Date(`${year}-${month}-14`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-15`),
          endDate: new Date(`${year}-${month}-21`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-22`),
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
          endDate: new Date(`${year}-${month}-08`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-09`),
          endDate: new Date(`${year}-${month}-16`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-17`),
          endDate: new Date(`${year}-${month}-24`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-25`),
          endDate: new Date(`${year}-${month}-31`),
        };
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dayOfMonth[0] = {
          firstDate: new Date(`${year}-${month}-01`),
          endDate: new Date(`${year}-${month}-08`),
        };
        dayOfMonth[1] = {
          firstDate: new Date(`${year}-${month}-09`),
          endDate: new Date(`${year}-${month}-16`),
        };
        dayOfMonth[2] = {
          firstDate: new Date(`${year}-${month}-17`),
          endDate: new Date(`${year}-${month}-24`),
        };
        dayOfMonth[3] = {
          firstDate: new Date(`${year}-${month}-25`),
          endDate: new Date(`${year}-${month}-30`),
        };
        break;
    }
    const InitialRevenueData = [0, 0, 0, 0];
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
      data: { month: { dayOfMonth, RevenueMonth }, week: RevenueInWeek },
    });
  },
  getTopSelling: async (req, res) => {
    const totalOrder = await Order.find({
      tenantID: req.tenantID,
      // ,is_refund:false
      // ,shipping_status:"delivered"
    });
    const listProducts = [];
    for (let order in totalOrder) {
      for (let product in totalOrder[order].products) {
        listProducts.push(totalOrder[order].products[product]);
      }
    }
    const productCount = {};
    listProducts.forEach((product) => {
      const productId = product.product;
      if (productCount[productId]) {
        productCount[productId] += product.quantity;
      } else {
        productCount[productId] = product.quantity;
      }
    });
    const productList = Object.keys(productCount).map((productId) => ({
      productId,
      count: productCount[productId],
    }));
    productList.sort((a, b) => b.count - a.count);
    const topProductID = productList
      .slice(0, 5)
      .map((product) => product.productId);
    const topProducts = await Product.find({ _id: { $in: topProductID } }); // theo tenantID nua
    // product List chứa product và count
    const topProductList = productList.slice(0, 5).map((product) => {
      const getProduct = topProducts.filter(
        (productInTop) => productInTop._id == product.productId
      );

      return {
        ...product,
        product: getProduct[0],
      };
    });

    res.json(topProductList);
  },
  getDataCard: async (req, res) => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const lastMonth = today.getMonth();
    const totalOrder = await Order.find({
      tenantID: req.tenantID,
      // is_refund: false,
    });
    const orderThisMonth = totalOrder.filter(
      (order) => order.createdAt.getMonth() + 1 == thisMonth
    );
    const orderLastMonth = totalOrder.filter(
      (order) => order.createdAt.getMonth() + 1 == lastMonth
    );
    const countTotalOrder = totalOrder.length;
    const countOrderThisMonth = orderThisMonth.length;
    const countOrderLastMonth = orderLastMonth.length;
    const countProductThisMonth = orderThisMonth.reduce((total, order) => {
      const countProduct = order.products.reduce((count, product) => {
        return count + product.quantity;
      }, 0);
      return total + countProduct;
    }, 0);
    const countProductLastMonth = orderLastMonth.reduce((total, order) => {
      const countProduct = order.products.reduce((count, product) => {
        return count + product.quantity;
      }, 0);
      return total + countProduct;
    }, 0);
    const countTotalProduct = totalOrder.reduce((total, order) => {
      const countProduct = order.products.reduce((count, product) => {
        return count + product.quantity;
      }, 0);
      return total + countProduct;
    }, 0);
    const totalCustomer = await Customer.find({ tenantID: req.tenantID });
    const countTotalCustomer = totalCustomer.length;
    const countThisMonthCustomer = totalCustomer.filter(
      (product) => product.createdAt.getMonth() + 1 == thisMonth
    ).length;
    const countLastMonthCustomer = totalCustomer.filter(
      (product) => product.createdAt.getMonth() + 1 == lastMonth
    ).length;
    res.json({
      customer: {
        countTotalCustomer,
        countThisMonthCustomer,
        countLastMonthCustomer,
        percent: getPercent(countThisMonthCustomer, countLastMonthCustomer),
      },
      order: {
        countTotalOrder,
        countOrderThisMonth,
        countOrderLastMonth,
        percent: getPercent(countOrderThisMonth, countOrderLastMonth),
      },
      product: {
        countProductThisMonth,
        countProductLastMonth,
        countTotalProduct,
        percent: getPercent(countProductThisMonth, countProductLastMonth),
      },
    });
  },
};
module.exports = dashboardController;
