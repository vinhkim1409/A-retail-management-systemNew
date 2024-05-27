import React, { useState } from "react";
import "./Login.scss";
import google from "../../../assets/google.png";
import background from "../../../assets/login-background.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginBusiness } from "../../../redux/apiRequest"; 
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantURL, setTenantURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      tenantURL: tenantURL,
      email: email,
      password: password,
    };
    loginBusiness(newUser, dispatch, navigate);
  };
  return (
    <>
      <div className="loginBusiness-form">
        <div className="title">
          <h1>Welcome to your Business!</h1>
          <h3>
            Create an account to run wild through our curated experiences.
          </h3>
          <img src={background} alt="" className="img" />
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <div className="form-box">
              <div className="form-title">Logo BKM</div>
              <div className="mini-title">Please enter your infomation</div>
            </div>

            <div className="form-box">
              <label for="url-business" className="label">
                Business URL
              </label>
              <input
                type="text"
                id="url-business"
                name="url-business"
                placeholder="Business URL"
                className="form-control"
                onChange={(e) => {
                  setTenantURL(e.target.value);
                }}
              />
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
              Forgot <a href="/forgotpassword">Password ?</a>
            </p>
            <p className="">
              You do not have account yet? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
