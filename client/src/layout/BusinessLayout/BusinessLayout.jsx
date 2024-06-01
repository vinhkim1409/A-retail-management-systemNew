import React, { useEffect, useState } from "react";
import "./BusinessLayout.scss";
import SidebarBusiness from "../../components/SidebarBusiness/SidebarBusiness";
import NavbarAdminBusiness from "../../components/NavbarAdminBusiness/NavbarAdminBusiness";
import { Snackbar, Alert } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const userBusiness = useSelector(
    (state) => state.authBusiness.login.currentUser
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (!userBusiness) {
      navigate("/");
      //tao mot ham check use nua co trung khop voi tenent URL khong co san roi
    }
  }, []);
  useEffect(() => {
    if (location?.state?.loginState) {
      setOpen(true);
    }
    window.history.replaceState(null, document.title, window.location.pathname);
  }, [location]);
  return (
    <>
    <div className="BusinessLayoutContainer">
      <div className="sidebar">
        <SidebarBusiness />
      </div>
      <div className="content-and-navbar">
        <div className="navbar">
          <NavbarAdminBusiness />
        </div>
        <div className="content">
          <Outlet />
        </div>
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

export default AdminLayout;
