import React, { useState } from "react";
import "./Payment.scss";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { FaMoneyBill } from "react-icons/fa";
import { Divider } from "@mui/material";
import momo from "./Momo.png";
import zalo from "./ZaloPay_Logo.png";

const goi = [
  {
    name: "Basic",
    intomoney: "100",
  },
  {
    name: "Premium",
    intomoney: "1000",
  },
];
function PaymentPage() {
  let value = 0;
  const [pack, setPack] = useState({ name: "haha", intomoney: 100 });

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
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    onClick={() => {
                      setPack(goi[0]);
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Package 1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                    onClick={() => {
                      setPack(goi[1]);
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Package 2
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                    onClick={() => {
                      value = 3;
                    }}
                  />
                  <label className="form-check-label" for="inlineRadio3">
                    Package 3
                  </label>
                </div>
              </div>
            </div>
            <div className="minileftbox ">
              <div className="inminileftbox">
                <h3>Payment Method</h3>
                <div className="form-check ">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <img src={momo} className="imglogo" />
                  <label className="" for="inlineRadio1">
                    Momo
                  </label>
                </div>

                <div className="form-check ">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <img src={zalo} className="imglogozalo" />
                  <label className="" for="inlineRadio2">
                    Zalo Pay
                  </label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <GrAtm className="icon" />
                  <label className="form-check-label ms-3 " for="inlineRadio3">
                    ATM / Internet Banking
                  </label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <BsCreditCard2BackFill className="icon" />
                  <label className="form-check-label ms-3" for="inlineRadio4">
                    Credit card
                  </label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <FaMoneyBill className="icon" />
                  <label className="form-check-label ms-3" for="inlineRadio5">
                    Payment on delivery
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
                <p>${pack.intomoney}</p>
              </div>
              <Divider sx={{ bgcolor: "black" }} />
              <div className="payInfo mt-3">
                <p>Discount</p>
                <p>$0</p>
              </div>
              <Divider sx={{ bgcolor: "black" }} />
              <div className="payInfo mt-3">
                <p>Total</p>
                <p>${pack.intomoney}</p>
              </div>
              <div className="d-grid mt-5">
                <button
                  className="btn btn-primary"
                  onClick={() => console.log(value)}
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
