import React, { useEffect } from "react";
import "./NavbarAdminBusiness.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avt from "../../assets/avtadmin1.jpg";
import { useSelector } from "react-redux";

const NavbarAdminBusiness = () => {
  const userBusiness=useSelector((state)=>state.authBusiness.login?.currentUser?.resUser)
  useEffect(()=>{
    console.log(userBusiness)
  },[])
  return (
    <div className="navbar-admin-business">
      <div className="avt">
        <div className="info">
          <div className="name">{userBusiness?.lastname}</div>

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
