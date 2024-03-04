import React, { useState } from 'react';
import './Contact.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

function Pricing() {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className="Contact-container">
            <div className="contact">
                <div className="form-contact">
                    <h1 className="title">Get in touch</h1>
                    <div className="attribute-form">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            className="form"
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="attribute-form">
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            className="form"
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="attribute-form">
                        <label htmlFor="subject">Subject</label>
                        <input
                            className="form"
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="attribute-form">
                        <label htmlFor="message">Message</label>
                        <textarea
                            className="text-area"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button className="button-send">Send Message</button>
                </div>
                <div className="information-contact">
                    <h1 className="title-info">Contact Us</h1>
                    <div className="description">We are open for any suggestion or just to have a chat</div>
                    <div className="address">
                        <div className="icon">
                            <FontAwesomeIcon icon={faLocationDot} className="icon-industry" />
                        </div>
                        <div className="text">
                            Address: Dai hoc Bach Khoa - Dai hoc Quoc gia Thanh pho Ho Chi Minh, Dong Hoa Ward, Di An City, Binh Duong Provine
                        </div>
                    </div>
                    <div className="phone">
                        <div className="icon">
                            <FontAwesomeIcon icon={faPhone} className="icon-industry" />
                        </div>
                        <div className="text">
                            Phone: +84123456789
                        </div>
                    </div>
                    <div className="email">
                        <div className="icon">
                            <FontAwesomeIcon icon={faEnvelope} className="icon-industry" />
                        </div>
                        <div className="text">
                            Email: dacn@hcmut.edu.vn
                        </div>
                    </div>
                    <div className="facebook">
                        <div className="icon">
                            <FontAwesomeIcon icon={faEarthAsia} className="icon-industry" />
                        </div>
                        <div className="text">
                            Website: https://www.facebook.com/hcmut
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Pricing;


