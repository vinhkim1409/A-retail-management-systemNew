import React, { useState } from 'react';
import './InfoShop.scss';

const InfoShop = () => {
    const [shopKey, setShopKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Save the keys here
        setMessage('Thông tin kết nối đã được lưu.');
    };

    return (
        <div className="info-shop-container">
            <h2 className="info-shop-title">Info Shop</h2>
            <form className="info-shop-form" onSubmit={handleSubmit}>
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