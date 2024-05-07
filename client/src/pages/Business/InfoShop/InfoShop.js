// ConnectionForm.jsx
import React, { useState } from 'react';

const InfoShop = () => {
    const [shopKey, setShopKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lưu thông tin kết nối vào localStorage
        localStorage.setItem('shop_key', shopKey);
        localStorage.setItem('secret_key', secretKey);

        setMessage('Thông tin kết nối đã được lưu.');
    };

    return (
        <div>
            <h2>Info Shop</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Shop Key:
                    <input
                        type="text"
                        value={shopKey}
                        onChange={(e) => setShopKey(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Secret Key:
                    <input
                        type="text"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Lưu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InfoShop;
