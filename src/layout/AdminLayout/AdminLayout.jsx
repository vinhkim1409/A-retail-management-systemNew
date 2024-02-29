import React from 'react'
import './AdminLayout.scss';
import Sidebar from '../../components/Sidebar/Sidebar'
import NavbarAdminBusiness from '../../components/NavbarAdminBusiness/NavbarAdminBusiness';
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="AdminLayoutContainer">
            <div className="sidebar">
                <Sidebar />
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
    );
};

export default AdminLayout;