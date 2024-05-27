import React, { useEffect, useState } from "react";
import "./CustomerLayout.scss";
import Navbar from "../../components/NavbarCustomer/NavbarCustomer";
import Footer from "../../components/FooterCustomer/FooterCustomer";
import { Snackbar, Alert } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (location?.state?.loginState) {
      setOpen(true);
    }
    window.history.replaceState(null, document.title, window.location.pathname);
  }, [location]);
  return (
    <>
      <div className="CustomerLayoutContainer">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
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
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Login Success"}!!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomerLayout;
