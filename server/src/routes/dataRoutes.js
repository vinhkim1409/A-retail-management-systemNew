const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const Data = require('../models/dataModel');


router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const newData = new Data(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
