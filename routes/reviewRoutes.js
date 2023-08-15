const express = require('express');
const reviewController = require('./../controllers/reviewControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

// POST /tour/:id/reviews
// GET /tour/:id/reviews
// POST /reviews

router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews).post(
  // only authenticared and "user" role can post review
  authController.protect,
  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
