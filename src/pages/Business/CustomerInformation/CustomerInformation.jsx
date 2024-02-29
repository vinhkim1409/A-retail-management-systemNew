import React, { useState, useEffect } from "react";
import "./CustomerInformation.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import avt from "./../../../assets/avttest.jpg"

function CustomerInformation() {

    return (
        <div className="CustomerInformation-container">
            <div className="title">Customer Information</div>
            <div className="content">
                <div className="avt">
                    <img src={avt} alt="avt" />
                </div>
                <div className="infor">
                    <div className="name">Nguyễn Văn A</div>
                    <div className="sex">Giới tính: Nam</div>
                    <div className="phone">Số điện thoại: 0123456789</div>
                    <div className="address">Địa chỉ: KTX khu A ĐHQG TPHCM</div>
                    <div className="email">Email: nguyenvana@gmail.com</div>
                </div>
            </div>
        </div>
    );
}

export default CustomerInformation;