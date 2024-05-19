import React, { useState, useEffect } from "react";
import "./ImportGoods.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faPenToSquare,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ImportGoods() {

    return (
        <>
            {/* Viết một đoạn code giao diện là một form để điền giá trị nhập hàng, bao gồm các thông tin như sau:
            select sản phẩm
            nhập số lượng sản phẩm
            Đồng thời lưu vào hệ thông database gồm 3 thông tin: id sản phẩm, số lượng sản phẩm, ngày giờ nhập */}
            <div className="import-goods-container">
                <div className="import-goods-title">Import Goods</div>
                <div className="import-goods-form">
                    <div className="import-goods-form-item">
                        <label>Product</label>
                        <select>
                            <option value="product1">Gel Derma Forte dưỡng da, giảm mụn, thâm 15gr</option>
                            <option value="product2">Áo thun Adidas 3 Colors Future Icons Sportswear H39787</option>
                            <option value="product3">Giày Thể Thao Thông Dụng Nam</option>
                            <option value="product4">Màn hình Asus TUF GAMING VG249Q3A 24" Fast IPS 180Hz</option>
                        </select>
                    </div>
                    <div className="import-goods-form-item">
                        <label>Quantity</label>
                        <input type="number" />
                    </div>
                    <button>Import</button>
                </div>
            </div>
        </>
    );
}

export default ImportGoods;
