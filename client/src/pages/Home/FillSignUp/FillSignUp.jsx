import React, { useEffect, useState } from "react";
import "./FillSignUp.scss";
import background from "../../../assets/login-background.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { api } from "../../../constant/constant";
function FillSignUpPage() {
  const businessAccount = useLocation().state;
  const [businessInfo, setBusinessInfo] = useState({
    email: businessAccount.email,
    password: businessAccount.password,
    tenantURL: "",
    phoneNumber: "",
    taxcode: "",
    location: "",
    name: "",
  });
  const [openWrongCofirm, setOpenWrongConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenWrongConfirm(false);
    setOpenSuccess(false);
  };
  const navigate = useNavigate();
  const handleFillInfo = (event, attribute) => {
    setBusinessInfo({ ...businessInfo, [`${attribute}`]: event.target.value });
  };
  const handleRegister = async () => {
    if (businessInfo.tenantURL == "admin") {
      setError(`tenantURL cannot be "admin"`);
      setOpenWrongConfirm(true);
      return;
    }
    if (
      !businessInfo.location ||
      !businessInfo.tenantURL ||
      !businessInfo.name ||
      !businessInfo.phoneNumber ||
      !businessInfo.taxcode
    ) {
      setError("You must fill in all necessary information!");
      setOpenWrongConfirm(true);
      return;
    }
    const resRegister = await axios.post(`${api}business/signup`, businessInfo);
    if (!resRegister.data.success) {
      setError(resRegister.data.message);
      setOpenWrongConfirm(true);
    } else {
      setOpenSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    console.log(resRegister.data.data);
  };
  useEffect(() => {
    if (!businessAccount) {
      navigate("/signup");
    }
  }, []);
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
          <form>
            <div className="form-element">
              <label htmlFor="name">Business Name</label>
              <input
                type="text"
                placeholder="Your Business Name"
                className="form-control"
                onChange={(event) => {
                  handleFillInfo(event, "name");
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="tenantURL">Shop URL</label>
              <input
                type="text"
                placeholder="Your TenantURL"
                className="form-control"
                onChange={(event) => {
                  handleFillInfo(event, "tenantURL");
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="phonenumber"> Phone Number</label>
              <input
                type="text"
                placeholder="(123) 456 - 7890"
                className="form-control"
                onChange={(event) => {
                  handleFillInfo(event, "phoneNumber");
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                placeholder="Your Mail ID"
                className="form-control"
                value={businessInfo?.email}
                onChange={(event) => {
                  handleFillInfo(event, "email");
                }}
              />
            </div>
            <div className="multi-form">
              <div className="form-element">
                <label htmlFor="taxcode"> Company tax code</label>
                <input
                  type="text"
                  placeholder="Code"
                  className="form-control-1"
                  onChange={(event) => {
                    handleFillInfo(event, "taxcode");
                  }}
                />
              </div>
              <div className="form-element">
                <label htmlFor="location"> Location</label>
                <input
                  type="seclect"
                  placeholder="City/Arena"
                  className="form-control-1"
                  onChange={(event) => {
                    handleFillInfo(event, "location");
                  }}
                />
              </div>
            </div>
            <div class="text-center">
              <button
                type="button"
                class="btn"
                onClick={() => {
                  handleRegister();
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openWrongCofirm}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Password and confirm password are not the same"
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Sign up successfully"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FillSignUpPage;
