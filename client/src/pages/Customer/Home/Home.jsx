import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.scss"
import background from "../../../assets/img-business.jpg";
import product1 from "../../../assets/product1.webp";
import product2 from "../../../assets/product2.webp";
import product3 from "../../../assets/product3.webp";
import product4 from "../../../assets/product4.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import images from "../../../images/index";

import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { api } from '../../../constant/constant';
const products = [
  {
    image: product1,
    name: "Áo khoác dù trắng phối xéo",
    price: 350000,
  },
  {
    image: product2,
    name: "Áo khoác dù phối 2 lớp",
    price: 350000,
  },
  {
    image: product3,
    name: "Áo khoác dù dây kéo xéo",
    price: 320000,
  },
  {
    image: product4,
    name: "Áo khoác dù phối túi",
    price: 295000,
  },
];

function HomePage() {
  const [businessImgFile, setBusinessImgFile] = useState([]);
  const [featProduct, setFeatProduct] = useState([]);
  const getWebsite= async()=>{
    const website=await axios.get(`${api}website`)
    setBusinessImgFile(website.data[0].businessImg)
    setFeatProduct(website.data[0].featureProduct)
    console.log(website.data[0].featureProduct)
  }
  useEffect(()=>{
    getWebsite()
  },[])
  
  return (
    <div className="CustomerHome-container">
      <div id="carosel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={businessImgFile[0]} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={businessImgFile[1]} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={businessImgFile[2]} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={"#carosel"} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#carosel"} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <button className="button-gotoshop">
        <Link to={'/customer/shop'} className="link-shop">Go to shop</Link>
      </button>
      <div className="title-outstanding-products">Sản phẩm nổi bật</div>
      <div className="outstanding-products-container">
        <div className="outstanding-products">
          {featProduct.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.picture[0]} alt={`Product ${index + 1}`} className="img-product" />
              <div className="name-product">{product.name}</div>
              <div className="price-product">{product.saleInfo[0].sellPrice}</div>
            </div>
          ))}
        </div>
        <button className="button-gotoshop">
          <Link to={'/customer/shop'} className="link-shop">
            Xem thêm <FontAwesomeIcon icon={faRightLong} />
          </Link>
        </button>
      </div>

    </div>
  );
}

export default HomePage;
