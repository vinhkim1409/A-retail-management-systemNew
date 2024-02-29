import images from "../../images";

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import "./FooterCustomer.scss";

const Footer = () => {

    const footerSections = [
        {
            text: "Liên hệ",
            logos: images.contactLogos
        },
        {
            text: "Đơn vị vận chuyển",
            logos: images.deliveryLogos
        },
        {
            text: "Thanh toán",
            logos: images.paymentLogos
        }
    ]

    return (
        <div className="FooterCustomer-container row flex-row-reverse">
            <div className="col-md-6 order-md-0">
                <div className="p-0">
                    {footerSections.map((section, index) => (
                        <div key={section.text + index}>
                            <div className="fw-bold">{section.text.toUpperCase()}</div>

                            <div className="d-flex flex-wrap my-3">
                                {section.logos.map((logo, index) => (
                                    <div className="mx-2" key={index}>
                                        <img src={logo} className="footer-section-logo" alt="alt" key={index} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-md-6 order-md-1">
                <div className="p-0">
                    <div className="text-container">
                        <p><strong>Thông tin liên hệ cửa hàng</strong></p>
                        <p>0123456789 - bkbook@gmail.com</p>
                        <p><FontAwesomeIcon icon={faHouse} /> Phòng 608, Lầu 6, Tòa nhà H6, Đại học Bách Khoa TPHCM, Khu phố Tân Lập, Phường Đông Hòa, Thành phố Dĩ An, Tỉnh Bình Dương</p>
                        <p><FontAwesomeIcon icon={faHouse} /> 268 Lý Thường Kiệt, phường 10, quận 10, Thành phố Hồ Chí Minh</p>

                    </div>
                    <img src={images.footerLeftLogo} className="other-logo" alt="alt" />
                </div>
            </div>
        </div>
    )
}

export default Footer