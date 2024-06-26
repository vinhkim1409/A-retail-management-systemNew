const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const PORT = 3001;
app.use(cors());
const MONGODB_URI = "mongodb+srv://admin:admin123@database.vaoigd5.mongodb.net/";

// // Connect
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Database' });

// Middleware
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const staffRoutes=require('./routes/staffRoutes')
const websiteRoutes = require('./routes/wesiteRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
app.use('/product', productRoutes);
app.use('/staff', staffRoutes);
app.use('/website', websiteRoutes);
app.use('/category', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
