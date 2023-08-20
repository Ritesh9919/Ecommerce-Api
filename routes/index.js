const express = require('express');
const router = express.Router();

router.use('/api/v1/auth', require('./authRoute'));
router.use('/api/v1', require('./userRoute'));
router.use('/api/v1/products', require('./productRoute'));

module.exports = router;