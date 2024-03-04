const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGODB_URI = "mongodb+srv://admin:admin123@database.vaoigd5.mongodb.net/";

// // Connect
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Database' });

// Middleware
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
