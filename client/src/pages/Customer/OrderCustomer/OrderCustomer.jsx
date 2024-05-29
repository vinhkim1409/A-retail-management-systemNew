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

const OrderCustomer = () => {
  const [activeTab, setActiveTab] = useState("All");
  const handleTabClick = (event, cityName) => {
    setActiveTab(cityName);
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
  useEffect(() => {
    getOrders();
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
          className={`tablinks ${activeTab === "Wait-pay" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "Wait-pay")}
        >
          Unpaid
        </button>
        <button
          className={`tablinks ${activeTab === "Transport" ? "active" : ""}`}
          onClick={(e) => handleTabClick(e, "Transport")}
        >
          Paid
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
              <div className="status"></div>
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
                            src={item?.product?.avatar?.picture_url}
                            alt=""
                            className="img"
                          />
                          <div className="name-frame">
                            <div className="name-product">
                              {item.product.name}
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
                        {(item?.variant > 0
                          ? item.product?.variants[item.variant - 1]
                              .variant_special_price
                          : item.product.price) * item?.quantity}
                        đ
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
                        return (
                          total +
                          (product?.variant > 0
                            ? product.product?.variants[product.variant - 1]
                                .variant_special_price
                            : product.product.price) *
                            product?.quantity
                        );
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
