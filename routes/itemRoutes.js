const Router = require('express');
const itemController = require('../controllers/itemController');
const { checkItem } = require('../middleware/itemCheck');

const router = Router();

router.get('/view', checkItem, itemController.get_view);
router.get('/item/search', itemController.item_get);

module.exports = router