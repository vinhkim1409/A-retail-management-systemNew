import React, { useEffect, useState } from "react";
import images from "../../../images/index";
import AddButton from "../../../components/AddButton/AddButton";
import "./Checkout.scss";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useSelector } from "react-redux";
import { shippingAPI } from "../../../redux/apiRequest";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const { tenantURL } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  useEffect(() => {
    if (!customer) {
      navigate(`/${tenantURL}/customer/login`);
    }
    if (!location.state) {
      navigate(`/${tenantURL}/customer/cart`);
    } else {
      console.log(location.state);
      setOrder(location.state);
      const getShippingFee = async () => {
        const shippingFee = await shippingAPI.countShippingFee(
          location.state,
          customer.resCustomer?.address[addressChoice]
        );
        setShippingFee(shippingFee.data.data.total);
      };
      getShippingFee();
    }
  }, []);
  const expressDeliveryProvinces = ["TPHCM", "Hà Nội", "Đà Nẵng"];

  const [order, setOrder] = useState([]);

  const getTotalPrice = (deliveryFee = 0) =>
    getPriceExpr(
      order.reduce((prev, curr) => {
        return (
          prev +
          (curr.variant > 0
            ? curr.product.variants[curr.variant - 1].variant_special_price
            : curr.product.special_price?curr.product.special_price:curr.product.price) *
            curr.quantity
          // (1 - 20 / 100) * tai sao lai co
        );
      }, deliveryFee)
    );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressChoice, setAddressChoice] = useState(0); // order: radio and select, top -> down => 0 and up; 0 means the first choice
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [hasExpress, setHasExpress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    if (location.state) {
      setName(
        `${customer.resCustomer?.address[addressChoice]?.firstName}${customer.resCustomer?.address[addressChoice]?.lastName}`
      );
      setPhone(customer.resCustomer?.address[addressChoice]?.phoneNumber);
      setHasExpress(
        expressDeliveryProvinces.includes(
          customer.resCustomer?.address[addressChoice]?.province
        )
      );

      const getShippingFee = async () => {
        const shippingFee = await shippingAPI.countShippingFee(
          location.state,
          customer.resCustomer?.address[addressChoice]
        );
        console.log(shippingFee);
        setShippingFee(shippingFee.data.data.total);
      };

      getShippingFee();
    }
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
    // {
    //   text: "Ví ZaloPay",
    //   logo: images.zalopayLogo,
    // },
    // {
    //   text: "ATM / Internet Banking",
    //   logo: images.atmLogo,
    // },
    // {
    //   text: "Thẻ tín dụng (Visa, Mastercard)",
    //   logo: images.creditcardLogo,
    // },
    {
      text: "Thanh toán khi nhận hàng (COD)",
      logo: images.codLogo,
    },
  ];
  const [shippingFee, setShippingFee] = useState(0);

  function extractProductDetails(orders) {
    return orders.map(order => ({
      id: order.product.id,
      quantity: order.quantity
    }));
  }

  async function updateProductQuantitySendo(orders) {
    const productDetails = extractProductDetails(orders);

    for (const detail of productDetails) {
      try {
        console.log("detail", detail);
        const response = await axios.put(`${api}product/quantitySendo`, detail, config);
        console.log(`Updated product ${detail.id} with response:`, response.data);
      } catch (error) {
        console.error(`Failed to update product ${detail.id}:`, error);
      }
    }
  }

  const handleOrder = async () => {
    const orderInfo = {
      products: order,
      statusPayment: "Wait Pay",
      totalPrice: Number(getTotalPrice(shippingFee)) * 1000,
      shipMethod: deliveryMethods[deliveryMethod],
      paymentType: paymentMethods[paymentMethod].text,
      shipPrice: shippingFee,
      tenantURL: tenantURL,
      buyer_firstName: customer.resCustomer?.address[addressChoice]?.firstName,
      buyer_lastName: customer.resCustomer?.address[addressChoice]?.lastName,
      buyer_phoneNumber:
        customer.resCustomer?.address[addressChoice]?.phoneNumber,
      buyer_province: customer.resCustomer?.address[addressChoice]?.province,
      buyer_district: customer.resCustomer?.address[addressChoice]?.district,
      buyer_ward: customer.resCustomer?.address[addressChoice]?.ward,
      buyer_address_detail:
        customer.resCustomer?.address[addressChoice]?.detail,
    };
    if (paymentMethods[paymentMethod].text == "Ví Momo") {
      const paymentMomo = await axios.post(
        `${api}payment/payMomo`,
        orderInfo,
        config
      );
      if (paymentMomo) {
        window.open(paymentMomo.data?.momoInfo?.payUrl, "_self");
      }
      console.log(paymentMomo.data);
      updateProductQuantitySendo(order);
    } else {
      const createOrder = await axios.post(
        `${api}order/createOrder`,
        orderInfo,
        config
      );
      if (createOrder.data.success) {
        updateProductQuantitySendo(order);
        navigate(`/${tenantURL}/customer/order`);
      }

      console.log(createOrder.data);
    }
  };

  return (
    <>
      <div className="Checkout-container">
        <div className="title">Check Out</div>
        <div className="address-layout">
          <h1>Delivery Address</h1>
          <div className="name-phonenumber">
            <div className="name">
              <label htmlFor="fullName" className="label">
                Recipient's full name:
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={name}
                // onChange={(e) => setName(e.target.value)}
                className="input-info"
              />
            </div>

            <div className="phone">
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                className="input-info"
              // onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="address-button">
            <div className="address">
              <label htmlFor="address" className="label">
                Delivery address
              </label>
              <select
                name="address"
                id="address"
                onChange={(e) => {
                  setAddressChoice(e.target.value);
                  setDeliveryMethod(0);
                }}
                value={addressChoice}
                className="input-select"
              >
                {customer.resCustomer.address.map((address, index) => (
                  <option key={index} value={parseInt(index)}>
                    {`${address.detail}, ${address.ward.split("//")[0]}, ${
                      address.district.split("//")[0]
                    }, ${address.province.split("//")[0]}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-add">
              <AddButton />
            </div>
          </div>
        </div>
        <div className="payment-delivery-layout">
          <div className="delivery-layout">
            <h1>METHOD OF SHIPPING</h1>
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
            <h1>PAYMENT METHODS</h1>
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
                      src={item.product?.avatar?.picture_url}
                      alt="Bookimage"
                    />
                    <div className="text-image-check">{item.product.name}</div>
                  </td>
                  <td className="price-check">
                    <div className="price-final">
                      {getPriceExpr(
                        item.variant > 0
                          ? item.product.variants[item.variant - 1]
                              .variant_special_price
                          : item.product.price
                      )}
                    </div>
                    <div className="price-initial">
                      {getPriceExpr(
                        item.variant > 0
                          ? item.product.variants[item.variant - 1]
                              .variant_price
                          : item.product.price
                      )}
                    </div>
                  </td>
                  <td className="count-check">
                    <div>{item.quantity}</div>
                  </td>
                  <td className="total-check">
                    <div>
                      {getPriceExpr(
                        (item.variant > 0
                          ? item.product.variants[item.variant - 1]
                              .variant_special_price
                          : item.product.price) * item.quantity
                      )}
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
                <p className="text-confirm">{`${
                  customer.resCustomer?.address[addressChoice]?.detail
                }, ${
                  customer.resCustomer?.address[addressChoice]?.ward.split(
                    "//"
                  )[0]
                }, ${
                  customer.resCustomer?.address[addressChoice]?.district.split(
                    "//"
                  )[0]
                }, ${
                  customer.resCustomer?.address[addressChoice]?.province.split(
                    "//"
                  )[0]
                }`}</p>
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
                <p className="text-confirm">{getPriceExpr(shippingFee)}</p>
              </div>
              <div className="total-confirm">
                <p className="text-confirm">Tổng cộng:</p>
                <p className="text-confirm-final">
                  {getTotalPrice(shippingFee)}
                </p>
              </div>
            </div>
          </div>
          <div className="button-confirm">
            <button className="button-return">Quay lại giỏ hàng</button>
            <button className="button-order" onClick={handleOrder}>
              Xác nhận đặt hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
