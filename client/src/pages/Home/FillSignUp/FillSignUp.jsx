import React from "react";
import "./FillSignUp.scss";

function FillSignUpPage() {
  return (
    <>
      <div className="Fillsignup-form">
        <div className="40-w p-5 rounded bg-white">
          <h2>Fill in business information</h2>
          <form className>
            <div className="form-element">
              <label htmlFor="name"> Name</label>
              <input
                type="name"
                placeholder="Your Name"
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="phonenumber"> Phone Number</label>
              <input
                type="text"
                placeholder="(123) 456 - 7890"
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                placeholder="Your Mail ID"
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="date"> Date</label>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="form-control"
              />
            </div>
            <div className="multi-form">
              <div className="form-element">
                <label htmlFor="taxcode" > Company tax code</label>
                <input
                  type="text"
                  placeholder="Code"
                  className="form-control-1"
                />
              </div>
              <div className="form-element">
                <label htmlFor="location" > Location</label>
                <input
                  type="seclect"
                  placeholder="City/Arena"
                  className="form-control-1"
                />
              </div>
            </div>
            <div class="text-center">
              <button type="button" class="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FillSignUpPage;
