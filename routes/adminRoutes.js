const { Router } = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authControllers');
const { addItems, requireAdmin, checkAdmin } = require('../middleware/authMiddleware');
const router = Router();

router.post('/admin/login', adminController.admin_post);
router.get('/admin/login', adminController.admin_get);
router.get('/logout', authController.logout);
router.post('/admin/create', adminController.create_post);
router.get('/new/item', checkAdmin, requireAdmin, adminController.item_get);
router.post('/new/item', adminController.item_post);
router.put('/item/update', /*checkAdmin, requireAdmin,*/ adminController.item_put);
router.put('/item/delete', /*checkAdmin, requireAdmin,*/ adminController.item_delete);

module.exports = router;