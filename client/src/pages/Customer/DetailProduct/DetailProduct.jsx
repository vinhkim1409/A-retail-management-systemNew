import React, { useEffect, useState } from "react";
import images from "../../../images/index";
import ReadMore from "../../../components/ReadMore/ReadMore";
import ReactStars from "react-rating-stars-component";
import "./DetailProduct.scss";
import colorRed from "../../../assets/red.png";
import colorGreen from "../../../assets/green.png";
import colorBlue from "../../../assets/blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../constant/constant";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";

function DetailProduct() {
  const BookList = [
    {
      name: "Chainsaw Man - Tập 8 - Tặng kèm lót ly",
      image: images.checkoutBook2,
      nxb: "Trẻ",
      author: "Tatsuki Fujimoto",
      book_cover: "Bìa mềm",
      price: "45.000",
      rating: "5",
      id: "8934974185147",
      publish_Year: "2023",
      language: "Tiếng Việt",
      description:
        "Áo thun Adidas 3 Colors Future Icons Sportswear H39787 màu trắng, XL",
    },
    {
      name: "Chainsaw Man - Tập 9 - Tặng kèm lót ly",
      image: images.checkoutBook1,
      nxb: "Trẻ",
      author: "Tatsuki Fujimoto",
      book_cover: "Bìa mềm",
      price: "50.000",
      rating: "4",
      id: "8934974185147",
      publish_Year: "2023",
      language: "Tiếng Việt",
      description: "Đây là 1 đoạn miêu tả",
    },
    {
      name: "Chainsaw Man - Tập 10 - Tặng kèm lót ly",
      image: images.checkoutBook2,
      nxb: "Trẻ",
      author: "Tatsuki Fujimoto",
      book_cover: "Bìa mềm",
      price: "65.000",
      rating: "3",
      id: "8934974185147",
      publish_Year: "2023",
      language: "Tiếng Việt",
      description: "Đây là 1 đoạn miêu tả",
    },
    {
      name: "Chainsaw Man - Tập 11 - Tặng kèm lót ly",
      image: images.checkoutBook1,
      nxb: "Trẻ",
      author: "Tatsuki Fujimoto",
      book_cover: "Bìa mềm",
      price: "75.000",
      rating: "2",
      id: "8934974185147",
      publish_Year: "2023",
      language: "Tiếng Việt",
      description: "Đây là 1 đoạn miêu tả",
    },
    {
      name: "Chainsaw Man - Tập 12 - Tặng kèm lót ly",
      image: images.checkoutBook2,
      nxb: "Trẻ",
      author: "Tatsuki Fujimoto",
      book_cover: "Bìa mềm",
      price: "15.000",
      rating: "1",
      id: "8934974185147",
      publish_Year: "2023",
      language: "Tiếng Việt",
      description: "Đây là 1 đoạn miêu tả",
    },
  ];

  const Comments = [
    {
      title: "Amazing Story! You will LOVE it",
      rating: "5",
      content:
        "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
      time: "Staci, February 22, 2020",
    },
    {
      title: "Amazing Story! You will LOVE it",
      rating: "4",
      content:
        "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
      time: "Staci, February 22, 2020",
    },
    {
      title: "Amazing Story! You will LOVE it",
      rating: "5",
      content:
        "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
      time: "Staci, February 22, 2020",
    },
    {
      title: "Amazing Story! You will LOVE it",
      rating: "5",
      content:
        "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
      time: "Staci, February 22, 2020",
    },
    {
      title: "Amazing Story! You will LOVE it",
      rating: "4",
      content:
        "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
      time: "Staci, February 22, 2020",
    },
  ];
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const navigate = useNavigate();
  const { tenantURL, id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [rating_product, setRating] = useState(0);
  const [isReadMore, SetIsReadMore] = useState(true);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  // Xu li ham read more cho phan related product
  const resultArray = isReadMore ? BookList.slice(0, 4) : BookList;

  function toggleIsReadMore() {
    SetIsReadMore(!isReadMore);
  }
  //ket thuc phan read more cho related product

  //Xu li phan tinh rating duoc lay ra tu array comment
  var star_1 = 0;
  var star_2 = 0;
  var star_3 = 0;
  var star_4 = 0;
  var star_5 = 0;

  for (let i = 0; i < Comments.length; i++) {
    if (Comments[i].rating === "1") star_1++;
    if (Comments[i].rating === "2") star_2++;
    if (Comments[i].rating === "3") star_3++;
    if (Comments[i].rating === "4") star_4++;
    if (Comments[i].rating === "5") star_5++;
  }

  var aver_star =
    (star_1 * 1 + star_2 * 2 + star_3 * 3 + star_4 * 4 + star_5 * 5) /
    Comments.length;

  star_1 = (star_1 / Comments.length) * 100;
  star_2 = (star_2 / Comments.length) * 100;
  star_3 = (star_3 / Comments.length) * 100;
  star_4 = (star_4 / Comments.length) * 100;
  star_5 = (star_5 / Comments.length) * 100;

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const imagess = [
    images.checkoutBook1,
    images.checkoutBook2,
    images.checkoutBook1,
    images.checkoutBook2,
    images.checkoutBook1,
    images.checkoutBook2,
    images.checkoutBook1,
    images.checkoutBook2,
  ];

  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const sizes = ["M", "L"];

  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const colors = [
    {
      name: "Đỏ",
      image: colorRed,
    },
    {
      name: "Xanh lá",
      image: colorGreen,
    },
    {
      name: "Xanh da trời",
      image: colorBlue,
    },
  ];

  ///get product
  const [product, setProduct] = useState();
  const getProduct = async () => {
    const product = await axios.get(`${api}product/${id}`);
    console.log('data-product', product.data);
    setProduct(product.data);
  };
  const addToCart = async () => {
    if (!customer) {
      navigate(`/${tenantURL}/customer/login`);
    } else {
      const products = {
        productId: product._id,
        variant: 1,
        quantity: quantity,
      };
      console.log(products);
      const addtoCart = await axios.put(
        `${api}cart/add-product`,
        products,
        config
      );
      console.log(addtoCart);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {product ? (
        <div className="DetailProduct-customer-container">
          <div className="info-product">
            <div className="image">
              <div className="thumbnail-container">
                {product.pictures.map((image, index) => (
                  <img
                    key={index}
                    src={image.picture_url}
                    alt={`Thumbnail ${index}`}
                    className={
                      selectedImage === index
                        ? "selected-thumbnail"
                        : "dont-selected-thumbnail"
                    }
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
              <div className="main-image-container">
                <img src={product.avatar.picture_url} alt="Main" />
              </div>
            </div>
            <div className="name-price">
              <div className="name">{product.name}</div>
              <div className="price"></div>
              {/* chua co */}
              {/* <div className="color">
                <div className="title-color">
                  Chọn màu sắc: <strong>{selectedColor.name}</strong>
                </div>
                <div className="color-content">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color-container ${
                        selectedColor.name === color.name ? "active" : ""
                      }`}
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="color-image">
                        <img
                          src={color.image}
                          alt="red"
                          className="color-img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              {/* chua co */}
              <div className="size">
                <div className="title-size">
                  Choose size: <strong>{selectedSize}</strong>{" "}
                </div>
                <div className="size-content">
                  {sizes.map((size, index) => (
                    <div
                      key={index}
                      className={`size-container ${selectedSize === size ? "active" : ""
                        }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <div className="table-size">Size conversion table</div>
              </div>
              {/* chua co */}
              <div className="quantity">
                <div className="quantity-name">Quantity:</div>
                <div className="quantity-content">
                  <div className="change-quantity">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="minus_plus_button"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div className="quantity_text">{quantity}</div>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="minus_plus_button"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="in-stock">
                    {/* {product.saleInfo.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.quantity,
                      0
                    )}{" "} */}
                    10 products available
                  </div>
                </div>
              </div>
              <div className="button-add-buy">
                <div className="buy_section">
                  <button className="add_wishlist_button" onClick={addToCart}>
                    Add to cart
                  </button>
                </div>
                <div className="cart_section">
                  <button className="buy_now_button">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-product">
            <div className="spec_info">
              <div className="bold while_background title_rp">
                Information Product
              </div>
              <table className="while_background spec_product_table">
                {/* {product.detailInfo.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.name}</td>
                    <td>{detail.info}</td>
                  </tr>
                ))} */}

                <tr>
                  <td>Content: </td>
                </tr>
              </table>
              <div className="spec_descrip">
                {/* dangerouslySetInnerHTML={{ __html: content }} */}
                <ReadMore>{BookList[0].description}</ReadMore>
              </div>
            </div>
          </div>
          <div className="review-product">
            <div className="spec_evaluate">
              <div className="bold while_background title_rp">
                Product reviews
              </div>
              <div className="Start_rating rating_grid">
                <div className="while_background evaluate_product">
                  <div>
                    <div className="while_background start_rating_number">
                      {aver_star}/{" "}
                      <span className="while_background static_number_star_rating">
                        5
                      </span>
                    </div>
                    <div className="while_background Start_rating">
                      <ReactStars
                        count={5}
                        value={4.5}
                        isHalf={true}
                        activeColor={"#F7B32D"}
                        size={50}
                        edit={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="while_background progress_bar_grid">
                  <div style={{ width: "100%", display: "block" }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>1 star</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: `${star_1}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>2 stars</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: `${star_2}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>3 stars</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: `${star_3}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>4 stars</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: `${star_4}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>5 stars</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: `${star_5}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {Comments.map((acomment, index) => (
                <div className="while_background" key={index}>
                  <div className="while_background comment_grid">
                    <div className="while_background flex title_comment_box">
                      <div className="while_background comment_title">
                        {" "}
                        {acomment.title}
                      </div>
                      <div className="while_background">
                        <ReactStars
                          count={5}
                          value={acomment.rating}
                          isHalf={true}
                          activeColor={"#F7B32D"}
                          size={30}
                          edit={false}
                        />
                      </div>
                    </div>
                    <div className="while_background comment_content">
                      {" "}
                      {acomment.content}
                    </div>
                    <div className="while_background comment_time">
                      {" "}
                      {acomment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="pagination"></div> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DetailProduct;
