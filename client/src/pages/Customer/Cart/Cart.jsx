import React, { useState, useEffect } from 'react'
import './Cart.scss';
import images from "../../../images/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getPriceExpr } from "../../../utils/getPriceRepr"

const Cart = () => {

  const [book, setBook] = useState([
    {
      id: "1",
      name: "Thay đổi cuộc sống với nhân số học",
      image: images.checkoutBook1,
      price: 250000,
      discount: 20,
      count: 1,
    },
    {
      id: "2",
      name: "Hiểu về trái tim (Tái bản 2023)",
      image: images.checkoutBook2,
      price: 125000,
      discount: 25,
      count: 2,
    },
    {
      id: "3",
      name: "Hiểu về trái tim (Tái bản 2023) v2",
      image: images.checkoutBook2,
      price: 150000,
      discount: 25,
      count: 1,
    },
    {
      id: "4",
      name: "Thay đổi cuộc sống với nhân số học v2",
      image: images.checkoutBook1,
      price: 300000,
      discount: 20,
      count: 1,
    },
  ]);

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


  const countbook = book.length;
  // const getTotalPrice = (deliveryFee = 0) =>
  //   getPriceExpr(
  //     book.reduce((prev, curr) => {
  //       return prev + curr.price * (1 - curr.discount / 100) * curr.count;
  //     }, deliveryFee)
  //   );

  const handleCountIncrease = (index) => {
    const newBook = [...book];
    newBook[index].count += 1;
    setBook(newBook);
  };

  const handleCountDecrease = (index) => {
    const newBook = [...book];
    if (newBook[index].count > 1) {
      newBook[index].count -= 1;
      setBook(newBook);
    }
  };

  const handleCountChange = (event, index) => {
    const newBook = [...book];
    const count = Number(event.target.value);
    if (count > 0) {
      newBook[index].count = count;
      setBook(newBook);
    }
  };

  const handleRemoveItem = (index) => {
    const newBook = [...book];
    newBook.splice(index, 1);
    setBook(newBook);
  };


  const [selectedItems, setSelectedItems] = useState([]);
  const [isHeadChecked, setIsHeadChecked] = useState(false);

  const handleHeadCheckboxChange = () => {
    const newSelectedItems = !isHeadChecked ? book.map(item => item.id) : [];
    setSelectedItems(newSelectedItems);
    setIsHeadChecked(!isHeadChecked || newSelectedItems.length === book.length);
  };

  const handleCheckboxChange = (index) => {
    const selectedItem = book[index].id;
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
    const selectedBook = book.filter(item => selectedItems.includes(item.id));
    const newTotalPrice = selectedBook.reduce((prev, curr) => {
      return prev + curr.price * (1 - curr.discount / 100) * curr.count;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, book]);

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
            <div key={item.id}>
              <div className="book-info">
                <div className="checkbox-info">
                  <input className="checkbox" type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(index)} />
                </div>
                <div className="book-detail">
                  <div className="book-image">
                    <img src={item.image} width="65px" height="92px" alt="alt" />
                  </div>
                  <div className="book-name">
                    <p>{item.name}</p>
                  </div>
                </div>
                <div className="price">
                  <div className="last-price">
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                  <div className="initial-price">
                    {getPriceExpr(item.price)}
                  </div>
                </div>
                <div className="count">
                  <button onClick={() => handleCountDecrease(index)}>-</button>
                  <input
                    className='quantity-input'
                    value={item.count}
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
          <button className="button-buy">
            Mua hàng ({selectedItems.length})
          </button>
        </div>
      </div>

    </div >
  )
}

export default Cart