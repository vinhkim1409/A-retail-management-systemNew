import React from "react";
import "./Password.scss";

function VerifyCodePage() {
  return (
    <>
      <div className="password-container">
        <div className="form_container ">
          <h1 className="text-center">Code Verification</h1>
          <h3 className="textdown">
            Enter the verification code we just sent on your email address.
          </h3>
          <form className="form_container1 ">
            <h4 className="">The email was send succesfuly </h4>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary">Send code</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VerifyCodePage;
