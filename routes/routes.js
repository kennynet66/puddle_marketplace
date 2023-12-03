const Router = require('express');
const routeController = require('../controllers/routeController');
const { checkUser, requireAdmin, requireAuth, addItems, checkAdmin } = require('../middleware/authMiddleware');
const { checkItem } = require('../middleware/itemCheck');

const router = Router();

// Check the user authentication status for all the get requests
router.get('*', checkUser, checkAdmin, addItems);
router.get('/checkout', (req,res) => {res.render('pay')});
router.get('/', (req,res) => {res.render('landing')})
router.get('/dashboard', requireAuth, addItems, (req,res) => {res.render('dashboard')})
router.get('/admin', checkAdmin, requireAdmin, addItems, (req,res) => { res.render('admin')});
router.get('/create', checkAdmin, requireAdmin, (req,res) => { res.render('adminCreate')});
router.get('/view', addItems, checkItem, (req,res) => {res.render('item')});
router.get('/success', (req,res) => {res.redirect('/dashboard')});
router.get('/cancel', (req,res) => {res.redirect('/dashboard')});
router.get('/forgot', routeController.forgot);
router.post('/forgot', routeController.forgot_post);
router.post('/pay', routeController.pay_post);
router.post('/cart', routeController.cart_post);

module.exports = router;