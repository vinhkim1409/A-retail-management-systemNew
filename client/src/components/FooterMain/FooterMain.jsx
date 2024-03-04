import React from 'react';
import './FooterMain.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="footer-main">
            <div className="logo">Logo</div>
            <div className="email">
                <div className="icon-email">
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="text-email">email@gmail.com</div>
            </div>
            <div className="phone">
                <div className="icon-phone">
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="text-phone">0123456789</div>
            </div>
        </div>
    );
};

export default Footer;
