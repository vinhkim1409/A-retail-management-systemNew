import React, { useEffect, useState } from "react";
import "./ProductItem.scss";
import {
  Checkbox,
  MenuItem,
  OutlinedInput,
  Select,
  Rating,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function ProductItem({ product, index }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${index < 4 ? "detail-product mr" : "detail-product mr-end"}`}
    >
      <div
        id={product._id}
        className="carousel slide img-frame"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {product.picture.map((img, index) => (
            <div
              className={`${
                index === 0 ? "carousel-item active" : "carousel-item"
              }`}
            >
              <img
                src={img}
                className="img"
                alt="..."
                onClick={() => {
                  navigate(`/customer/detail-product/${product._id}`);
                }}
              />
            </div>
          ))}
        </div>
        {/* <button
          className="carousel-control-prev button-control"
          type="button"
          data-bs-target={`#${product._id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next button-control"
          type="button"
          data-bs-target={`#${product._id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="price-product">
          {product.saleInfo.length >= 1
            ? new Intl.NumberFormat("en-US").format(
                product.saleInfo[0].sellPrice
              )
            : "000"}
          đ
        </div>
        <Rating value={4.5} precision={0.5} readOnly />
      </div>
    </div>
  );
}
export default ProductItem;
