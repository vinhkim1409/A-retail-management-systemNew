import React from "react";
import "./Password.scss";

function ResetPasswordPage() {
  return (
    <>
      <div className="password-container">
        <div className="form_container ">
          <h1 className="ms-5">Create a New Password</h1>
          <h3 className="textdown">
            Your new password must be unique from those previously used.{" "}
          </h3>
          <form className="form_container1 p-3 rounded bg-white text-center">
            <div className="mb-2 mt-4">
              <input
                type="password"
                placeholder="New Password"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
              />
            </div>
            <div className="d-grid mt-5">
              <button className="btn btn-primary">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
