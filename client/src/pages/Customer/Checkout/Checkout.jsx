import React, { useEffect, useState } from "react";
import images from "../../../images/index";
import AddButton from "../../../components/AddButton/AddButton";
import "./Checkout.scss";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {api} from '../../../constant/constant'

const Checkout = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setOrder(location.state)
  }, []);
  const expressDeliveryProvinces = ["TPHCM", "Hà Nội", "Đà Nẵng"];

  const userAddresses = [
    {
      id: "0",
      fname: "Hưng",
      lname: "Nguyễn Minh",
      phone: "0123456789",
      province: "TPHCM",
      district: "Quận 1",
      ward: "Phường 1",
      addr: "123 John Doe",
    },
    {
      id: "1",
      fname: "A",
      lname: "Nguyễn Văn",
      phone: "0987654321",
      province: "Hà Nội",
      district: "Quận Hà Đông",
      ward: "Phường 1",
      addr: "100 Albert Einstein",
    },
    {
      id: "2",
      fname: "B",
      lname: "Lê Thị",
      phone: "0123789456",
      province: "Thanh Hóa",
      district: "Huyện Quảng Xương",
      ward: "Xã ABC",
      addr: "456 Alan Turing",
    },
  ];
  const [order,setOrder]=useState([])
//   const order = [
//     {
//       id: "checkoutBook1",
//       name: "Thay đổi cuộc sống với nhân số học",
//       image: images.checkoutBook1,
//       price: 248000,
//       discount: 20,
//       count: 1,
//     },
//     {
//       id: "checkoutBook2",
//       name: "Hiểu Về Trái Tim (Tái Bản 2023)",
//       image: images.checkoutBook2,
//       price: 158000,
//       discount: 25,
//       count: 2,
//     },
//   ];

  const getTotalPrice = (deliveryFee = 0) =>
    getPriceExpr(
      order.reduce((prev, curr) => {
        return prev + curr.price * (1 - 20 / 100) * curr.quantity;
      }, deliveryFee)
    );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressChoice, setAddressChoice] = useState(0); // order: radio and select, top -> down => 0 and up; 0 means the first choice
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [hasExpress, setHasExpress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    setName(
      `${userAddresses[addressChoice].lname} ${userAddresses[addressChoice].fname}`
    );
    setPhone(userAddresses[addressChoice].phone);
    setHasExpress(
      expressDeliveryProvinces.includes(userAddresses[addressChoice].province)
    );
  }, [addressChoice]);

  const deliveryMethodTexts = [
    "Thông thường",
    "Nhanh",
    `Hỏa tốc ${!hasExpress ? "(không hỗ trợ)" : ""}`,
  ];

  const deliveryMethods = ["Thông thường", "Nhanh", "Hỏa tốc"];

  const paymentMethods = [
    {
      text: "Ví Momo",
      logo: images.momoLogo,
    },
    {
      text: "Ví ZaloPay",
      logo: images.zalopayLogo,
    },
    {
      text: "ATM / Internet Banking",
      logo: images.atmLogo,
    },
    {
      text: "Thẻ tín dụng (Visa, Mastercard)",
      logo: images.creditcardLogo,
    },
    {
      text: "Thanh toán khi nhận hàng (COD)",
      logo: images.codLogo,
    },
  ];

