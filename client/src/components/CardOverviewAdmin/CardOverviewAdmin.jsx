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
  return (
    <>
      <div className="CardOverview-container">
        <div className="customer">
          <div className="title-card">
            <div className="label-card">Revenue</div>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{"10,000,000"}</div>
            <div className={`${1 == 1 ? "percent-up" : "percent-down"}`}>
              {1 == 1 ? percentUp(19.2) : percentDown(19.2)}
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
            <div className="number-card">{5}</div>
            <div className={`${2 == 1 ? "percent-up" : "percent-down"}`}>
              {2 == 1 ? percentUp(5) : percentDown(5)}
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
            <div className="number-card">{10}</div>
            <div className={`${2 == 1 ? "percent-up" : "percent-down"}`}>
              {2 == 1 ? percentUp(10) : percentDown(10)}
            </div>
          </div>
          <div className="action">Compared With Last Month</div>
        </div>
      </div>
    </>
  );
};
export default CardOverviewAdmin;
