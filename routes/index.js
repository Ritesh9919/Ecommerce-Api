const express = require('express');
const router = express.Router();

router.use('/api/v1/auth', require('./authRoute'));
router.use('/api/v1', require('./userRoute'));
router.use('/api/v1/products', require('./productRoute'));
router.use('/api/v1/reviews', require('./reviewRoute'));
router.use('/api/v1/orders', require('./orderRoute'));

module.exports = router;