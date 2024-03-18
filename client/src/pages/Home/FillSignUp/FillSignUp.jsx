import React from "react";
import "./FillSignUp.scss";
import background from "../../../assets/login-background.png";
function FillSignUpPage() {
  return (
    <>
      <div className="Fillsignup-form">
      <div className="title">
          <h1>Welcome to your Business!</h1>
          <h3>
            Create an account to run wild through our curated experiences.
          </h3>
          <img src={background} alt="" className="img" />
        </div>
        <div className="fill-box">
          <h2>Fill in business information</h2>
          <form >
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
