import React from 'react'
import "./NavbarCustomer.scss"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <div className="navbar-customer">
            <div className="home">
                <Link to="/customer" className="link">Home</Link>
            </div>
            <div className="product">
                <Link to="/customer/shop" className="link">Product</Link>
            </div>
            <div className="logo">
                <Link to="/customer" >
                    Logo
                </Link>
            </div>
            <div className="search">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="cart">
                <Link to="/customer/cart" className="link"><FontAwesomeIcon icon={faCartShopping} /></Link>
            </div>
            <div className="user">
                <Link to="/customer/login" className="link">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;
