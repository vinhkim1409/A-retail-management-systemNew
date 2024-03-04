import { Paper } from "@mui/material";
import React from "react";
import "./DetailProduct.scss";

const product = {
  name: "Áo sơ mi nam",
  pic: [
    "https://product.hstatic.net/1000360022/product/id-000769a_6c95f530807145f0831dda83e1a1f75e_medium.jpg",
    "https://product.hstatic.net/1000360022/product/id-000771a_9763608f1b9c4f08b00f5ce6fd2dd742_medium.jpg",
    "https://product.hstatic.net/1000360022/product/id-000766a_d8b23d8393374e23adbf734c73920e58_medium.jpg",
    "https://product.hstatic.net/1000360022/product/dsc01164_e70dcabec21d4def8d64f6e1675eca25_medium.jpg",
    "https://product.hstatic.net/1000360022/product/dsc01158_84aee98bd52c409e9394c9ac12f6b831_medium.jpg",
  ],
  industry: "Shirt",
  detail: {
    "Brand":"ABBC",
    "Dáng kiểu áo": "Rộng",
    "Cổ áo": "Cổ sơ mi",
    "Kiểu cổ áo": "Cổ áo truyền thống",
    "Phong cách": "Cơ bản, Hàn Quốc, Đường phố, Công sở, Nhiệt đới",
    "Xuất xứ": "Việt Nam",
    "Chất liệu": "Cotton, Khác",
    "Chiều dài tay áo": "Tay ngắn",
    "Mẫu": "Họa tiết, Khác, Trơn, In",
  },
  decs: [
    "Chất liệu nhẹ, mềm mại, thoáng mát và thấm hút mồ hôi tốt nhưng vẫn đứng form tạo cảm giác thoải mái cho người mặc.",
    "Áo sơ mi cổ đứng có sẵn trong 4 màu sắc tinh tế để bạn lựa chọn, phù hợp với nhiều dịp khác nhau, được thiết kế Slim-Fit giúp tôn lên vóc dáng và mang đến vẻ lịch lãm. ",
    "Chất vải mịn màng và bền bỉ, đảm bảo sự thoải mái và sang trọng.Áo sơ mi đem đến vẻ đẹp lịch sự, nền nã và tinh tế cho người mặc, nhưng vẫn có nét trẻ trung, đem đến sự thoải mái, thoáng mát khi sử dụng.",
  ],
};
function DetailProduct() {
  return (
    <div className="DetailProduct-container">
      <div className="title"> Product details</div>

      <Paper className="content">
        <div className="name">{product.name}</div>
        <div className="pic">
          <img src={product.pic[0]} alt="" className="img" />
          <img src={product.pic[1]} alt="" className="img" />
          <img src={product.pic[2]} alt="" className="img" />
          <img src={product.pic[3]} alt="" className="img" />
          <img src={product.pic[4]} alt="" className="img" />
        </div>
        <div className="detail-box">
          <div className="title-small">Detail Information</div>
          <div className="decs">
            <div className="industry">Industry : {product.industry}</div>
            <div className="detail-info">
              {Object.entries(product.detail).map(([key, value]) => (
                <div className="detail" key={key}>
                  <div className="key">{key}</div>
                  <div className="value"> {value} </div>
                </div>
              ))}
            </div>
            <div className="detail-decs">
              <div className="title-decs">Specification</div>
              {product.decs.map((value, index) => (
                <div className="content-decs" key={index}>
                  {value}
                </div>
              ))}
            </div>
            <div className="class">
              {/* Bao gom thong tin ban hang tuy theo phan loai hang */}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default DetailProduct;
