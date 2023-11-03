const express = require('express');
const { requireAuth, checkUser,requireAdmin, checkAdmin,  addItems } = require('./middleware/authMiddleware');
const mongoose = require('mongoose')
const app = express();
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const multer = require('multer')

//middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine','ejs');

//routes
app.get('*', checkUser, checkAdmin);
app.get('/', (req,res) => {res.render('landing')})
app.get('/dashboard', requireAuth, addItems, (req,res) => {res.render('dashboard')})
app.get('/admin', checkAdmin, requireAdmin, addItems, (req,res) => { res.render('admin')});
app.get('/create', checkAdmin, requireAdmin, (req,res) => { res.render('adminCreate')});
app.use(authRoutes);
app.use(adminRoutes);

mongoose.connect('mongodb+srv://kennynet66:kennynet66@cluster0.dcfto7l.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log("Connected to MongoDB");
    //Start server
    app.listen(4000, () => {
        console.log("server is listening on port 4000");
    })
}) .catch ((error) => {
    console.log(error);
})
