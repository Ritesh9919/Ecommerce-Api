const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {authenticateUser} = require('../middleware/authentication');

router.post('/', authenticateUser,reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.patch('/:id', authenticateUser,reviewController.updateReview);
router.delete('/:id', authenticateUser,reviewController.deleteReview);
router.get('/:id', reviewController.getSingalReview);

module.exports = router;