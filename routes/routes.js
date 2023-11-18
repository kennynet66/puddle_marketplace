const Router = require('express');
const routeController = require('../controllers/routeController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/forgot', routeController.forgot);
router.post('/forgot', routeController.forgot_post);
router.post('/pay', routeController.pay_post);
router.get('/success', (req,res) => {res.redirect('/dashboard')});
router.get('/cancel', (req,res) => {res.redirect('/dashboard')});
router.get('/cart', checkUser, routeController.cart_get);

module.exports = router;