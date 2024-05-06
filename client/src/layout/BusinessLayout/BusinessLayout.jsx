import React, { useEffect } from 'react'
import './BusinessLayout.scss';
import SidebarBusiness from '../../components/SidebarBusiness/SidebarBusiness'
import NavbarAdminBusiness from '../../components/NavbarAdminBusiness/NavbarAdminBusiness';
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const AdminLayout = () => {
    const userBusiness=useSelector((state)=>state.authBusiness.login.currentUser)
    const navigate=useNavigate()
    useEffect(()=>{
       if (!userBusiness)
       {
        navigate("/")
        //tao mot ham check use nua
       }
    },[])
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