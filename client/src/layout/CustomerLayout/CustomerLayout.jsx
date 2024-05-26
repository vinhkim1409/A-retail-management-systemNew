import React from 'react'
import './CustomerLayout.scss'
import Navbar from '../../components/NavbarCustomer/NavbarCustomer'
import Footer from '../../components/FooterCustomer/FooterCustomer'

import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
    const checkTenantURL=async()=>{}
    return (
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
    );
};

export default CustomerLayout;