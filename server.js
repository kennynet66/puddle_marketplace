// import the required modules
const adminRoutes = require('./routes/adminRoutes');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
require('multer');

//middleware
app.use(express.json());
app.use(cookieParser());

// Static folders
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//view engine
app.set('view engine', 'ejs');

//routes
app.use(routes);
app.use(authRoutes);
app.use(itemRoutes);
app.use(adminRoutes);


// connect to the database
mongoose.connect(process.env.LOCAL_URI || process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        //Start server
        app.listen(4000, () => {
            console.log("server is listening on port 4000");
        })
    }).catch((error) => {
        console.log(error);
    })
