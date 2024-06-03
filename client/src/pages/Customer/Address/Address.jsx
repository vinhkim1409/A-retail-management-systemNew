import React, { useEffect, useState } from "react";
import "./Address.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Address = () => {
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const navigate = useNavigate();
  const { tenantURL } = useParams();
  const [addressdefault, setAddressDefault] = useState();

  const [address, setAddress] = useState([]);
  useEffect(() => {
    if (!customer) {
      navigate(`/${tenantURL}/customer/login`);
    } else {
      setAddress(customer.resCustomer?.address);
      setAddressDefault(customer.resCustomer?.address[0]);
    }
  }, []);
  return (
    <div className="Address-container">
      <div className="header">
        <h1>ADDRESS</h1>
      </div>

      <div className="content">
        <div className="button">
          <Link to={`/${tenantURL}/customer/address-addnew`}>
            <div className="button-add">
              <div className="img-add">
                <FontAwesomeIcon icon={faPlus} className="icon-add" />
              </div>
              <div className="text-add">Add new address</div>
            </div>
          </Link>
        </div>

        <div className="address-default">
          <div className="info-default">
            <p className="text-bold">
              {" "}
              {addressdefault?.firstName} {addressdefault?.lastName} |{" "}
              {addressdefault?.phoneNumber}
            </p>
            <p>
              {" "}
              {`${addressdefault?.detail}, ${
                addressdefault?.ward.split("//")[0]
              }, ${addressdefault?.district.split("//")[0]}, ${
                addressdefault?.province.split("//")[0]
              }`}{" "}
            </p>
            <button className="default">Default</button>
          </div>
          <div className="button-modify-default">
            {/* <button className="button-update">Cập nhật</button> */}
          </div>
        </div>

        {address.map((item) => (
          <div key={item?._id}>
            <div className="address-extra">
              <div className="info-extra">
                <p className="text-bold">
                  {" "}
                  {item?.firstName} {item?.lastName} | {item?.phoneNumber}
                </p>
                <p>
                  {" "}
                  {`${item?.detail}, ${item?.ward.split("//")[0]}, ${item?.district.split("//")[0]}, ${item?.province.split("//")[0]}`}{" "}
                </p>
              </div>
              <div className="button-modify-extra">
                {/* <button className="button-delete">Xóa</button>
                <button className="button-update">Cập nhật</button>
                <button className="button-set-default">
                  Thiết lập mặc định
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
