const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {authenticateUser,authorizePermission} = require('../middleware/authentication');

router.post('/', authenticateUser, orderController.createOrder);
router.get('/', authenticateUser, authorizePermission('admin'), orderController.getAllOrders);
router.get('/showAllMyOrders', authenticateUser, orderController.getCurrentUserOrders);
router.patch('/:id', authenticateUser, orderController.updateOrder);
router.get('/:id', authenticateUser, orderController.getSingalOrder);

module.exports = router;