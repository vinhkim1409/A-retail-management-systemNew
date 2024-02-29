import React from 'react';
import "./NavbarAdminBusiness.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import avt from "../../assets/avtadmin1.jpg";

const NavbarAdminBusiness = () => {
    return (
        <div className="navbar-admin-business">
            <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
            </div>
            <div className="name">
                Minh Hung
            </div>
            <div className="avt">
                <img src={avt} alt="avt" />
            </div>
        </div>
    );
};

export default NavbarAdminBusiness;
