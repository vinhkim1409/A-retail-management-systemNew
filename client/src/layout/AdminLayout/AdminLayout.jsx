import React, { useEffect } from "react";
import "./AdminLayout.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const admin = useSelector((state) => state.authAdmin?.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate(`/admin/login`);
    }
  }, []);
  return (
    <div className="AdminLayoutContainer">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-and-navbar">
        <div className="navbar">
          <NavbarAdmin />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
