import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import './InfoShop.scss';
import { api } from "../../../constant/constant"

const InfoShop = () => {
    const [shopKey, setShopKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');

    const userBusiness = useSelector(
        (state) => state.authBusiness.login?.currentUser
    );
    const config = {
        headers: {
            Authorization: `Bearer ${userBusiness?.accessToken}`,
        },
    };

    const getInfo = async () => {
        try {
            const response = await axios.get(`${api}info-connect`, config);
            console.log("info", response.data);
            if (response && response.data) {
                setShopKey(response.data.data.shop_key);
                setSecretKey(response.data.data.secret_key);
            } else {
                console.error('API response does not contain expected data');
            }
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };

    useEffect(() => {
        if (userBusiness) {
            getInfo();
        }
    }, [userBusiness]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `${api}info-connect`,
                { shop_key: shopKey, secret_key: secretKey },
                config
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error('There was an error!', error);
            setMessage('There was an error saving your changes.');
        }
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
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default InfoShop;
