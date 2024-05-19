import React, { useEffect, useState } from "react";
import "./Order.scss";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import img1 from "./../../../assets/checkout-item.png";
import img2 from "./../../../assets/checkout-item2.png";
import axois from "axios";
import { api } from "../../../constant/constant";
import moment from "moment";
import { useSelector } from "react-redux";
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

const paidTag = <div className="paidTag">Paid</div>;
const wayPaidTag = <div className="wayPaidTag">Wait Pay</div>;

const Order = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const navigate=useNavigate()
  const {tenatURL}=useParams()
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const handleTabClick = (event) => {
    if (event.target.value == "All") {
      setActiveTab(event.target.value);
      setOrderList(initialOrderList);
    } else {
      setActiveTab(event.target.value);
      setOrderList(
        initialOrderList.filter(
          (order) => order.statusPayment == event.target.value
        )
      );
    }
  };
  const [initialOrderList, setInitialOrderList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const totalPages = Math.ceil(orderList.length / 10);
  const getOrder = async () => {
    const orders = await axois.get(`${api}order`, config);
    console.log(orders.data);
    setOrderList(orders.data.data);
    setInitialOrderList(orders.data.data);
  };
  useEffect(() => {
    getOrder();
  }, []);

  //   const getTotalPrice = (deliveryFee = 0) =>
  //     getPriceExpr(
  //       orderbook.reduce((prev, curr) => {
  //         return prev + curr.price * (1 - curr.discount / 100) * curr.count;
  //       }, deliveryFee)
  //     );

  return (
    <div className="Order-container">
      <div className="header">
        <div className="title">Orders</div>
      </div>
      <div className="list-contaniner">
        <div className="status">
          <div className="lable-status">Status</div>
          <select
            name="selectStatusShipp"
            id=""
            value={activeTab}
            onChange={handleTabClick}
            className="select-status-box"
          >
            <option value="All">All</option>
            <option value="Unpaid">Wait Pay</option>
            {/* <option value="Transport">Transport</option> */}
            <option value="Paid">Paid</option>
            {/* <option value="Cancelled">Cancelled</option> */}
          </select>
        </div>
        <Box
          width="100%"
          overflow="auto"
          backgroundColor="white"
          minHeight={450}
        >
          <StyledTable>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#F5F5F5",
                }}
              >
                <TableCell align="left" className="order-id lable-order" >
                  Order ID
                </TableCell>
                <TableCell align="left" className="customer lable-order">
                  Customer
                </TableCell>
                <TableCell align="left" className="date lable-order">
                  Date
                </TableCell>
                <TableCell align="left" className="payment lable-order">
                  Payment Status
                </TableCell>
                <TableCell align="left" className="total lable-order">
                  Total
                </TableCell>
                <TableCell align="left" className="order-status lable-order">
                  Order Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.length > 0 &&
                orderList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        navigate(`/${tenatURL}/business/order/${item._id}`);
                      }}
                      className="order-body"
                    >
                      <TableCell
                        align="left"
                        className="order-id blue"
                        sx={{ maxWidth: 173,minWidth: 140 }}
                      >
                        {item._id}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="customer content-order"
                        sx={{ maxWidth: 140 }}
                      >
                        {item.customerID?.firstName}
                        {item.customerID?.lastName}
                      </TableCell>
                      <TableCell align="left" className="date content-order">
                        {moment(item.createdAt).format("D MMM, YYYY h:mm A")}
                      </TableCell>
                      <TableCell align="left" className="payment">
                        {item.statusPayment === "Paid" ? paidTag:wayPaidTag}
                      </TableCell>
                      <TableCell align="left" className="total content-order">
                        {item.totalPrice}
                        {""} đ
                      </TableCell>
                      <TableCell align="left" className="order-status">
                        In Shipped
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </StyledTable>
        </Box>
        <div className="pages">
          <div className="pages-number">
            {1 * (page + 1)}-
            {page == totalPages - 1 ? orderList.length : 5 * (page + 1)} of{" "}
            {orderList.length}
          </div>
          <button
            className="button-back"
            onClick={() => handleChangePage(page - 1)}
            disabled={page == 0}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`${page == 0 ? "icon-back" : "active"}`}
            />
          </button>
          <div className="number-page">{page + 1}</div>
          <button
            className="button-next"
            onClick={() => handleChangePage(page + 1)}
            disabled={page == totalPages - 1}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${page == totalPages - 1 ? "icon-next" : "active"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
