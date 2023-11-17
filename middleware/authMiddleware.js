const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/admin');
const Item = require('../models/item');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const adminToken = req.cookies.admin;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else if(adminToken) {
    jwt.verify(adminToken, process.env.ADMINSECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  }
  else {
    res.redirect('/login');
  }
  
};

const requireAdmin = (req, res, next) => {
  const adminToken = req.cookies.admin;

  // check json web token exists & is verified
  if (adminToken) {
    jwt.verify(adminToken, process.env.ADMINSECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admin/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/admin/login');
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


//check admin user
const checkAdmin = (req, res, next) => {
  const adminToken = req.cookies.admin
  if (adminToken) {
    jwt.verify(adminToken, process.env.ADMINSECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.admin = null;
        next();
      } else {
        let admin = await Admin.findById(decodedToken.id);
        res.locals.admin = admin;
        next();
      }
    });
  } else {
    res.locals.admin = null;
    next();
  }
};

const addItems = async (req, res, next) => {
  try {
    const items = await Item.find({});

    if (items && items.length > 0) {
      res.locals.items = items;
      next();
    } else {
      res.locals.items = null;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = { requireAuth, checkUser,requireAdmin, checkAdmin, addItems };