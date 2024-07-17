const { Router } = require('express');
const letterController = require('../controllers/letterController')

const router = Router()

router.post('/subscribe', letterController.subscribe);

module.exports = router;