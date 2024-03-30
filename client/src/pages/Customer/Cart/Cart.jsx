import React, { useState, useEffect } from 'react'
import './Cart.scss';
import images from "../../../images/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getPriceExpr } from "../../../utils/getPriceRepr"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {api} from "../../../constant/constant"
const Cart = () => {

  const navigate=useNavigate()
  const [book, setBook] = useState([]);

  const address = [{
    id: "1",
    fullname: "Lê Duy Khang",
    phonenumber: "(+84)123456780",
    province: "TP Hồ Chí Minh",
    district: "Thành Phố Thủ Đức",
    ward: "Phường Linh Trung",
    addr: "Đại học Bách Khoa TPHCM",
  },
  ];

const getCart=async ()=>{
  const cart=await axios.get(`${api}cart`)
  console.log(cart.data[0].products)
  setBook(cart.data[0].products)
}
useEffect(()=>{
getCart()
},[])

  const countbook = book.length;
  // const getTotalPrice = (deliveryFee = 0) =>
  //   getPriceExpr(
  //     book.reduce((prev, curr) => {
  //       return prev + curr.price * (1 - curr.discount / 100) * curr.count;
  //     }, deliveryFee)
  //   );

  const handleCountIncrease = (index) => {
    const newBook = [...book];
    newBook[index].quantity += 1;
    setBook(newBook);
  };

  const handleCountDecrease = (index) => {
    const newBook = [...book];
    if (newBook[index].quantity > 1) {
      newBook[index].quantity -= 1;
      setBook(newBook);
    }
  };

  const handleCountChange = (event, index) => {
    const newBook = [...book];
    const count = Number(event.target.value);
    if (count > 0) {
      newBook[index].quantity = count;
      setBook(newBook);
    }
  };

  const handleRemoveItem = (index) => {
    const newBook = [...book];
    newBook.splice(index, 1);
    setBook(newBook);
    //goi api de thay doi so luong product trong cart
  };


  const [selectedItems, setSelectedItems] = useState([]);
  const [isHeadChecked, setIsHeadChecked] = useState(false);

  const handleHeadCheckboxChange = () => {
    const newSelectedItems = !isHeadChecked ? book.map(item => item._id) : [];
    setSelectedItems(newSelectedItems);
    setIsHeadChecked(!isHeadChecked || newSelectedItems.length === book.length);
  };

  const handleCheckboxChange = (index) => {
    const selectedItem = book[index]._id;
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

    if (isHeadChecked && selectedIndex > -1 && newSelectedItems.indexOf(selectedItem) === -1) {
      setIsHeadChecked(false);
    } else if (newSelectedItems.length === book.length) {
      setIsHeadChecked(true);
    }
  };


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedBook = book.filter(item => selectedItems.includes(item._id));
    const newTotalPrice = selectedBook.reduce((prev, curr) => {
      return prev + curr.price * (1 - 10 / 100) * curr.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, book]);
const buyProduct=()=>{
  console.log(selectedItems)
  const selectedProducts = book.filter(item => selectedItems.includes(item._id))
  
  navigate('/customer/checkout',{state:selectedProducts})
}
  return (
    <div className="Cart-container">
      <div className="title">Cart</div>
      <div className="content">
        <div className="info">
          <div className="head">
            <div className="checkbox-head">
              <input className="checkbox" type="checkbox" checked={isHeadChecked}
                onChange={() => handleHeadCheckboxChange()} />
            </div>
            <div className="count-book-head">
              Tất cả ({countbook} sản phẩm)
            </div>
            <div className="price-head">
              Đơn giá
            </div>
            <div className="count-head">
              Số lượng
            </div>
          </div>

          {book.map((item, index) => (
            <div key={item._id}>
              <div className="book-info">
                <div className="checkbox-info">
                  <input className="checkbox" type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(index)} />
                </div>
                <div className="book-detail">
                  <div className="book-image">
                    <img src={item.product.picture[0]} width="65px" height="92px" alt="alt" />
                  </div>
                  <div className="book-name">
                    <p>{item.product.name}</p>
                  </div>
                </div>
                <div className="price">
                  <div className="last-price">
                    <p>{getPriceExpr(item.price, 20)}</p>
                  </div>
                  <div className="initial-price">
                    {getPriceExpr(item.price)}
                  </div>
                </div>
                <div className="count">
                  <button onClick={() => handleCountDecrease(index)}>-</button>
                  <input
                    className='quantity-input'
                    value={item.quantity}
                    onChange={(event) => handleCountChange(event, index)}
                  />
                  <button onClick={() => handleCountIncrease(index)}>+</button>
                </div>
                <button className="button-delete">
                  <FontAwesomeIcon icon={faTrashCan} className="icon-trashcan" onClick={() => handleRemoveItem(index)} />
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
            <div className="line">
            </div>
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

    </div >
  )
}

export default Cart