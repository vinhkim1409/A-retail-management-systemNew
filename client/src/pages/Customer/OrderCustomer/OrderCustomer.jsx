import React, { useState } from 'react';
import './OrderCustomer.scss';
import { getPriceExpr } from "../../../utils/getPriceRepr"
import img1 from "./../../../assets/checkout-item.png";
import img2 from "./../../../assets/checkout-item2.png";

const OrderCustomer = () => {
    const [activeTab, setActiveTab] = useState('All');

    const handleTabClick = (event, cityName) => {
        setActiveTab(cityName);
    };

    const orderbook = [{
        id: "1",
        name: "Thay đổi cuộc sống với nhân số học",
        image: img1,
        price: 248000,
        discount: 20,
        count: 1,
    },
    {
        id: "2",
        name: "Hiểu về trái tim (Tái bản 2023)",
        image: img2,
        price: 118500,
        discount: 25,
        count: 2,
    }
    ];

    const getTotalPrice = (deliveryFee = 0) =>
        getPriceExpr(
            orderbook.reduce((prev, curr) => {
                return prev + curr.price * (1 - curr.discount / 100) * curr.count;
            }, deliveryFee)
        );

    return (
        <div className='OrderCustomer-container'>
            <div className='header'>
                <div className="title">Đơn hàng Website</div>
            </div>

            <div className='tab'>
                <button
                    className={`tablinks ${activeTab === 'All' ? "active" : ""}`}
                    onClick={(e) => handleTabClick(e, 'All')}
                >
                    Tất cả
                </button>
                <button
                    className={`tablinks ${activeTab === 'Wait-pay' ? "active" : ""}`}
                    onClick={(e) => handleTabClick(e, 'Wait-pay')}
                >
                    Chờ thanh toán
                </button>
                <button
                    className={`tablinks ${activeTab === 'Transport' ? "active" : ""}`}
                    onClick={(e) => handleTabClick(e, 'Transport')}
                >
                    Đang vận chuyển
                </button>
                <button
                    className={`tablinks ${activeTab === 'Delivered' ? "active" : ""}`}
                    onClick={(e) => handleTabClick(e, 'Delivered')}
                >
                    Đã giao
                </button>
                <button
                    className={`tablinks ${activeTab === 'Cancelled' ? "active" : ""}`}
                    onClick={(e) => handleTabClick(e, 'Cancelled')}
                >
                    Đã hủy
                </button>
            </div>

            <div className='content'>
                <div className={`tabcontent ${activeTab === 'All' ? "active" : ""}`}>
                    <div className="username">
                        <div className="username-content">Giao hàng thành công</div>
                    </div>

                    {orderbook.map((item) => (
                        <div key={item.id}>
                            <div className="book-detail">
                                <div className="book-info">
                                    <div className="image">
                                        <img src={item.image} alt="img" width="86px" height="122px" />
                                    </div>
                                    <div className="name-count">
                                        <p>{item.name}</p>
                                        <p>x{item.count}</p>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="initial-price">
                                        <p>{getPriceExpr(item.price)}</p>
                                    </div>
                                    <div className="last-price">
                                        <p>{getPriceExpr(item.price, item.discount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="total">
                        <div className="sumprice">
                            <span className="sum">Tổng tiền:</span>
                            <span className="total-price">{getTotalPrice()}</span>
                        </div>
                    </div>
                    <div className="button-order">
                        <button className="detail-button">
                            Đánh giá
                        </button>
                        <button className="detail-button">
                            Xem chi tiết
                        </button>
                        <button className="detail-button">
                            Mua lại
                        </button>
                    </div>
                </div>

                <div className={`tabcontent ${activeTab === 'Wait-pay' ? "active" : ""}`}>
                    <h3>Hiện tại không có đơn hàng nào</h3>
                </div>

                <div className={`tabcontent ${activeTab === 'Transport' ? "active" : ""}`}>
                    <h3>Hiện tại không có đơn hàng nào</h3>
                </div>

                <div className={`tabcontent ${activeTab === 'Delivered' ? "active" : ""}`}>
                    <div className="username">
                        <div className="username-content">Giao hàng thành công</div>
                    </div>

                    {orderbook.map((item) => (
                        <div key={item.id}>
                            <div className="book-detail">
                                <div className="book-info">
                                    <div className="image">
                                        <img src={item.image} alt="img" width="86px" height="122px" />
                                    </div>
                                    <div className="name-count">
                                        <p>{item.name}</p>
                                        <p>x{item.count}</p>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="initial-price">
                                        <p>{getPriceExpr(item.price)}</p>
                                    </div>
                                    <div className="last-price">
                                        <p>{getPriceExpr(item.price, item.discount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="total">
                        <div className="sumprice">
                            <span className="sum">Tổng tiền:</span>
                            <span className="total-price">{getTotalPrice()}</span>
                        </div>
                    </div>
                </div>

                <div className={`tabcontent ${activeTab === 'Cancelled' ? "active" : ""}`}>
                    <h3>Hiện tại không có đơn hàng nào</h3>
                </div>
            </div>
        </div>
    );
};

export default OrderCustomer;
