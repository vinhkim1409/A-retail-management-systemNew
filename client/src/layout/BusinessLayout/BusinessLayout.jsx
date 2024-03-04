import React from 'react'
import './BusinessLayout.scss';
import SidebarBusiness from '../../components/SidebarBusiness/SidebarBusiness'
import NavbarAdminBusiness from '../../components/NavbarAdminBusiness/NavbarAdminBusiness';
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
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
    );
};

export default AdminLayout;