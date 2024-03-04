import React from "react";
import "./Password.scss";

function ForgotPage() {
  return (
    <>
      <div className="password-container">
        <div className="form_container">
          <h2 className="ms-5" >Reset your Password</h2>
          <h3 className="ms-3"  >
          Don't worry! It occurs. Please enter the email address linked with your account.
          </h3>
          <form className="form_container1">
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="d-grid">
              <button className="btn ">Send code</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPage;
