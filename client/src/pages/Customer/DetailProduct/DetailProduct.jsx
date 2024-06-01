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
import moment from "moment";

function DetailProduct() {
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
  const [attributeData, setAttributeData] = useState([]);
  const [attributeName, setAttributeName] = useState([]);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevCount) => prevCount - 1);
      const handleDecrement = () => {
        if (quantity > 0) {
          setQuantity((prevCount) => prevCount - 1);
        }
      };
    }
  };

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  // Xu li ham read more cho phan related product

  function toggleIsReadMore() {
    SetIsReadMore(!isReadMore);
  }
  //ket thuc phan read more cho related product
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

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const handleAttributeClick = (attributeName, value) => {
    const attribute = attributeName.find((attr) => attr.values.includes(value));
    if (attribute) {
      const optionId = attribute.option_ids[attribute.values.indexOf(value)];
      setSelectedAttributes((prevState) => ({
        ...prevState,
        [attribute.name]: {
          value: value,
          attribute_id: attribute.attribute_id,
          option_id: optionId,
        },
      }));
    }
  };

  const getVariantSku = () => {
    if (product && product.variants) {
      const selectedOptions = Object.values(selectedAttributes).map((attr) => ({
        attribute_id: attr.attribute_id,
        option_id: attr.option_id,
      }));

      const matchedVariant = product.variants.find((variant) => {
        return selectedOptions.every((selectedOption) => {
          return variant.variant_attributes.some(
            (attr) =>
              attr.attribute_id === selectedOption.attribute_id &&
              attr.option_id === selectedOption.option_id
          );
        });
      });

      return matchedVariant ? matchedVariant.variant_sku : null;
    }
    return null;
  };

  ///get product
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const getProduct = async () => {
    const product = await axios.get(`${api}product/${id}`);
    setProduct(product.data);
  };

  const getReview = async () => {
    const review = await axios.get(`${api}review/get-by-product/${id}`);
    setReview(review.data.data);
  };

  const processAttributes = () => {
    let attributes = [];

    const is_config_variant = product ? product.is_config_variant : false;
    if (is_config_variant) {
      product.variants.forEach((variant) => {
        const variantAttributes = variant.variant_attributes;

        variantAttributes.forEach((attr) => {
          let attribute = attributes.find(
            (a) => a.attribute_id === attr.attribute_id
          );

          if (attribute) {
            attribute.option_ids.push(attr.option_id);
          } else {
            attributes.push({
              attribute_id: attr.attribute_id,
              option_ids: [attr.option_id],
            });
          }
        });
      });
    }

    const attributeName = attributes
      .map((attr) => {
        const attributeDataItem = attributeData.find(
          (ad) => ad.id === attr.attribute_id
        );
        if (attributeDataItem) {
          const uniqueOptionIds = Array.from(new Set(attr.option_ids));
          const uniqueValues = uniqueOptionIds
            .map((option_id) => {
              const valueItem = attributeDataItem.attribute_values.find(
                (av) => av.id === option_id
              );
              return valueItem ? valueItem.value : null;
            })
            .filter((value) => value !== null);

          return {
            attribute_id: attr.attribute_id,
            name: attributeDataItem.name,
            option_ids: uniqueOptionIds,
            values: uniqueValues,
          };
        }
        return null;
      })
      .filter((attr) => attr !== null);

    setAttributeName(attributeName);
  };

  const cat_4_id = product ? product.cat_4_id : 0;

  const getAttributes = async () => {
    axios
      .get(`${api}category-info/${cat_4_id}`)
      .then((response) => {
        const attributes = response.data.attributes;
        const attributeData = attributes.map((attribute) => {
          return {
            id: attribute.id,
            name: attribute.name,
            attribute_values: attribute.attribute_values.map((value) => ({
              id: value.id,
              value: value.value,
            })),
          };
        });
        setAttributeData(attributeData);
      })
      .catch((error) => {
        console.error("Error fetching attribute data:", error);
      });
  };

  const addToCart = async () => {
    if (quantity > 0) {
      if (!customer) {
        navigate(`/${tenantURL}/customer/login`);
      } else {
        const variantSku = getVariantSku();
        let variantNumber = product.variants.findIndex(
          (variant) => variant.variant_sku == variantSku
        );
        const products = {
          productId: product._id,
          variant: variantNumber + 1,
          quantity: quantity,
        };
        const addtoCart = await axios.put(
          `${api}cart/add-product`,
          products,
          config
        );
        if (addtoCart.data.success) {
          // Hiển thị thông báo
          setShowAddToCartSuccess(true);
          setTimeout(() => {
            setShowAddToCartSuccess(false);
          }, 2000);
        }
      }
    }
    return;
  };

  useEffect(() => {
    getProduct();
    getReview();
  }, []);

  useEffect(() => {
    if (product) {
      getAttributes();
      processAttributes();
    }
  }, [product, attributeData]);

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
                <img
                  src={product.pictures[selectedImage].picture_url}
                  alt="Main"
                />
              </div>
            </div>
            <div className="name-price">
              <div className="name">{product.name}</div>

              {attributeName.map((attribute, index) => (
                <div key={index} className="color">
                  <div className="title-color">
                    Choose {attribute.name}:{" "}
                    <strong>{selectedAttributes[attribute.name]?.value}</strong>
                  </div>
                  <div className="color-content">
                    {attribute.values.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        className={`color-container ${
                          selectedAttributes[attribute.name]?.value === value
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleAttributeClick(attributeName, value)
                        }
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                    {product.stock_quantity} products available
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

              {showAddToCartSuccess && (
                <div className="add-to-cart-success">
                  Add to cart successfully
                </div>
              )}

              {/* <div className="variant-sku">
                <strong>Variant SKU: </strong> {getVariantSku()}
              </div> */}
            </div>
          </div>
          <div className="detail-product">
            <div className="spec_info">
              <div className="bold while_background title_rp">
                Information Product
              </div>
              <div className="spec_descrip">
                <ReadMore>{product.description}</ReadMore>
              </div>
            </div>
          </div>
          <div className="review-product">
            <div className="spec_evaluate">
              <div className="bold while_background title_rp">Review</div>
              <div className="Start_rating rating_grid">
                <div className="while_background evaluate_product">
                  <div>
                    <div className="while_background start_rating_number">
                      {product.ratingPoint}/{" "}
                      <span className="while_background static_number_star_rating">
                        5
                      </span>
                    </div>
                    <div className="while_background Start_rating">
                      <ReactStars
                        count={5}
                        value={product.ratingPoint}
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
                      <div>1 sao</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{
                              width: `${
                                (review.filter(
                                  (comment) => comment.ratingPoint == 1
                                ).length /
                                  review.length) *
                                100
                              }%`,
                            }}
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
                      <div>2 sao</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{
                              width: `${
                                (review.filter(
                                  (comment) => comment.ratingPoint == 2
                                ).length /
                                  review.length) *
                                100
                              }%`,
                            }}
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
                      <div>3 sao</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{
                              width: `${
                                (review.filter(
                                  (comment) => comment.ratingPoint == 3
                                ).length /
                                  review.length) *
                                100
                              }%`,
                            }}
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
                      <div>4 sao</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{
                              width: `${
                                (review.filter(
                                  (comment) => comment.ratingPoint == 4
                                ).length /
                                  review.length) *
                                100
                              }%`,
                            }}
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
                      <div>5 sao</div>
                      <div style={{ width: "90%", paddingLeft: "15px" }}>
                        <div class="progress">
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{
                              width: `${
                                (review.filter(
                                  (comment) => comment.ratingPoint == 5
                                ).length /
                                  review.length) *
                                100
                              }%`,
                            }}
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

              {review?.map((acomment, index) => (
                <div className="while_background" key={index}>
                  <div className="while_background comment_grid">
                    <div className="while_background flex title_comment_box">
                      <div className="while_background comment_title">
                        {" "}
                        {acomment?.title}
                      </div>
                      <div className="while_background">
                        <ReactStars
                          count={5}
                          value={acomment?.ratingPoint}
                          isHalf={true}
                          activeColor={"#F7B32D"}
                          size={30}
                          edit={false}
                        />
                      </div>
                    </div>
                    <div className="while_background comment_content">
                      {" "}
                      {acomment?.description}
                    </div>
                    <div className="while_background comment_time">
                      {" "}
                      {moment(acomment?.createdAt).format("D MMM, YYYY h:mm A")}
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
