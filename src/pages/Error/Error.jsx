import React from 'react'
import "./Error.scss";
import error from "../../assets/error.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
  return (
    <div className="Error-container">
      <div className="content">
        <div className="image">
          <img className="img-er" src={error} alt="alt" />
        </div>

        <div className="text">
          <h1>
            Rất tiếc, không thể tìm thấy trang này
          </h1>
          <p>
            Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
          </p>
        </div>

        <div className="button">
          <button className="button-back" onClick={() => window.location.href = '/'}>
            <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
            Trở về trang chủ
          </button>
        </div>

      </div>
    </div>
  )
}

export default Error