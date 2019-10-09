const express = require('express');
const ReviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('user'),
    ReviewController.setTourUserIds,
    ReviewController.createReview
  )
  .get(ReviewController.getAllReviews);

router
  .route('/:id')
  .get(ReviewController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    ReviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    ReviewController.updateReview
  );

module.exports = router;
