import React from 'react';
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
  return (
    <div className="CustomerHome-container">
      <div id="carosel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={images.carousel0} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images.carousel1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images.carousel2} className="d-block w-100" alt="..." />
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
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`Product ${index + 1}`} className="img-product" />
              <div className="name-product">{product.name}</div>
              <div className="price-product">{product.price}</div>
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
