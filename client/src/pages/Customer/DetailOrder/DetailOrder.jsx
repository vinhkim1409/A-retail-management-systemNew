import React, { useState } from "react";
import "./DetailOrder.scss";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import img1 from "./../../../assets/checkout-item.png";
import img2 from "./../../../assets/checkout-item2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const DetailOrderB = () => {
  const orderbook = [
    {
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
    },
  ];

  const getTotalPrice = (deliveryFee = 0) =>
    getPriceExpr(
      orderbook.reduce((prev, curr) => {
        return prev + curr.price * (1 - curr.discount / 100) * curr.count;
      }, deliveryFee)
    );

  const delivery = [
    {
      time: "25/02/2024 15:12:13",
      status: "Lấy hàng thành công tại Hà Nội",
    },
    {
      time: "25/02/2024 21:12:13",
      status: "Đã đến kho ABC quận Hoàng Mai, Hà Nội",
    },
    {
      time: "25/02/2024 23:12:13",
      status: "Đang trung chuyển đến HCM",
    },
    {
      time: "27/02/2024 15:12:13",
      status: "Đã đến kho Quận Tân Bình, TPHCM",
    },
  ];

  return (
    <div className="DetailOrderM-container">
      <div className="header">
        <div className="title">Chi tiết đơn hàng</div>
      </div>

      <div className="delivery">
        <div className="address">
          <div className="title-address">Địa chỉ nhận hàng</div>
          <div className="content-address">
            <div className="name-address">
              <div className="lable">Name:</div>
              Nguyễn Minh Hưng
            </div>
            <div className="phone-address">
              <div className="lable">Phone Number:</div> 012345678
            </div>
            <div className="detail-address">
              <div className="lable">Address:</div>Bcons Plaza, đường Thống
              Nhất, Đông Hòa, Dĩ An, Bình Dương
            </div>
          </div>
        </div>
        <div className="detail-delivery">
          <div className="title-delivery">Hành trình đơn hàng</div>
          <div className="content-delivery">
            {delivery.map((item, index) => (
              <div key={index} className="time-status-delivery">
                <div className="time-delivery">
                  <FontAwesomeIcon icon={faCircle} className="icon-circle" />{" "}
                  {item.time}
                </div>
                <div className="status-delivery">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="order">
        <div className="tabcontent">
          <div className="username">
            <div className="username-content">Giao hàng thành công</div>
          </div>

          {orderbook.map((item) => (
            <div key={item.id}>
              <div className="book-detail">
                <div className="book-info">
                  <div className="image">
                    <img
                      src={item.image}
                      alt="img"
                      width="86px"
                      height="122px"
                    />
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
            <div className="sumprice">
              <span className="sum">Phí vận chuyển:</span>
              <span className="total-price">{getPriceExpr(20000)}</span>
            </div>
            <div className="sumprice">
              <span className="sum">Giảm giá:</span>
              <span className="total-price">{getPriceExpr(10000)}</span>
            </div>
            <div className="sumprice">
              <span className="sum">Thành tiền:</span>
              <span className="final-price">{getPriceExpr(386150)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderB;
