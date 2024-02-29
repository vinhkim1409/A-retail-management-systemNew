import React, { useState } from 'react'
import "./AddressEdit.scss";

const AddressEdit = () => {
    const addressinfo = [
        {
            lastname: "Nguyễn Minh",
            firstname: "Hưng",
            phonenumber: "0123456789",
            province: "TPHCM",
            district: "Thành phố Thủ Đức",
            ward: "Phường Linh Trung",
            addr: "KTX khu A Đại học quốc gia TPHCM",
        },
    ];
    const [lastNameInput, setLastNameInput] = useState(addressinfo[0].lastname);
    const [firstNameInput, setFirstNameInput] = useState(addressinfo[0].firstname);
    const [phoneNumberInput, setPhoneNumberInput] = useState(addressinfo[0].phonenumber);
    const [provinceInput, setProvinceInput] = useState(addressinfo[0].province);
    const [districtInput, setDistrictInput] = useState(addressinfo[0].district);
    const [wardInput, setWardInput] = useState(addressinfo[0].ward);
    const [addrInput, setAddrInput] = useState(addressinfo[0].addr);

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
    };
    const handleDistrictChange = (event) => {
        setDistrictInput(event.target.value);
    };
    const handleWardChange = (event) => {
        setWardInput(event.target.value);
    };
    const handleAddrChange = (event) => {
        setAddrInput(event.target.value);
    };

    return (
        <div className="AddressEdit-container">
            <div className="header">
                <h1>ĐỊA CHỈ</h1>
            </div>

            <div className="content">
                <div className="field">
                    <div className="lastname-field">
                        Họ:
                    </div>
                    <div className="firstname-field">
                        Tên:
                    </div>
                    <div className="phonenumber-field">
                        Số điện thoại:
                    </div>
                    <div className="email-field">
                        Địa chỉ:
                    </div>
                </div>

                <div className="infor">
                    <div className="lastname">
                        <input type="text" value={lastNameInput} onChange={handleLastNameChange} />
                    </div>
                    <div className="firstname">
                        <input type="text" value={firstNameInput} onChange={handleFirstNameChange} />
                    </div>
                    <div className="phonenumber">
                        <input type="text" value={phoneNumberInput} onChange={handlePhoneNumberChange} />
                    </div>
                    <div className="province">
                        <input type="text" value={provinceInput} onChange={handleProvinceChange} />
                    </div>
                    <div className="district">
                        <input type="text" value={districtInput} onChange={handleDistrictChange} />
                    </div>
                    <div className="ward">
                        <input type="text" value={wardInput} onChange={handleWardChange} />
                    </div>
                    <div className="addr">
                        <input type="text" value={addrInput} onChange={handleAddrChange} />
                    </div>
                </div>
            </div>

            <div className="button">
                <div className="button-detail">
                    <button className="button-cancel" >
                        Hủy
                    </button>
                    <button className="button-save">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressEdit;