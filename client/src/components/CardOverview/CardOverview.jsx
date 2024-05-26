import React, { useEffect, useState } from "react";
import "./CardOverview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faCartShopping,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../constant/constant";
import { useSelector } from "react-redux";
const CardOverView = ({ tenantURL }) => {
  console.log(tenantURL);
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const percentUp = (number) => (
    <>
      <FontAwesomeIcon icon={faArrowUp} />
      <div className="number-percent">{number}%</div>
    </>
  );
  const percentDown = (number) => (
    <>
      <FontAwesomeIcon icon={faArrowDown} />
      <div className="number-percent">{number}%</div>
    </>
  );
  const navigate = useNavigate();
  const [cardData, setCardData] = useState();
  const getCardData = async () => {
    const cardData = await axios.get(`${api}dashboard/card-data`,config);
    setCardData(cardData.data);
  };
  useEffect(() => {
    getCardData();
  }, []);
  return (
    <>
      <div className="CardOverview-container">
        <div className="customer">
          <div className="title-card">
            <div className="label-card">Customer</div>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">
              {cardData?.customer?.countTotalCustomer
                ? cardData?.customer?.countTotalCustomer
                : 0}
            </div>
            <div
              className={`${
                cardData?.customer?.percent.type == 1
                  ? "percent-up"
                  : "percent-down"
              }`}
            >
              {cardData?.customer?.percent.type == 1
                ? percentUp(cardData?.customer.percent.value)
                : percentDown(cardData?.customer.percent.value)}
            </div>
            <div className="increas">From Last Month</div>
          </div>
          <div
            className="action"
            onClick={() => {
              navigate(`/${tenantURL}/business/customer`);
            }}
          >
            All customers
          </div>
        </div>
        <div className="order">
          <div className="title-card">
            <div className="label-card">Orders</div>
            <FontAwesomeIcon icon={faCartShopping} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">
              {cardData?.order?.countTotalOrder?cardData?.order?.countTotalOrder:0}
            </div>
            <div
              className={`${
                cardData?.order?.percent.type == 1
                  ? "percent-up"
                  : "percent-down"
              }`}
            >
              {cardData?.order?.percent.type == 1
                ? percentUp(cardData?.order.percent.value)
                : percentDown(cardData?.order.percent.value)}
            </div>
            <div className="increas">From Last Month</div>
          </div>
          <div
            className="action"
            onClick={() => {
              navigate(`/${tenantURL}/business/order`);
            }}
          >
            View Orders
          </div>
        </div>
        <div className="num-product">
          <div className="title-card">
            <div className="label-card">Product Sold</div>
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">
              {cardData?.product?.countTotalProduct?cardData?.product?.countTotalProduct:0}
            </div>
            <div
              className={`${
                cardData?.product.percent.type == 1
                  ? "percent-up"
                  : "percent-down"
              }`}
            >
              {cardData?.product?.percent.type == 1
                ? percentUp(cardData?.product.percent.value)
                : percentDown(cardData?.product.percent.value)}
            </div>
            <div className="increas">From Last Month</div>
          </div>
          <div
            className="action"
            onClick={() => {
              navigate(`/${tenantURL}/business/product`);
            }}
          >
            View Products
          </div>
        </div>
      </div>
    </>
  );
};
export default CardOverView;
