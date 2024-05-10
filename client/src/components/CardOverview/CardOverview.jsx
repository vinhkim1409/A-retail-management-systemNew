import React from "react";
import "./CardOverview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCreditCard,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
const CardOverView = ({tenantURL}) => {
  
  console.log(tenantURL)
  const navigate=useNavigate()
  return (
    <>
      <div className="CardOverview-container">
        <div className="customer">
          <div className="title-card">
            <div className="label-card">Customer</div>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{"1,000"}</div>
            <div className="percent"> {"30%"}</div>
            <div className="increas">From Last Month</div>
          </div>
          <div className="action" onClick={()=>{
            navigate(`/${tenantURL}/business/customer`)
          }}>All customers</div>
        </div>
        <div className="order">
          <div className="title-card">
            <div className="label-card">Orders</div>
            <FontAwesomeIcon icon={faCartShopping} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{"5,000"}</div>
            <div className="percent"> {"20%"}</div>
            <div className="increas">From Last Month</div>
          </div>
          <div className="action" onClick={()=>{
            navigate(`/${tenantURL}/business/order`)
          }}>View Orders</div>
        </div>
        <div className="num-product">
        <div className="title-card">
            <div className="label-card">Product Sold</div>
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
          </div>
          <div className="info-card">
            <div className="number-card">{"10,000"}</div>
            <div className="percent"> {"20%"}</div>
            <div className="increas">From Last Month</div>
          </div>
          <div className="action" onClick={()=>{
            navigate(`/${tenantURL}/business/product`)
          }}>View Products</div>
        </div>
      </div>
    </>
  );
};
export default CardOverView;
