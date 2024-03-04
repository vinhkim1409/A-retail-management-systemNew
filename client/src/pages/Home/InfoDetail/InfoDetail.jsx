import React from "react";
import "./InfoDetail.scss";
import { Divider } from "@mui/material";

function InfoDetailPage() {
  return (
    <>
      <div className="Infodetail template d-flex justify-content-center align-items-center  bg-white ">
        <div className="40-w rounded bg-white">
          <h4 className="textlable">Information of bussiness</h4>
          <p className="textmini mb-5">
            Please fill the form below to receive a quote for workspace. Please
            add all the details required.{" "}
          </p>
        </div>
        <div className="boxform rounded ">
          <h4 className="ms-5">Contact details</h4>
          <p className="textmini ms-5">
            Please fill your information so we can get in touch with you.{" "}
          </p>
          <Divider sx={{ bgcolor: "black", marginLeft: 1, marginRight: 1 }} />
          <form>
            <div className="p-3">
              <label htmlFor="name"> Name</label>
              <input
                type="name"
                placeholder="Your Name"
                className="form-control"
              />
            </div>
            <div className="p-3">
              <label htmlFor="phonenumber"> Phone Number</label>
              <input
                type="text"
                placeholder="(123) 456 - 7890"
                className="form-control"
              />
            </div>
            <div className="p-3">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                placeholder="Your Mail ID"
                className="form-control"
              />
            </div>
            <div className="p-3">
              <label htmlFor="date"> Date</label>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="form-control"
              />
            </div>
            <div className="p-3">
              <label htmlFor="taxcode"> Company tax code</label>
              <input type="text" placeholder="Code" className="form-control" />
            </div>
            <div className="d-flex flex-row p-3">
              <div className="me-3">
                <label htmlFor="daterage"> Date Range</label>
                <input
                  type="date"
                  placeholder="Date Range"
                  className="form-control"
                />
              </div>
              <div className="me-3">
                <label htmlFor="expirationdate"> Expiration Date</label>
                <input
                  type="date"
                  placeholder="Expiration Date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="p-3">
              <label htmlFor="location"> Location</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>City/Area</option>
                <option value="1">Ho Chi Minh</option>
                <option value="2">Da Nang</option>
                <option value="3">Ha Noi</option>
              </select>
            </div>
            <div className="p-3">
              <label htmlFor="proof"> Proof</label>
              <div className="filetyp">
                <div className="filebox1">File</div>
                <div className="filebox1">File</div>
                <div className="filebox1">File</div>
              </div>
              <div className="filetyp mt-5">
                <div className="filebox2">File</div>
                <div className="filebox2">File</div>
              </div>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" className="btn btn-primary rounded-pill">
            Cancle
          </button>
          <button type="button" className="btn btn-primary rounded-pill">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default InfoDetailPage;