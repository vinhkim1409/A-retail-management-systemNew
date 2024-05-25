import React from "react";
import "./NavbarCustomer.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutCustomerSuccess } from "../../redux/authCustomerSilde";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { tenantURL } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser?.resCustomer
  );
  
  const handleLogOut = () => {
    dispatch(logoutCustomerSuccess());
    navigate(`/${tenantURL}/customer/login`);
  };
  return (
    <div className="navbar-customer">
      <div className="home">
        <Link to={`/${tenantURL}/customer`} className="link">
          Home
        </Link>
      </div>
      <div className="product">
        <Link to={`/${tenantURL}/customer/shop`} className="link">
          Product
        </Link>
      </div>
      <div className="logo">
        <Link to={`/${tenantURL}/customer`} className="link-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="cart">
        <Link to={`/${tenantURL}/customer/cart`} className="link">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
      {customer ? (
        <div className="user">
          <div className="link" onClick={handleLogOut}>
            {/* {customer.firstName} */}
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      ) : (
        <div className="user">
          <Link to={`/${tenantURL}/customer/login`} className="link">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
