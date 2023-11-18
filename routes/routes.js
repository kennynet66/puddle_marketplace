const Router = require('express');
const routeController = require('../controllers/routeController');

const router = Router();

router.get('/forgot', routeController.forgot);
router.post('/forgot', routeController.forgot_post);
router.post('/pay', routeController.pay_post);
router.get('/success', (req,res) => {res.redirect('/dashboard')});

module.exports = router;