import React, { useEffect, useState } from "react";
import "./CardOverviewAdmin.scss";
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
const CardOverviewAdmin = () => {
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
  const [data, setData] = useState();
  const getData = async () => {
    const data = await axios.get(`${api}admin/get-data-card`);
    console.log(data.data);
    setData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="CardOverview-container">
        <div className="customer">
          <div className="title-card">
            <div className="label-card">Revenue</div>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{data?.revenue?.thisMonth}</div>
            <div
              className={`${
                data?.revenue?.percent.type == 1 ? "percent-up" : "percent-down"
              }`}
            >
              {data?.revenue?.percent?.type == 1
                ? percentUp(data?.revenue?.percent?.value)
                : percentDown(data?.revenue?.percent?.value)}
            </div>
          </div>
          <div className="action">Compared With Last Month</div>
        </div>
        <div className="order">
          <div className="title-card">
            <div className="label-card">Business Paid</div>
            <FontAwesomeIcon icon={faCartShopping} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{data?.paid?.thisMonth}</div>
            <div
              className={`${
                data?.paid?.percent.type == 1 ? "percent-up" : "percent-down"
              }`}
            >
              {data?.paid?.percent.type == 1
                ? percentUp(data?.paid?.percent?.value)
                : percentDown(data?.paid?.percent?.value)}
            </div>
          </div>
          <div className="action">Compared With Last Month</div>
        </div>
        <div className="num-product">
          <div className="title-card">
            <div className="label-card">New Register</div>
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{data?.register?.thisMonth}</div>
            <div className={`${data?.register?.percent.type == 1 ? "percent-up" : "percent-down"}`}>
              {data?.register?.percent.type == 1 ? percentUp(data?.register?.percent?.value) : percentDown(data?.register?.percent?.value)}
            </div>
          </div>
          <div className="action">Compared With Last Month</div>
        </div>
      </div>
    </>
  );
};
export default CardOverviewAdmin;
