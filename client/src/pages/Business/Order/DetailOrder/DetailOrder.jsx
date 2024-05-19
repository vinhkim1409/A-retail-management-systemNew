import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import axios from "axios";
import { api } from "../../../../constant/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { getPriceExpr } from "../../../../utils/getPriceRepr";

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

const DetailOrderBusiness = () => {
  const [order, setOrder] = useState();
  const { tenatURL, id } = useParams();
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getOrder = async () => {
    const order = await axios.get(`${api}order/business/${id}`, config);
    console.log(order.data.data);
    setOrder(order.data.data);
  };
  const getTotalPrice = (deliveryFee = 0) =>
    getPriceExpr(
      order?.products.reduce((prev, curr) => {
        return (
          prev +
          (curr.variant > 0
            ? curr.product.variants[curr.variant - 1].variant_special_price
            : curr.product.price) *
            curr.quantity
        );
      }, deliveryFee)
    );
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className="detailorder-container">
        <div className="header">
          <div className="title">Order Detail</div>
        </div>
        <div className="detail-info">
          <div className="order-info">
            <div className="label-frame">
              <div className="content-label">
                <div className="order-id">Order ID: #{order?._id}</div>
                <div className="mini-label">
                  <div className="order-date">
                    Order Date:
                    {moment(order?.createdAt).format("D MMM, YYYY h:mm A")}
                  </div>
                  <div className="payment-status">
                    {order?.statusPayment == "Paid" ? paidTag : wayPaidTag}
                  </div>
                </div>
              </div>
              {order?.statusPayment == "Paid" ? (
                <></>
              ) : (
                <button className="action">Payment Confirm</button>
              )}
            </div>
            <div className="list-product">
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
                      <TableCell align="left" className="product lable-product">
                        Product
                      </TableCell>
                      <TableCell
                        align="left"
                        className="quantity lable-product"
                      >
                        Quantity
                      </TableCell>
                      <TableCell align="left" className="amount lable-product">
                        Amounts
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
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
                                <div className="sku">SKU:1</div>
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
                          <TableCell
                            align="left"
                            className="amount content-order"
                          >
                            {(item?.variant > 0
                              ? item.product.variants[item.variant - 1]
                                  .variant_special_price
                              : item.product.price) * item?.quantity}
                            đ
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </StyledTable>
              </Box>
            </div>
          </div>
          <div className="another-info">
            <div className="order-summary">
              <div className="summary-label">Order Summary</div>
              <Box
                width="100%"
                overflow="auto"
                backgroundColor="white"
                sx={{ marginBottom: 1 }}
              >
                <StyledTable>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <TableCell
                        align="left"
                        className="description lable-product"
                      >
                        Descriptions
                      </TableCell>
                      <TableCell align="left" className="amount lable-product">
                        Amounts
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Sub Total :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getTotalPrice()}đ
                      </TableCell>
                    </TableRow>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Discount :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {0}đ
                      </TableCell>
                    </TableRow>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Shipping Charge :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getPriceExpr(Number(order?.shipPrice))}đ
                      </TableCell>
                    </TableRow>
                    <TableRow
                      className="order-body"
                      sx={{ borderBottom: 2, borderColor: "white" }}
                    >
                      <TableCell align="left" className="description">
                        Total Amount :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getTotalPrice(Number(order?.shipPrice))}đ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </Box>
            </div>
            <div className="ship-info">
              <div className="ship-label">Delivery Infomation</div>
              <div className="person-info">
                <div className="label">Name:</div> {order?.buyer_firstName}{" "}
                {order?.buyer_lastName}
              </div>
              <div className="phone-number">
                <div className="label"> Phone Number:</div>{" "}
                {order?.buyer_phoneNumber}
              </div>
              <div className="address">
                <div className="label">Address:</div>{" "}
                {order?.buyer_address_detail}
                {","}
                {order?.buyer_ward.split("//")[0]}
                {","}
                {order?.buyer_district.split("//")[0]}
                {","}
                {order?.buyer_province.split("//")[0]}
              </div>
              <div className="ship-status">
                <div className="label"> Shipping Status:</div>
                {"Transaction"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailOrderBusiness;
