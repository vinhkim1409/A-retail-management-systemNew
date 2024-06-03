import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginCustomer.scss";
import google from "../../../assets/google.png";
import { Snackbar, Alert } from "@mui/material";
import background from "../../../assets/login-background.png";
import { loginCustomer } from "../../../redux/apiRequest";
import axios from "axios";
import { api } from "../../../constant/constant";
function LoginCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { tenantURL } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const getBusinessInfo = async () => {
    const businessInfo = await axios.get(`${api}business/info/${tenantURL}`);
    console.log(businessInfo.data);
    setBusinessName(businessInfo.data?.data?.name);
  };
  useEffect(() => {
    getBusinessInfo();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const customer = {
      email: email,
      password: password,
      tenantURL: tenantURL,
    };

    const login = await loginCustomer(customer, dispatch, navigate);
    if (login) {
      navigate(`/${tenantURL}/customer`, {
        state: {
          loginState: login,
        },
      });
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <div className="loginCustomer-form">
        <div className="title">
          <h1>Welcome to {businessName}!</h1>
          <img src={background} alt="" className="img" />
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <div className="form-box">
              <div className="form-title"> {businessName} </div>
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
            <button className="btn mb-2" onClick={handleLogin}>
              Login
            </button>
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
              You do not have account yet?{" "}
              <a href={`/${tenantURL}/customer/signup`}>Sign up</a>
            </p>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Wrong email or password!"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginCustomer;
