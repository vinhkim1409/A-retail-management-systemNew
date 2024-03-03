import React from "react";
import "./NavbarAdminBusiness.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avt from "../../assets/avtadmin1.jpg";

const NavbarAdminBusiness = () => {
  return (
    <div className="navbar-admin-business">
      <div className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
      </div>

      <div className="avt">
        <div className="info">
          <div className="name">Minh Hung</div>

          <img src={avt} alt="avt" />
        </div>
        <div className="drop">
          <a >
            <FontAwesomeIcon icon={faUser} className="icon" />
            Profile
          </a>
          <a>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon"  />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdminBusiness;
