const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticateUser,authorizePermission} = require('../middleware/authentication');

router.post('/', authenticateUser,authorizePermission('admin'),productController.createProduct);
router.get('/', productController.getAllProducts);
router.post('/uploadImage', authenticateUser, authorizePermission('admin'),productController.uploadImage);
router.get('/:id', productController.getSingalProduct);
router.patch('/:id', authenticateUser, authorizePermission('admin'),productController.updateProduct);
router.delete('/:id', authenticateUser, authorizePermission('admin'),productController.deleteProduct);



module.exports = router;
