import React from "react";
import "./Login.scss";
import google from "../../../assets/google.png";
function LoginPage() {
  return (
    <>
      <div className="login-form">
        <div className="title">
          <h1>Welcome to your Business!</h1>
          <h3>
            Create an account to run wild through our curated experiences.
          </h3>
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <button className="btn btn-google">
              <img src={google} alt="" className="google" />
              Continue with Google
            </button>
            <div className="or">or</div>
            <div className="form-box">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-box">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <button className="btn mb-2">Sign in</button>
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
