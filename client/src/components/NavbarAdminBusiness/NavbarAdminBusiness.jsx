import React, { useEffect } from "react";
import "./NavbarAdminBusiness.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avt from "../../assets/avtadmin1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authBusinessSlice";
import { useNavigate } from "react-router-dom";

const NavbarAdminBusiness = () => {
  const userBusiness=useSelector((state)=>state.authBusiness.login?.currentUser?.resUser)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogOut = () => {
    dispatch(logoutSuccess());
    navigate(`/login`);
  };
  useEffect(()=>{
    console.log(userBusiness)
  },[])
  return (
    <div className="navbar-admin-business">
      <div className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
      </div>

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
          <a onClick={handleLogOut}>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon"  />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdminBusiness;
