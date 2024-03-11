import React from "react";
import "./ResetPassword.scss";
import background from "../../../assets/login-background.png"
function ResetPasswordPage() {
  return (
    <>
      <div className="resetpass">
        <div className="title">
          <h1>Create a New Password!</h1>
          <h3>
          Your new password must be unique from those previously used.{" "}
          </h3>
          <img src={background} alt="" className="img" />
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <div className="form-box">
            <label htmlFor="newpass" className="label"> New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="form-control"
                id="newpass"
              />
            </div>
            <div className="form-box">
            <label htmlFor="confirmpass" className="label"> Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                id="confrimpass"
              />
            </div>
            <button className="btn mb-2">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
