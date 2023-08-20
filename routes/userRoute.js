const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateUser, authorizePermission} = require('../middleware/authentication');

router.get('/users', authenticateUser, authorizePermission('admin', 'owner'),userController.getAllUser);
router.get('/users/showMe', authenticateUser,userController.showCurrentUser);
router.post('/users/updateUser', authenticateUser, userController.updateUser);
router.post('/users/updateUserPassword', authenticateUser, userController.updateUserPassword);
router.get('/users/:id', authenticateUser, userController.getSingalUser);

module.exports = router;