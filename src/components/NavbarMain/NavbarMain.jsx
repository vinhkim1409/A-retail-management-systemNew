import React from 'react';
import './NavbarMain.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar-main">
            <div className="logo">
                Logo
            </div>
            <div className="function-button">
                <div className="home">
                    <Link to="/">
                        <button className="feature-button">Home</button>
                    </Link>
                </div>
                <div className="pricing">
                    <Link to="/pricing">
                        <button className="feature-button">Pricing</button>
                    </Link>
                </div>
                <div className="contact">
                    <Link to="/contact">
                        <button className="feature-button">Contact</button>
                    </Link>
                </div>
                <div className="FAQ">
                    <Link to="/FAQ">
                        <button className="feature-button">FAQ</button>
                    </Link>
                </div>
                <div className="login">
                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
