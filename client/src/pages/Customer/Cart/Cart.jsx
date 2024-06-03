import React, { useState, useEffect } from "react";
import "./Cart.scss";
import images from "../../../images/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useSelector } from "react-redux";
const Cart = () => {
  const { tenantURL } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const address = [
    {
      id: "1",
      fullname: "Lê Duy Khang",
      phonenumber: "(+84)123456780",
      province: "TP Hồ Chí Minh",
      district: "Thành Phố Thủ Đức",
      ward: "Phường Linh Trung",
      addr: "Đại học Bách Khoa TPHCM",
    },
  ];

  const getCart = async () => {
    const cart = await axios.get(`${api}cart`, config);
    console.log(cart.data[0].products);
    setProducts(cart.data[0].products);
  };
  useEffect(() => {
    if (!customer) {
      navigate(`/${tenantURL}/customer/login`);
    } else {
      getCart();
    }
  }, []);

  const countproducts = products.length;
  // const getTotalPrice = (deliveryFee = 0) =>
  //   getPriceExpr(
  //     book.reduce((prev, curr) => {
  //       return prev + curr.price * (1 - curr.discount / 100) * curr.count;
  //     }, deliveryFee)
  //   );

  const handleCountIncrease = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
  };

  const handleCountDecrease = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
    }
  };

  const handleCountChange = (event, index) => {
    const newProducts = [...products];
    const count = Number(event.target.value);
    if (count > 0) {
      newProducts[index].quantity = count;
      setProducts(newProducts);
    }
  };

  const handleRemoveItem = async (index) => {
    const deleteProductInCart = await axios.put(
      `${api}cart/delete-product/${products[index]._id}`,
      { productid: products[index]._id },
      config
    );
    console.log(deleteProductInCart);
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    //goi api de thay doi so luong product trong cart
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [isHeadChecked, setIsHeadChecked] = useState(false);

  const handleHeadCheckboxChange = () => {
    const newSelectedItems = !isHeadChecked
      ? products.map((item) => item._id)
      : [];
    setSelectedItems(newSelectedItems);
    setIsHeadChecked(
      !isHeadChecked || newSelectedItems.length === products.length
    );
  };

  const handleCheckboxChange = (index) => {
    const selectedItem = products[index]._id;
    const selectedIndex = selectedItems.indexOf(selectedItem);
    let newSelectedItems = [...selectedItems];

    if (isHeadChecked) {
      if (selectedIndex === -1) {
        newSelectedItems.push(selectedItem);
      } else {
        newSelectedItems.splice(selectedIndex, 1);
      }
    } else {
      if (selectedIndex > -1) {
        newSelectedItems.splice(selectedIndex, 1);
      } else {
        newSelectedItems.push(selectedItem);
      }
    }

    setSelectedItems(newSelectedItems);

    if (
      isHeadChecked &&
      selectedIndex > -1 &&
      newSelectedItems.indexOf(selectedItem) === -1
    ) {
      setIsHeadChecked(false);
    } else if (newSelectedItems.length === products.length) {
      setIsHeadChecked(true);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedProducts = products.filter((item) =>
      selectedItems.includes(item._id)
    );
    const newTotalPrice = selectedProducts.reduce((prev, curr) => {
      return (
        prev +
        (curr.variant > 0
          ? curr.product.variants[curr.variant - 1].variant_special_price
            ? curr.product.variants[curr.variant - 1].variant_special_price
            : curr.product.variants[curr.variant - 1].variant_price
          : curr.product.special_price
          ? curr.product.special_price
          : curr.product.price) *
          curr.quantity
      );
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, products]);
  const buyProduct = () => {
    console.log(selectedItems);
    const selectedProducts = products.filter((item) =>
      selectedItems.includes(item._id)
    );

    navigate(`/${tenantURL}/customer/checkout`, { state: selectedProducts });
  };
  return (
    <div className="Cart-container">
      <div className="title">Cart</div>
      <div className="content">
        <div className="info">
          <div className="head">
            <div className="checkbox-head">
              <input
                className="checkbox"
                type="checkbox"
                checked={isHeadChecked}
                onChange={() => handleHeadCheckboxChange()}
              />
            </div>
            <div className="count-book-head">
              Tất cả ({countproducts} sản phẩm)
            </div>
            <div className="price-head">Đơn giá</div>
            <div className="count-head">Số lượng</div>
          </div>

          {products.map((item, index) => (
            <div key={item._id}>
              <div className="book-info">
                <div className="checkbox-info">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
                <div className="book-detail">
                  <div className="book-image">
                    <img
                      src={item.product.avatar.picture_url}
                      width="65px"
                      height="92px"
                      alt="alt"
                    />
                  </div>
                  <div className="book-name">
                    <p>{item.product.name}</p>
                  </div>
                </div>
                <div className="price">
                  <div className="last-price">
                    <p>
                      {getPriceExpr(
                        item.variant > 0
                          ? item.product.variants[item.variant - 1]
                              .variant_special_price
                            ? item.product.variants[item.variant - 1]
                                .variant_special_price
                            : item.product.variants[item.variant - 1]
                                .variant_price
                          : item.product.special_price
                          ? item.product.special_price
                          : item.product.price
                      )}
                    </p>
                  </div>
                  <div className="initial-price">
                    {getPriceExpr(
                      item.variant > 0
                        ? item.product.variants[item.variant - 1].variant_price
                        : item.product.price
                    )}
                  </div>
                </div>
                <div className="count">
                  <button onClick={() => handleCountDecrease(index)}>-</button>
                  <input
                    className="quantity-input"
                    value={item.quantity}
                    onChange={(event) => handleCountChange(event, index)}
                  />
                  <button onClick={() => handleCountIncrease(index)}>+</button>
                </div>
                <button className="button-delete">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="icon-trashcan"
                    onClick={() => handleRemoveItem(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="address-price">
          <div className="price-info">
            <div className="price-detail">
              <div className="initial-total">
                <p className="color-grey">Tạm tính</p>
                <p>{getPriceExpr(totalPrice)}</p>
              </div>
              <div className="discount">
                <p className="color-grey">Giảm giá</p>
                <p>{getPriceExpr(0)}</p>
              </div>
            </div>
            <div className="line"></div>
            <div className="total-price">
              <p className="color-grey">Tổng tiền</p>
              <p className="final-price">{getPriceExpr(totalPrice)}</p>
            </div>
          </div>
          <button className="button-buy" onClick={buyProduct}>
            Mua hàng ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
