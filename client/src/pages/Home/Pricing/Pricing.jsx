import React from 'react';
import './Pricing.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Pricing() {
    return (
        <div className="Pricing-container">
            <div className="description">
                <h1>Pricing</h1>
                <p>Find a flexible plan that scales with your business</p>
            </div>
            <div className="pricing">
                <div className="box-pricing">
                    <button className="name-package-first">BASIC</button>
                    <div className="description-package">
                        For small business models, for people starting a business or selling online.
                    </div>
                    <div className="price-package">$9/month</div>
                    <div className="feature-package">
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> 3 users
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Unlimited features
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> No initiation fee
                        </div>
                    </div>
                    <div className="div-button">
                        <button className="button-get-first">Try it for free</button>
                    </div>
                </div>
                <div className="box-pricing">
                    <div className="package-second">
                        <button className="name-package-second">PROFESSIONAL</button>
                        <button className="popular-package">Popular</button>
                    </div>

                    <div className="description-package">
                        For professional business models with few employees
                    </div>
                    <div className="price-package">$19/month</div>
                    <div className="feature-package">
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Unlimited users
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Unlimited features
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> No initiation fee
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Create a sales website
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Manage timekeeping and salary calculation (limited to 5 users)
                        </div>
                    </div>
                    <div className="div-button">
                        <button className="button-get-second">Try it for free</button>
                    </div>
                </div>
                <div className="box-pricing">
                    <button className="name-package-third">PREMIUM</button>
                    <div className="description-package">
                        For business models with many sales channels or many employees.
                    </div>
                    <div className="price-package">$39/month</div>
                    <div className="feature-package">
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Unlimited users
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Unlimited features
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> No initiation fee
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Create a sales website
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Timekeeping and payroll management (unlimited users)
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Sell online on e-commerce platforms and TikTok
                        </div>
                        <div className="detail-feature">
                            <FontAwesomeIcon icon={faCheck} /> Support API connection
                        </div>
                    </div>
                    <div className="div-button">
                        <button className="button-get-third">Try it for free</button>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Pricing;


