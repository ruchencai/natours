const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authControllers');
const bookingController = require('../controllers/bookingControllers');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
