import React, { useEffect, useState } from "react";
import "./ProductItem.scss";
import {
  Checkbox,
  MenuItem,
  OutlinedInput,
  Select,
  Rating,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

function ProductItem({ product, index }) {
  const navigate = useNavigate();
  const { tenantURL } = useParams();

  return (
    <div
      className={`${index < 4 ? "detail-product mr" : "detail-product mr-end"}`}
    >
      <div className="img-frame">
        <img
          src={product?.avatar?.picture_url}
          className="img"
          alt="..."
          onClick={() => {
            navigate(`/${tenantURL}/customer/detail-product/${product?._id}`);
          }}
        />
      </div>

      <div className="info">
        <div className="name">{product?.name}</div>
        <div className="price-product">
          {product?.special_price
            ? new Intl.NumberFormat("en-US").format(product?.special_price)
            : new Intl.NumberFormat("en-US").format(product?.price)}
        </div>
        <Rating value={product?.ratingPoint} precision={0.5} readOnly />
      </div>
    </div>
  );
}
export default ProductItem;
