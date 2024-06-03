import React, { useState } from "react";
import "./SignUp.scss";
import { Snackbar, Alert } from "@mui/material";
import background from "../../../assets/login-background.png";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import axios from "axios";
import { api } from "../../../constant/constant";

const errorAlert = {
  lackInfo: {
    color: "warning",
    message: "You must fill in all necessary information",
  },
  wrongConfirmPass: {
    color: "error",
    message: "Password and confirm password are not the same",
  },
};

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openWrongCofirm, setOpenWrongConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    const checkEmailBusiness = await axios.post(`${api}business/check-email`, {
      email: email,
    });
    if (checkEmailBusiness.data.success) {
      console.log(checkEmailBusiness.data);
      if (password != confirmPassword) {
        setErrorMessage("Password and confirm password are not the same!");
        setOpenWrongConfirm(true);
        return;
      } else {
        navigate("fill", {
          state: {
            email,
            password,
          },
        });
      }
    } else {
      console.log(checkEmailBusiness.data);
      setErrorMessage("Email is already!");
      setOpenWrongConfirm(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWrongConfirm(false);
  };
  return (
    <>
      <div className="signup-form">
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
              <div className="logo">
                <img src={logo} alt="logo" className="img-logo" />
              </div>
              <div className="mini-title">Please enter your infomation</div>
            </div>
            <div className="form-box">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-box">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-box">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                className="btn"
                disabled={!email || !password || !confirmPassword}
                onClick={createAccount}
              >
                Create Account
              </button>
            </div>
            <p className="text-center">
              You already have account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openWrongCofirm}
          autoHideDuration={2000}
          onClose={handleClose}
          message={errorMessage}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default SignUpPage;
