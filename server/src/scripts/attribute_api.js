const express = require('express');
const axios = require('axios');
const fs = require('fs');

const accessToken = "";
fs.readFile('../token.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading access token file:', err);
        return;
    }
    const accessToken = data.trim();
    console.log('Access Token:', accessToken);
});

const app = express();
const port = 3002;


app.get('/category-info/:categoryId', async (req, res) => {
    try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxNTI5MTE5NSwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.TF3pxnI1epphbD4Se6SVGfzoVFhDLiMLLb_M9Z-7BsM";
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
    const url = `https://open.sendo.vn/api/partner/category/attribute/${categoryId}`; // Sử dụng categoryId trong URL
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});