import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import "./OrderCustomer.scss";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import img1 from "./../../../assets/checkout-item.png";
import img2 from "./../../../assets/checkout-item2.png";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const configStatus = (status) => {
  if (status) {
    let result = status.replace(/_/g, " ");
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }
};

const OrderCustomer = () => {
  const [activeTab, setActiveTab] = useState("All");
  const handleTabClick = (event, cityName) => {
    setActiveTab(cityName);
    if (cityName == "redelivery_request") {
      const order = initialOrders.filter((order) => order.is_refund == true);
      setOrders(order);
      return;
    }
    if (cityName == "All") {
      setOrders(initialOrders);
      return;
    }
    const order = initialOrders.filter(
      (order) => order.shipping_status == cityName
    );
    setOrders(order);
  };
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const { tenantURL } = useParams();
  const navigate = useNavigate();
  const [initialOrders, setInitialOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const orders = await axios.get(`${api}order/customer`, config);
    console.log(orders.data.data);
    orders.data.data.reverse();
    setInitialOrders(orders.data.data);
    setOrders(orders.data.data);
  };
  const checkShipingStatus = async () => {
    const orders = await axios.get(`${api}order/check-shipping-status`, config);
    console.log(orders.data);
  };
  useEffect(() => {
    if (!customer) {
      navigate(`/${tenantURL}/customer/login`);
    } else {
      checkShipingStatus();
      getOrders();
    }
  }, []);

  return (
    <div className="OrderCustomer-container">
      <div className="header">
        <div className="title">Order Website</div>
      </div>

      <div className="tab">
        <button
          className={`tablinks ${activeTab === "All" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "All")}
        >
          All
        </button>
        <button
          className={`tablinks ${
            activeTab === "ready_to_pick" ? "active" : ""
          }`}
          onClick={(e) => handleTabClick(e, "ready_to_pick")}
        >
          Preparing
        </button>
        <button
          className={`tablinks ${activeTab === "delivering" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "delivering")}
        >
          Delivering
        </button>
        <button
          className={`tablinks ${activeTab === "delivered" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "delivered")}
        >
          Delivered
        </button>
        <button
          className={`tablinks ${activeTab === "cancel" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "cancel")}
        >
          Cancel
        </button>
        <button
          className={`tablinks ${
            activeTab === "redelivery_request" ? "active" : ""
          }`}
          onClick={(e) => handleTabClick(e, "redelivery_request")}
        >
          Redelivery request
        </button>
      </div>

      <div className="content">
        {orders?.map((order) => (
          <div
            className="order"
            key={order?._id}
            onClick={() => {
              navigate(`/${tenantURL}/customer/detail-order/${order._id}`);
            }}
          >
            <div className="order-miniInfo">
              <div className="date">
                Order Date:
                {moment(order.createdAt).format("D MMM, YYYY h:mm A")}
              </div>
              <div className="status">
                Shipping Status:{configStatus(order?.shipping_status)}
              </div>
            </div>

            <Box width="100%" overflow="auto" backgroundColor="white">
              <StyledTable>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <TableCell align="left" className="product lable-product">
                      Product
                    </TableCell>
                    <TableCell align="left" className="quantity lable-product">
                      Quantity
                    </TableCell>
                    <TableCell align="left" className="amount lable-product">
                      Amounts
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.products.map((item, index) => (
                    <TableRow key={index} className="order-body">
                      <TableCell align="left" className="product">
                        <div className="product-container">
                          <img
                            src={item?.product_img[0]}
                            alt=""
                            className="img"
                          />
                          <div className="name-frame">
                            <div className="name-product">
                              {item.product?.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className="quantity content-order"
                        // sx={{ maxWidth: 140 }}
                      >
                        {item?.quantity}
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {item?.unit_price}đ
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="order-body">
                    <TableCell align="left" className="product">
                      Total Amounts:
                    </TableCell>
                    <TableCell
                      align="left"
                      className="quantity content-order"
                      // sx={{ maxWidth: 140 }}
                    >
                      {order.products.reduce((total, product) => {
                        return total + product.quantity;
                      }, 0)}
                    </TableCell>
                    <TableCell align="left" className="amount content-order">
                      {order.products.reduce((total, product) => {
                        return total + product?.unit_price * product?.quantity;
                      }, 0)}
                      đ
                    </TableCell>
                  </TableRow>
                </TableBody>
              </StyledTable>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCustomer;
