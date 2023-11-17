const Router = require('express');
const itemController = require('../controllers/itemController');
const { addItem, requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/item/search', requireAuth, itemController.item_get);

module.exports = router