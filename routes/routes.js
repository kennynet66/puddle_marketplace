const Router = require('express');
const routeController = require('../controllers/routeController');

const router = Router();

router.get('/forgot', routeController.forgot);
router.post('/forgot', routeController.forgot_post);

module.exports = router;