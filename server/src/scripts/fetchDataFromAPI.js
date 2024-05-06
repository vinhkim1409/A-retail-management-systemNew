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



// curl -X POST \
//   https://open.sendo.vn/api/partner/product \
//   -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxNDgyMDQ2MywiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.Xnv4K_l8k9oxVx8TD0U9lEe6eG1DEdtUHnPyps7U4n4' \ 
//   -H 'Content-Type: application/json' \
//   -d '{
//   "id": 0,
//   "name": "Gel Derma Forte dưỡng da, giảm mụn, thâm 15gr",
//   "sku": "DermaForte2",
//   "price": 149000,
//   "weight": 200,
//   "stock_availability": true,
//   "description": "Đặc biệt, Gel Derma Forte còn có tác dụng giúp làm thâm và phục hồi da sau khi nặn mụn. Sản phẩm có dạng gel nhẹ nhàng và được đóng gói trong dung tích 15gr tiện lợi để mang theo bên bạn khi đi du lịch hoặc đi làm.",
//   "cat_4_id": 2980,
//   "product_image": "string",
//   "height": 12,
//   "length": 5,
//   "width": 5,
//   "unit_id": 1,
//   "stock_quantity": 50,
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
//   "promotion_from_date": "2024-05-05T02:51:38.858Z",
//   "promotion_to_date": "2025-06-18T02:51:38.858Z",
//   "is_promotion": true,
//   "extended_shipping_package": {
//     "is_using_instant": false,
//     "is_using_in_day": false,
//     "is_self_shipping": false,
//     "is_using_standard": true
//   },
//   "is_config_variant": true,
//   "variants": [
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 328,
//           "option_id": 1359
//         }
//       ],
//       "variant_sku": "Whoo",
//       "variant_price": 50000,
//       "variant_promotion_start_date": "2024-05-05T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 49000,
//       "variant_quantity": 10
//     },
//     {
//       "variant_attributes": [
//         {
//           "attribute_id": 328,
//           "option_id": 23557
//         }
//       ],
//       "variant_sku": "Mac",
//       "variant_price": 60000,
//       "variant_promotion_start_date": "2024-05-05T02:51:38.858Z",
//       "variant_promotion_end_date": "2026-05-04T02:51:38.858Z",
//       "variant_special_price": 55000,
//       "variant_quantity": 10
//     }
//   ],
//   "special_price": 49000,
//   "voucher": {
//     "product_type": 1,
//     "start_date": "2024-05-04T02:51:38.858Z",
//     "end_date": "2025-06-18T02:51:38.858Z",
//     "is_check_date": true
//   }
// }'



