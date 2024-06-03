const axios = require('axios');

async function getCategoryAttribute(id, accessToken) {
    const url = `https://open.sendo.vn/api/partner/category/attribute/${id}`;
    const headers = {
        'Authorization': 'bearer ' + accessToken
    };

    try {
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            const data = response.data;
            const result = data.result;
            const attributes = result.attribute.map(attribute => ({
                name: attribute.name,
                id: attribute.id
            }));

            const categoryInfo = {
                name: result.name,
                id: result.id,
                parent_id: result.parent_id,
                attributes: attributes
            };

            console.log(attributes)
            return attributes;
        } else {
            console.error('Error:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = {
    getCategoryAttribute
};
