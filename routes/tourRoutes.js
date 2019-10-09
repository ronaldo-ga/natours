const express = require('express');
const TourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id', TourController.checkID);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(TourController.aliasTopTours, TourController.getAllTours);

router.route('/tours-stats').get(TourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guides'),
    TourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(TourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(TourController.getDistances);

router
  .route('/')
  .get(TourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    TourController.createTour
  );

router
  .route('/:id')
  .get(TourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    TourController.uploadTourImages,
    TourController.resizeTourImages,
    TourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    TourController.deleteTour
  );

module.exports = router;
