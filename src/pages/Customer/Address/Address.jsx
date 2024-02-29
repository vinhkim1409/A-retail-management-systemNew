import React from 'react'
import "./Address.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Address = () => {
    const addressdefault = [{
        fullname: "Nguyễn Minh Hưng",
        phonenumber: "(+84)123456789",
        province: "TP Hồ Chí Minh",
        district: "Thành Phố Thủ Đức",
        ward: "Phường Linh Trung",
        addr: "KTX khu A",
    }
    ];

    const address = [{
        id: "1",
        fullname: "Lê Duy Khang",
        phonenumber: "(+84)123456780",
        province: "TP Hồ Chí Minh",
        district: "Thành Phố Thủ Đức",
        ward: "Phường Linh Trung",
        addr: "Đại học Bách Khoa TPHCM",
    },
    {
        id: "2",
        fullname: "Nguyễn Minh Hưng",
        phonenumber: "(+84)000000002",
        province: "TP Hồ Chí Minh",
        district: "Thành Phố Thủ Đức",
        ward: "Phường Linh Trung",
        addr: "Đại học Bách Khoa TPHCM",
    },
    {
        id: "3",
        fullname: "Nguyễn Minh Hưng",
        phonenumber: "(+84)000000001",
        province: "TP Hồ Chí Minh",
        district: "Quận 7",
        ward: "Phường Tân Phong",
        addr: "634, Lê Văn Lương",
    },
    ];
    return (
        <div className="Address-container">
            <div className="header">
                <h1>ĐỊA CHỈ</h1>
            </div>

            <div className="content">
                <div className="button">
                    <Link>
                        <div className="button-add">
                            <div className="img-add">
                                <FontAwesomeIcon icon={faPlus} className="icon-add" />
                            </div>
                            <div className="text-add">Thêm địa chỉ mới</div>
                        </div>
                    </Link>
                </div>

                <div className="address-default">
                    <div className="info-default">
                        <p className="text-bold"> {addressdefault[0].fullname} | {addressdefault[0].phonenumber}</p>
                        <p> {`${addressdefault[0].addr}, ${addressdefault[0].ward}, ${addressdefault[0].district}, ${addressdefault[0].province}`} </p>
                        <button className="default">
                            Mặc định
                        </button>
                    </div>
                    <div className="button-modify-default">
                        <button className="button-update">
                            Cập nhật
                        </button>
                    </div>
                </div>

                {address.map((item) => (
                    <div key={item.id}>
                        <div className="address-extra">
                            <div className="info-extra">
                                <p className="text-bold"> {item.fullname} | {item.phonenumber}</p>
                                <p> {`${item.addr}, ${item.ward}, ${item.district}, ${item.province}`} </p>
                            </div>
                            <div className="button-modify-extra">
                                <button className="button-delete">
                                    Xóa
                                </button>
                                <button className="button-update">
                                    Cập nhật
                                </button>
                                <button className="button-set-default">
                                    Thiết lập mặc định
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Address