import React from 'react';
import './HomePage.scss'
import ImageHome from '../../../assets/homepage.png'
import ecommerce from '../../../assets/ecommerce.png'
import website from '../../../assets/website.png'
import payment from '../../../assets/payment.png'
import cup from '../../../assets/cup.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';

import 'typeface-exo';

function HomePage() {
    return (
        <div className="HomePage-container">
            <div className="bg-first-section">
                <div className="first-section">
                    <div className="first-section-text">
                        <div className="name-website">
                            Multi-platform sales management website
                        </div>
                        <p className="description-website">
                            Conquer the diverse business world with the convenience and flexibility of our multi-platform sales management service! Sign up now to unlock a new realm for your business, where inventory management, order processing, and e-commerce storefronts become easier than ever before.
                        </p>
                        <div className="button-login-regiter">
                            <button className="login-button">Login now</button>
                            <button className="register-button">Register now</button>
                        </div>
                    </div>
                    <div className="first-section-image">
                        <img src={ImageHome} alt="Home" style={{ width: '90%', height: '90%' }} />
                    </div>
                </div>
            </div>

            <div className="bg-third-section">
                <div className="title-third-section">
                    We design specialized software for each industry
                </div>
                <div className="third-section">
                    <div className="industry">
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Fashion</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Beauty</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Health</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Fashion accessories</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Household electrical appliances</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Phones and accessories</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Travel and luggage</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Wallet bag</div>
                    </div>
                    <div className="industry">
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Clock & Watch</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Audio equipments</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Food & Beverage</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Take care of the pet</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Mother & baby</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Gaming & Console</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Cameras and Flycam</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Home & life</div>
                    </div>
                    <div className="industry">
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Sports & picnics</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Stationery</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Hobbies & Collectibles</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Car</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Motorcycles, motorbikes</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Vouchers & services</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Books & magazines</div>
                        <div className="name-industry"><FontAwesomeIcon icon={faShirt} className="icon-industry"/> Computers & laptops</div>
                    </div>
                </div>
            </div>

            <div className="bg-second-section">
                <div className="title-second-section">
                    Special features we have for you
                </div>
                <div className="second-section">
                    <div className="feature">
                        <div className="image-feature">
                            <img src={ecommerce} alt="ecommerce" style={{ width: '70px', height: '70px' }} />
                        </div>
                        <div className="title-feature">
                            Many e-commerce platforms
                        </div>
                        <div className="content-feature">
                            Many e-commerce platforms many e-commerce platforms many e-commerce platforms
                        </div>
                    </div>
                    <div className="feature">
                        <div className="image-feature">
                            <img src={website} alt="ecommerce" style={{ width: '70px', height: '70px' }} />
                        </div>
                        <div className="title-feature">
                            Separate website
                        </div>
                        <div className="content-feature">
                            Separate website for each business separate website for each business separate website for each business separate website for each business
                        </div>
                    </div>
                    <div className="feature">
                        <div className="image-feature">
                            <img src={payment} alt="ecommerce" style={{ width: '70px', height: '70px' }} />
                        </div>
                        <div className="title-feature">
                            Online payment
                        </div>
                        <div className="content-feature">
                            Online payment online payment online payment online payment online payment online payment online payment online payment online payment online payment
                        </div>
                    </div>
                    <div className="feature">
                        <div className="image-feature">
                            <img src={cup} alt="ecommerce" style={{ width: '70px', height: '70px' }} />
                        </div>
                        <div className="title-feature">
                            Simple & easy to use
                        </div>
                        <div className="content-feature">
                            Simple & easy to use Simple & easy to use Simple & easy to use Simple & easy to use Simple & easy to use Simple & easy to use Simple & easy to use
                        </div>
                    </div>
                </div>
            </div>

            

        </div >
    );
}

export default HomePage;


