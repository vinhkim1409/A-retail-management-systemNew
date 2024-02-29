import React from "react";
import "./SignUp.scss";

function SignUpPage() {
  return (
    <>
      <div className="signup-container">
        <div className="form_container">
          <h1 >Welcome to your Business!</h1>
          <h3>
            Create an account to run wild through our curated experiences.
          </h3>
          <form className="form_container1 ">
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="confirm-password"
                placeholder="Confirm Password"
                className="form-control"
              />
            </div>
            <div >
              <button className="btn ">Create Account</button>
            </div>
            <div className="">
              <input
                type="checkbox"
                className=""
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me for 30 days
              </label>
            </div>

            <p className="text-center">
              Forgot <a href="/forgot">Password ?</a>
            </p>
            <p className="text-center">
              You already have account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
