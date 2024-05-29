const Product = require('../models/productModel');

async function fetchDataFromAPI() {
  let fetch;
  try {
    const module = await import('node-fetch');
    fetch = module.default;
  } catch (error) {
    console.error("Error loading node-fetch:", error);
    return;
  }

  const response = await fetch('https://open.sendo.vn/api/partner/product/search', {
    method: 'POST',
    headers: {
      'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMzAyNDA2OSwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.Xjd9AMuGIPENaBs_QuP0REqOwzzZrXmTZyp4co7PzRc',
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    body: JSON.stringify({
      "page_size": 10,
      "product_name": "",
      "date_from": "2024-03-20",
      "date_to": "2024-03-27",
      "status": null,
      "token": ""
    })
  });

  const data = await response.json();

  for (const item of data.result.data) {
    const newProduct = new Product({
      name: item.name,
      industry: "text",
      picture: [item.image],
      description: item.name,
      detailInfo: [],
      saleInfo: [
        {
          sellPrice: item.promotion_price,
          buyPrice: 0,
          quantity: item.stock_quantity
        }
      ],
      isDeleted: false
    });

    // Lưu sản phẩm mới
    await newProduct.save();
  }
}

module.exports = fetchDataFromAPI;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMjA5ODkzNiwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.K9z9UVYFsZqy28jZMiCfOTVkrlFPUw52Z08JPiAPiA4

// curl -X POST \
// https://open.sendo.vn/api/partner/product/search \
// -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMzAyNDA2OSwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.Xjd9AMuGIPENaBs_QuP0REqOwzzZrXmTZyp4co7PzRc' \
// -H 'Content-Type: application/json' \
// -H 'cache-control: no-cache' \
// -d '{
// "page_size": 10,
// "product_name": "",
// "date_from": "2024-03-20",
// "date_to": "2024-04-13",
// "status":null,
// "token": ""
// }'

// curl -X GET \
//   'https://open.sendo.vn/api/partner/product?id=116553424 \
//   -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMzAyNDA2OSwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.Xjd9AMuGIPENaBs_QuP0REqOwzzZrXmTZyp4co7PzRc' \


// curl -X GET \
//   https://open.sendo.vn/api/partner/category/2973\
//   -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMjA5ODkzNiwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.K9z9UVYFsZqy28jZMiCfOTVkrlFPUw52Z08JPiAPiA4' \

//2978

// curl -X GET \
//   https://open.sendo.vn/api/partner/category/attribute/2978 \
//   -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMzQ3ODYyOCwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.eFIOIhA0sZCPg3OuXPe3ix6AD2Z2L7m20Hg-QxhL7aE' \ 


// const data = {
//   "id": 0,
//   "name": name,
//   "sku": "Derma_Forte",
//   "price": 150000,
//   "weight": 200,
//   "stock_availability": true,
//   "description": description,
//   "cat_4_id": 2980,
//   "product_image": "string",
//   "height": 12,
//   "length": 5,
//   "width": 5,
//   "unit_id": 1,
//   "stock_quantity": 100,
//   "avatar": {
//     "picture_url": "https://thuocgiaphuc.vn/Uploads/ImgSP/Full6-DermaForte.jpg"
//   },
//   "pictures": [
//     {
//       "picture_url": "https://thuocgiaphuc.vn/Uploads/ImgSP/Full6-DermaForte.jpg"
//     }
//   ],
//   "attributes": [
//     {
//       "attribute_id": 333,
//       "attribute_name": "Xuất xứ",
//       "attribute_is_custom": false,
//       "attribute_is_checkout": true,
//       "attribute_values": [
//         {
//           "id": 1418,
//           "value": "Mỹ",
//           "attribute_img": "string",
//           "is_selected": true,
//           "is_custom": false
//         }
//       ]
//     }
//   ],
//   "promotion_from_date": "2024-04-03T02:51:38.858Z",
//   "promotion_to_date": "2025-06-18T02:51:38.858Z",
//   "is_promotion": true,
//   "extended_shipping_package": {
//     "is_using_instant": false,
//     "is_using_in_day": false,
//     "is_self_shipping": false,
//     "is_using_standard": true
//   },
//   "is_config_variant": false,
//   "special_price": 115000,
//   "voucher": {
//     "product_type": 1,
//     "start_date": "2024-04-02T02:51:38.858Z",
//     "end_date": "2025-06-18T02:51:38.858Z",
//     "is_check_date": true
//   }
// };



// curl - X POST \
// https://open.sendo.vn/api/partner/product \
// -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxNzAzMjQxMCwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.uW_vJtg_Yj59gZtLQOftd6wk_Zq1Bc26g_jmOMguYS0' \
// -H 'Content-Type: application/json' \
// -d '{
// "id": 0,
//   "name": "Áo thun cổ trơn Nam thoáng mát 3",
//     "sku": "at3",
//       "price": 300000,
//         "weight": 200,
//           "stock_availability": true,
//             "description": "<p style=\"color: rgba(0, 0, 0, 0.8); font-size: 14px;\">THÔNG TIN SẢN PHẨM ÁO POLO NAM CỔ BẺ VẢI MẮT CHIM APM5431</p>\n<p style=\"color: rgba(0, 0, 0, 0.8); font-size: 14px;\">- Chất liệu: Pique mắt chim với thành phần 60% Cotton USA + 35% Polyester + 5% Spandex</p>\n<p style=\"color: rgba(0, 0, 0, 0.8); font-size: 14px;\">- Size áo: M, L, XL, 2XL, 3XL, 4XL</p>\n<p style=\"color: rgba(0, 0, 0, 0.8); font-size: 14px;\">- Xuất xứ: Việt Nam</p>",
//               "cat_4_id": 310,
//                 "product_image": "https://media3.scdn.vn/img4/2024/03_31/YkigWrZQBtRLP0I3FnW2.jpg",
//                   "height": 12,
//                     "length": 5,
//                       "width": 5,
//                         "unit_id": 1,
//                           "stock_quantity": 50,
//                             "avatar": {
//   "picture_url": "https://media3.scdn.vn/img4/2024/03_31/YkigWrZQBtRLP0I3FnW2.jpg"
// },
// "pictures": [
//   {
//     "picture_url": "https://media3.scdn.vn/img4/2024/03_31/YkigWrZQBtRLP0I3FnW2.jpg"
//   }
// ],
//   "attributes": [
//     {
//       "attribute_id": 1328,
//       "attribute_is_custom": false,
//       "attribute_is_checkout": true,
//       "attribute_values": [
//         {
//           "id": 20714,
//           "value": "Da khô",
//           "attribute_img": "string",
//           "is_selected": false,
//           "is_custom": false
//         }
//       ]
//     }
//   ],
//     "promotion_from_date": "2024-05-30T02:51:38.858Z",
//       "promotion_to_date": "2025-06-18T02:51:38.858Z",
//         "is_promotion": true,
//           "extended_shipping_package": {
//   "is_using_instant": false,
//     "is_using_in_day": false,
//       "is_self_shipping": false,
//         "is_using_standard": true
// },
// "is_config_variant": true,
//   "variants": [
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 298,
//           "attribute_code": "kich_thuoc_1",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 18975
//         },
//         {
//           "attribute_id": 284,
//           "attribute_code": "mau_sac",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 605
//         }
//       ],
//       "variant_sku": "2XL",
//       "variant_price": 300000,
//       "variant_promotion_start_date": "2024-05-30T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 199000,
//       "variant_quantity": 10
//     },
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 298,
//           "attribute_code": "kich_thuoc_1",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 817
//         },
//         {
//           "attribute_id": 284,
//           "attribute_code": "mau_sac",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 605
//         }
//       ],
//       "variant_sku": "L",
//       "variant_price": 300000,
//       "variant_promotion_start_date": "2024-05-30T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 198000,
//       "variant_quantity": 10
//     },
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 298,
//           "attribute_code": "kich_thuoc_1",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 816
//         },
//         {
//           "attribute_id": 284,
//           "attribute_code": "mau_sac",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 605
//         }
//       ],
//       "variant_sku": "M",
//       "variant_price": 300000,
//       "variant_promotion_start_date": "2024-05-30T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 197000,
//       "variant_quantity": 7
//     },
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 298,
//           "attribute_code": "kich_thuoc_1",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 818
//         },
//         {
//           "attribute_id": 284,
//           "attribute_code": "mau_sac",
//           "attribute_img": "string",
//           "is_custom": false,
//           "is_selected": true,
//           "option_id": 605
//         }
//       ],
//       "variant_sku": "XL",
//       "variant_price": 300000,
//       "variant_promotion_start_date": "2024-05-30T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 200000,
//       "variant_quantity": 5
//     },
//   ],
//     "special_price": 197000,
//       "voucher": {
//         "product_type": 1,
//         "is_check_date": false
// }
// }'



