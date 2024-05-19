import React, { useEffect, useState } from "react";
import "./AddNewAddress.scss";
import { shippingAPI } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../constant/constant";
import { updateCurrentAddressCustomer } from "../../../redux/authCustomerSilde";
const AddNewAddress = () => {
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const navigate=useNavigate()
  const { tenantURL } = useParams();
  const dispatch =useDispatch()

  const [lastNameInput, setLastNameInput] = useState(customer.resCustomer.lastName);
  const [firstNameInput, setFirstNameInput] = useState(customer.resCustomer.firstName);
  const [phoneNumberInput, setPhoneNumberInput] = useState(customer.resCustomer.phoneNumber);
  const [provinceInput, setProvinceInput] = useState("");
  const [districtInput, setDistrictInput] = useState("");
  const [wardInput, setWardInput] = useState("");
  const [addrInput, setAddrInput] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const handleLastNameChange = (event) => {
    setLastNameInput(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstNameInput(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumberInput(event.target.value);
  };
  const handleProvinceChange = (event) => {
    setProvinceInput(event.target.value);
    setDistrictInput("");
    setWardInput("");
    console.log(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setDistrictInput(event.target.value);
    setWardInput("");
    console.log(event.target.value);
  };
  const handleWardChange = (event) => {
    setWardInput(event.target.value);
    console.log(event.target.value);
  };
  const handleAddrChange = (event) => {
    setAddrInput(event.target.value);
  };
  useEffect(()=>{
    if(!customer){
        navigate(`/${tenantURL}/customer/login`)
    }
  },[])
  useEffect(() => {
    const getProvinces = async () => {
      const res = await shippingAPI.getProvinces();
      setProvinces(res.data.data);
    };
    const getDistricts = async () => {
      const res = await shippingAPI.getDistricts(provinceInput.split("//")[1]);
      setDistricts(res.data.data);
    };

    const getWards = async () => {
      const res = await shippingAPI.getWards(districtInput.split("//")[1]);
      setWards(res.data.data);
    };

    if (provinces.length === 0) getProvinces();
    if (provinceInput) getDistricts();
    if (districtInput) getWards();
  }, [provinceInput, districtInput, wardInput]);

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    const newAddress={
      firstName:firstNameInput,
      lastName:lastNameInput,
      phoneNumber:phoneNumberInput,
      province:provinceInput,
      district:districtInput,
      ward:wardInput,
      detail:addrInput,
    }
    const res=await axios.put(`${api}customer/add-address`,newAddress,config)
    if(true)
    {
      console.log("add successful")
      dispatch(updateCurrentAddressCustomer({address:res.data.data.address}))
    }
  }

  return (
    <div className="AddressEdit-container">
      <div className="header">
        <h1>ĐỊA CHỈ</h1>
      </div>

      <div className="content">
        <div className="field">
          <div className="firstname-field">Họ:</div>
          <div className="lastname-field">Tên:</div>
          <div className="phonenumber-field">Số điện thoại:</div>
          <div className="email-field">Địa chỉ:</div>
        </div>

        <div className="infor">
          <div className="firstname">
            <input
              type="text"
              value={firstNameInput}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="lastname">
            <input
              type="text"
              value={lastNameInput}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="phonenumber">
            <input
              type="text"
              value={phoneNumberInput}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className="province">
            <select
              id="province"
              name="province"
              onChange={(e) => {
                setWards([]);
                handleProvinceChange(e);
              }}
              value={provinceInput}
            >
              <option key={""} value="">
                --Chọn Tỉnh/Thành phố--
              </option>
              {provinces.map((item) => (
                <option
                  key={item.ProvinceID}
                  value={item.NameExtension[0] + "//" + item.ProvinceID}
                >
                  {item.NameExtension[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="district">
            <select
              id="district"
              name="district"
              onChange={(e) => handleDistrictChange(e)}
              value={districtInput}
            >
              <option key={""} value="">
                --Chọn Quận/Huyện--
              </option>
              {districts.map(
                (item) =>
                  item.NameExtension && (
                    <option
                      key={item.DistrictID}
                      value={item.NameExtension[0] + "//" + item.DistrictID}
                    >
                      {item.NameExtension[0]}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="ward">
            <select
              id="ward"
              name="ward"
              onChange={(e) => handleWardChange(e)}
              value={wardInput}
            >
              <option key={""} value="">
                --Chọn Xã/Phường--
              </option>
              {wards.map(
                (item) =>
                  item.NameExtension && (
                    <option
                      key={item.WardCode}
                      value={item.NameExtension[0] + "//" + item.WardCode}
                    >
                      {item.NameExtension[0]}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="addr">
            <input type="text" value={addrInput} onChange={handleAddrChange} />
          </div>
        </div>
      </div>

      <div className="button">
        <div className="button-detail">
          <button className="button-cancel">Hủy</button>
          <button className="button-save" onClick={handleAddNewAddress}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
