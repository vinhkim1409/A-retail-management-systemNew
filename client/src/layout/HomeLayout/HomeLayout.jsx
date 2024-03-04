import React from 'react'
import Navbar from '../../components/NavbarMain/NavbarMain'
import Footer from '../../components/FooterMain/FooterMain'
import './HomeLayout.scss';
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
    return (
        <div className="HomeLayoutContainer">
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

export default HomeLayout;