// import the required modules
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const adminRoutes = require('./routes/adminRoutes');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const { checkItem } = require('./middleware/itemCheck');
const paypal = require('paypal-rest-sdk');

//middleware
const { requireAuth, checkUser,requireAdmin, checkAdmin,  addItems } = require('./middleware/authMiddleware');
app.use(express.json());
app.use(cookieParser());

// Static folders
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//view engine
app.set('view engine','ejs');

//routes
app.get('*', checkUser, checkAdmin, addItems);
app.get('/', (req,res) => {res.render('landing')})
app.get('/dashboard', requireAuth, addItems, (req,res) => {res.render('dashboard')})
app.get('/admin', checkAdmin, requireAdmin, addItems, (req,res) => { res.render('admin')});
app.get('/create', checkAdmin, requireAdmin, (req,res) => { res.render('adminCreate')});
app.get('/view', addItems, checkItem, (req,res) => {res.render('item')});
app.get('/checkout', (req,res) => {res.render('pay')});
app.use(routes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(itemRoutes);


// connect to the database
mongoose.connect(process.env.LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log("Connected to MongoDB");
    //Start server
    app.listen(4000, () => {
        console.log("server is listening on port 4000");
    })
}) .catch ((error) => {
    console.log(error);
})
