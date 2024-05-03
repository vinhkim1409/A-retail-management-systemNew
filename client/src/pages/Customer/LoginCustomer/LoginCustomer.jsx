import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginCustomer.scss";
import google from "../../../assets/google.png";
import background from "../../../assets/login-background.png"
import { loginCustomer } from "../../../redux/apiRequest";
function LoginCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {tenantURL}=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const customer = {
      email: email,
      password: password,
      tenantURL: tenantURL
    };

    loginCustomer(customer, dispatch,navigate)
    
  };
  return (
    <>
      <div className="loginCustomer-form">
        <div className="title">
          <h1>Welcome to CoolMate!</h1>
          
          <img src={background} alt="" className="img" />
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <div className="form-box">
              <div className="form-title">Logo Business</div>
              <div className="mini-title">Please enter your infomation</div>
            </div>
            <div className="form-box">
              <label for="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-box">
              <label for="password" className="label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className="btn mb-2" onClick={handleLogin}>Login</button>
            <div className="mb-2 text-center">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="">
                Remember me for 30 days
              </label>
            </div>

            <p className="">
              Forgot <a href={`/${tenantURL}/forgotpassword`}>Password ?</a>
            </p>
            <p className="">
              You do not have account yet? <a href={`/${tenantURL}/customer/signup`}>Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginCustomer;
