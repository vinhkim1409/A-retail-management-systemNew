import React, { useState } from "react";
import "./Payment.scss";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { FaMoneyBill } from "react-icons/fa";
import { Divider } from "@mui/material";
import momo from "./Momo.png";
import zalo from "./ZaloPay_Logo.png";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useSelector } from "react-redux";

const goi = [
  {
    name: "Basic",
    intomoney: 230000,
  },
  {
    name: "Professional",
    intomoney: 499000,
  },
  {
    name: "Premium",
    intomoney: 740000,
  },
];
function PaymentPage() {
  let value = 0;
  const [pack, setPack] = useState({ name: "", intomoney: 0 });
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const HandlePayMent= async()=>{
    const payment=await axios.post(`${api}payment/payPackage`,{
      typePackage:value,
      duration:30,
      totalPrice:pack.intomoney
    },config)
    if(payment.data.success)
      {
        window.open(payment.data?.momoInfo?.payUrl, "_self");
      }
   
  }
  return (
    <>
      <div className="Payment">
        <h1 className="textpayment ">PAYMENT</h1>
        <div className="box">
          <div className="leftbox">
            <div className="minileftbox ">
              <div className="inminileftbox">
                <h3>SELECT PACKAGE TYPE</h3>
                <div className="form-check">
                  <input
                    type="radio"
                    name="package"
                    id="inlineRadio1"
                    value="option1"
                    onClick={() => {
                      setPack(goi[0]);
                      value=1
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Basic
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="package"
                    id="inlineRadio2"
                    value="option2"
                    onClick={() => {
                      setPack(goi[1]);
                      value=2
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Professional
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    type="radio"
                    name="package"
                    id="inlineRadio3"
                    value="option3"
                    onClick={() => {
                      setPack(goi[2]);
                      value=3
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio3">
                    Premium
                  </label>
                </div>
              </div>
            </div>
            <div className="minileftbox ">
              <div className="inminileftbox">
                <h3>Payment Method</h3>
                <div className="form-checkmomo ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymethod"
                    id="paymethod1"
                    value="paymethod1"
                  />
                  <img src={momo} className="imglogo" />
                  <label className="" for="paymethod1">
                    Momo
                  </label>
                </div>

                <div className="form-checkzalo">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymethod"
                    id="paymethod2"
                    value="paymethod2"
                  />
                  <img src={zalo} className="imglogozalo" />
                  <label className="" for="paymethod2">
                    Zalo Pay
                  </label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymethod"
                    id="paymethod3"
                    value="paymethod3"
                  />
                  <GrAtm className="icon" />
                  <label className="form-check-label ms-3 " for="paymethod3">
                    ATM / Internet Banking
                  </label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymethod"
                    id="paymethod4"
                    value="paymethod4"
                  />
                  <BsCreditCard2BackFill className="icon" />
                  <label className="form-check-label ms-3" for="paymethod4">
                    Credit card
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="paymentInfo">
            <div className="inpaymentInfo">
              <h2>Payment Information</h2>
              <div className="payInfo ">
                <p>Name</p>
                <p>{pack.name}</p>
              </div>
              <div className="payInfo">
                <p>Into Money</p>
                <p>{pack.intomoney} đ</p>
              </div>
              <Divider sx={{ bgcolor: "black" }} />
              <div className="payInfo mt-3">
                <p>Discount</p>
                <p>0 đ</p>
              </div>
              <Divider sx={{ bgcolor: "black" }} />
              <div className="payInfo mt-3">
                <p>Total</p>
                <p>{pack.intomoney} đ</p>
              </div>
              <div className="d-grid mt-5">
                <button
                  className="btn btn-primary"
                  onClick={HandlePayMent}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
