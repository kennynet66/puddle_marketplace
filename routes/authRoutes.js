const { Router } = require('express');
const authController = require('../controllers/authControllers')
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/login', (req,res) => { res.render('login')});
router.get('/signup', (req,res) => { res.render('signup')});
router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);
router.get('/logout', authController.logout);
router.get('/contact', authController.contact_get);

module.exports = router