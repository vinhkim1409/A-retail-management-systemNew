import React, { useState } from 'react';
import axios from 'axios';
import './InfoShop.scss';
import {api} from "../../../constant/constant"

const InfoShop = () => {
    const [shopKey, setShopKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="info-shop-container">
            <h2 className="info-shop-title">Info Shop</h2>
            <form className="info-shop-form">
                <div className="info-shop-form-item">
                    <label>
                        Shop Key:
                        <input
                            type="text"
                            value={shopKey}
                            onChange={(e) => setShopKey(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="info-shop-form-item">
                    <label>
                        Secret Key:
                        <input
                            type="text"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InfoShop;