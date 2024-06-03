import React, { useEffect } from "react";
import "./NavbarAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import avt from "../../assets/avtadmin1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdminSuccess } from "../../redux/authAdminSlice";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const user=useSelector((state)=>state.authAdmin.login?.currentUser?.resAdmin)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogOut = () => {
    dispatch(logoutAdminSuccess());
    navigate(`/admin/login`);
  };
  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <div className="navbar-admin">
      <div className="avt">
        <div className="info">
          <div className="name">{user?.name}</div>

          <img src={avt} alt="avt" />
        </div>
        <div className="drop">
          {/* <a >
            <FontAwesomeIcon icon={faUser} className="icon" />
            Profile
          </a> */}
          <a onClick={handleLogOut}>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon"  />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
