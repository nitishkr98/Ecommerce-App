const express = require('express');
const router = express.Router();
const { userAuth, adminAuth} = require('../middleware/check-auth');
const { getAllOrders, saveOrders } = require('../controllers/orders');

router.get('/', userAuth, getAllOrders);
router.post('/', userAuth, saveOrders);

module.exports = router;
