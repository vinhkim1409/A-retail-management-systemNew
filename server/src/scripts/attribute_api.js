// const express = require('express');
// const axios = require('axios');
// const fs = require('fs');

// let accessToken = ""; // Sử dụng biến toàn cục để lưu token

// // Đọc token khi khởi động ứng dụng
// fs.readFile('../token.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading access token file:', err);
//         process.exit(1); // Thoát ứng dụng nếu không đọc được token
//     }
//     accessToken = data.trim();
//     console.log('Access Token loaded:', accessToken);
// });

// const app = express();
// const port = 3002;

// app.get('/category-info/:categoryId', async (req, res) => {
//     try {
//         const categoryId = req.params.categoryId;
//         const categoryInfo = await getCategoryInfo(accessToken, categoryId);

//         if (categoryInfo) {
//             res.json(categoryInfo);
//         } else {
//             res.status(500).json({ error: 'Failed to retrieve category attributes.' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// async function getCategoryInfo(accessToken, categoryId) {
//     const url = `https://open.sendo.vn/api/partner/category/attribute/${categoryId}`;
//     const headers = {
//         'Authorization': 'bearer ' + accessToken
//     };

//     try {
//         const response = await axios.get(url, { headers });
//         if (response.status === 200) {
//             const data = response.data;
//             const result = data.result;
//             const attributes = result.attribute.map(attribute => {
//                 const attribute_values = attribute.attribute_values.map(value => ({
//                     id: value.id,
//                     value: value.value
//                 }));
//                 return {
//                     name: attribute.name,
//                     control_type: attribute.control_type,
//                     id: attribute.id,
//                     is_checkout: attribute.is_checkout,
//                     attribute_values: attribute_values
//                 };
//             });

//             const categoryInfo = {
//                 name: result.name,
//                 id: result.id,
//                 parent_id: result.parent_id,
//                 attributes: attributes
//             };

//             return categoryInfo;
//         } else {
//             console.error('Error:', response.status);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//         return null;
//     }
// }

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Thêm dòng này để import module path
const router = express.Router();

let accessToken = ""; // Sử dụng biến toàn cục để lưu token

// Đọc token khi khởi động ứng dụng
const tokenPath = path.join(__dirname, '../token.txt'); // Sử dụng module path để xác định đường dẫn
fs.readFile(tokenPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading access token file:', err);
        process.exit(1); // Thoát ứng dụng nếu không đọc được token
    }
    accessToken = data.trim();
    console.log('Access Token loaded:', accessToken);
});

router.get('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const categoryInfo = await getCategoryInfo(accessToken, categoryId);

        if (categoryInfo) {
            res.json(categoryInfo);
        } else {
            res.status(500).json({ error: 'Failed to retrieve category attributes.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getCategoryInfo(accessToken, categoryId) {
    const url = `https://open.sendo.vn/api/partner/category/attribute/${categoryId}`;
    const headers = {
        'Authorization': 'bearer ' + accessToken
    };

    try {
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            const data = response.data;
            const result = data.result;
            const attributes = result.attribute.map(attribute => {
                const attribute_values = attribute.attribute_values.map(value => ({
                    id: value.id,
                    value: value.value
                }));
                return {
                    name: attribute.name,
                    control_type: attribute.control_type,
                    id: attribute.id,
                    is_checkout: attribute.is_checkout,
                    attribute_values: attribute_values
                };
            });

            const categoryInfo = {
                name: result.name,
                id: result.id,
                parent_id: result.parent_id,
                attributes: attributes
            };

            return categoryInfo;
        } else {
            console.error('Error:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = router; // Xuất router

