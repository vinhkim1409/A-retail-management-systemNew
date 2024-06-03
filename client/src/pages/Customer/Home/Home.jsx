import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import background from "../../../assets/img-business.jpg";
import product1 from "../../../assets/product1.webp";
import product2 from "../../../assets/product2.webp";
import product3 from "../../../assets/product3.webp";
import product4 from "../../../assets/product4.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import images from "../../../images/index";
import { useParams } from "react-router-dom";

import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { api } from "../../../constant/constant";

function HomePage() {
  const { tenantURL } = useParams();
  const [businessImgFile, setBusinessImgFile] = useState(["", "", ""]);
  const [featProduct, setFeatProduct] = useState([]);
  const navigate = useNavigate();
  const getWebsite = async () => {
    const website = await axios.get(`${api}website/${tenantURL}`);
    setBusinessImgFile(website.data?.businessImg);
    // setFeatProduct(website.data[0].featureProduct)
    // console.log(website.data[0].featureProduct)
  };
  const getOutstandingProducts = async () => {
    const products = await axios.get(`${api}product/by-tenantURL/${tenantURL}`);
    const filteredProducts = products.data.slice(0, 4);
    setFeatProduct(filteredProducts);
    console.log("featProduct", filteredProducts);
  };
  useEffect(() => {
    getWebsite();
    getOutstandingProducts();
  }, []);

  return (
    <div className="CustomerHome-container">
      <div id="carosel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={businessImgFile[0] ? businessImgFile[0] : ""}
              className="d-block w-100"
              alt="..."
            />
          </div>
          {businessImgFile[1] ? (
            <div className="carousel-item">
              <img
                src={businessImgFile[1] ? businessImgFile[1] : ""}
                className="d-block w-100"
                alt="..."
              />
            </div>
          ) : (
            <></>
          )}
          {businessImgFile[2] ? (
            <div className="carousel-item">
              <img
                src={businessImgFile[2] ? businessImgFile[2] : ""}
                className="d-block w-100"
                alt="..."
              />
            </div>
          ) : (
            <></>
          )}
          {businessImgFile[3] ? (
            <div className="carousel-item">
              <img
                src={businessImgFile[3] ? businessImgFile[3] : ""}
                className="d-block w-100"
                alt="..."
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={"#carosel"}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={"#carosel"}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <button className="button-gotoshop">
        <Link to={`/${tenantURL}/customer/shop`} className="link-shop">
          Go to shop
        </Link>
      </button>
      <div className="title-outstanding-products">Outstanding Products</div>
      <div className="outstanding-products-container">
        <div className="outstanding-products">
          {featProduct.map((product, index) => (
            <div
              onClick={() => {
                navigate(
                  `/${tenantURL}/customer/detail-product/${product._id}`
                );
              }}
              key={index}
              className="product"
            >
              <div>
                <img
                  src={product.avatar.picture_url}
                  alt={`Product ${index + 1}`}
                  className="img-product"
                />
                <div className="name-product">{product.name}</div>
                <div className="price-product">{product.special_price}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="button-gotoshop">
          <Link to={`/${tenantURL}/customer/shop`} className="link-shop">
            See more <FontAwesomeIcon icon={faRightLong} />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
