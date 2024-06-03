const express = require('express');
const router = express.Router();
const attributeModel = require('../models/attributeModel');

// Route for getting category attributes
router.get('/', async (req, res) => {
    const id = req.params.id;
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdG9yZUlkIjoiOTg2MDcwIiwiVXNlck5hbWUiOiIiLCJTdG9yZVN0YXR1cyI6IjIiLCJTaG9wVHlwZSI6IjEiLCJTdG9yZUxldmVsIjoiMCIsImV4cCI6MTcxMzk0OTc5OSwiaXNzIjoiOTg2MDcwIiwiYXVkIjoiOTg2MDcwIn0.8w7_Nf_qmPqSOpmDXBglty4FWcN5Re7BJbSLH7t3ZEE'; // Replace with actual access token

    try {
        const categoryInfo = await attributeModel.getCategoryAttribute(id, accessToken);
        if (categoryInfo) {
            res.json(categoryInfo);
        } else {
            res.status(404).json({ error: 'Failed to retrieve category attributes.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;