const handleOrder= async ()=>{
    const orderInfo={
        products:order,
        address:`${userAddresses[addressChoice].addr}, ${userAddresses[addressChoice].ward}, ${userAddresses[addressChoice].district}, ${userAddresses[addressChoice].province}`,
        statusPayment:false,
        totalPrice:getTotalPrice(15000),
        shipMethod:deliveryMethods[deliveryMethod],
        paymentType:paymentMethods[paymentMethod].text,
        shipPrice:"15000"
    }
    const createOrder = await axios.post(`${api}order/createOrder`,orderInfo)
    console.log(createOrder.data)
}

  return (
    <>
      <div className="Checkout-container">
        <div className="address-layout">
          <h1>ĐỊA CHỈ GIAO HÀNG</h1>
          <div className="name-phonenumber">
            <div className="name">
              <label htmlFor="fullName">Họ và tên người nhận</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="phone">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="address-button">
            <div className="address">
              <label htmlFor="address">Địa chỉ nhận hàng</label>
              <select
                name="address"
                id="address"
                onChange={(e) => {
                  setAddressChoice(e.target.value);
                  setDeliveryMethod(0);
                }}
                value={0}
              >
                {userAddresses.map((address) => (
                  <option key={address.id} value={parseInt(address.id)}>
                    {`${address.addr}, ${address.ward}, ${address.district}, ${address.province}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-add">
              <AddButton />
            </div>
          </div>
        </div>

        <div className="delivery-layout">
          <h1>PHƯƠNG THỨC VẬN CHUYỂN</h1>
          <div className="delivery-container">
            {deliveryMethodTexts.map((option, index) => (
              <label key={index} className="container-radio">
                <label htmlFor={`delivery-${index}`}>{option}</label>
                <input
                  disabled={!hasExpress && index === 2}
                  type="radio"
                  value={index}
                  name="delivery"
                  id={`delivery-${index}`}
                  checked={deliveryMethod === index}
                  onChange={(e) => {
                    setDeliveryMethod(parseInt(e.target.value));
                  }}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        </div>

        <div className="payment-layout">
          <h1>PHƯƠNG THỨC THANH TOÁN</h1>
          <div className="payment-container">
            {paymentMethods.map((method, index) => (
              <label key={index} className="container-radio">
                <img src={method.logo} alt="alt" />
                <label htmlFor={`payment-${index}`}>{method.text}</label>
                <input
                  type="radio"
                  value={index}
                  name="payment"
                  id={`payment-${index}`}
                  checked={paymentMethod === index}
                  onChange={(e) => {
                    setPaymentMethod(parseInt(e.target.value));
                  }}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        </div>

        <div className="check-layout">
          <h1>KIỂM TRA LẠI ĐƠN HÀNG</h1>
          <table className="table-check">
            <thead className="head-check">
              <tr>
                <th className="head-id-check" style={{ textAlign: "center" }}>
                  #
                </th>
                <th className="head-image-check" style={{ textAlign: "left" }}>
                  Hàng hóa
                </th>
                <th
                  className="head-price-check"
                  style={{ textAlign: "center" }}
                >
                  Đơn giá
                </th>
                <th
                  className="head-count-check"
                  style={{ textAlign: "center" }}
                >
                  Số lượng
                </th>
                <th
                  className="head-total-check"
                  style={{ textAlign: "center" }}
                >
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody className="body-check">
              {order.map((item, index) => (
                <tr key={item._id}>
                  <td className="id-check">{index + 1}</td>
                  <td className="image-check">
                    <img
                      className="image-detail-check"
                      src={item.product.picture[0]}
                      alt="Bookimage"
                    />
                    <div className="text-image-check">{item.product.name}</div>
                  </td>
                  <td className="price-check">
                    <div className="price-final">
                      {getPriceExpr(item.price)}
                    </div>
                    <div className="price-initial">
                      {getPriceExpr(item.price, 20)}
                    </div>
                  </td>
                  <td className="count-check">
                    <div>{item.quantity}</div>
                  </td>
                  <td className="total-check">
                    <div>
                      {getPriceExpr(item.price * item.quantity, 20)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <div className="total-text">Thành tiền:</div>
            <div className="total-price">{getTotalPrice()}</div>
          </div>
        </div>

        <div className="confirm-layout">
          <h1>XÁC NHẬN THANH TOÁN</h1>
          <div className="container-confirm">
            <div className="info-confirm">
              <div className="name-confirm">
                <p>Họ và tên người nhận:</p>
                <p className="text-confirm">{name}</p>
              </div>
              <div className="phonenumber-confirm">
                <p>Số điện thoại:</p>
                <p className="text-confirm">{phone}</p>
              </div>
              <div className="address-confirm">
                <p>Địa chỉ nhận hàng:</p>
                <p className="text-confirm">{`${userAddresses[addressChoice].addr}, ${userAddresses[addressChoice].ward}, ${userAddresses[addressChoice].district}, ${userAddresses[addressChoice].province}`}</p>
              </div>
              <div className="delivery-confirm">
                <p>Phương thức vận chuyển:</p>
                <p className="text-confirm">
                  {deliveryMethods[deliveryMethod]}
                </p>
              </div>
              <div className="payment-confirm">
                <p>Phương thức thanh toán:</p>
                <p className="text-confirm">
                  {paymentMethods[paymentMethod].text}
                </p>
              </div>
            </div>
            <div className="price-confirm">
              <div className="total-price-confirm">
                <p>Thành tiền:</p>
                <p className="text-confirm">{getTotalPrice()}</p>
              </div>
              <div className="discount-confirm">
                <p>Giảm giá:</p>
                <p className="text-confirm">{getPriceExpr(0)}</p>
              </div>
              <div className="price-delivery-confirm">
                <p>Vận chuyển:</p>
                <p className="text-confirm">{getPriceExpr(15000)}</p>
              </div>
              <div className="total-confirm">
                <p className="text-confirm">Tổng cộng:</p>
                <p className="text-confirm-final">{getTotalPrice(15000)}</p>
              </div>
            </div>
          </div>
          <div className="button-confirm">
            <button className="button-return">Quay lại giỏ hàng</button>
            <button className="button-order" onClick={handleOrder}>Xác nhận đặt hàng</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
