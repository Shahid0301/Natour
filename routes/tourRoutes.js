const express = require('express');
const router = express.Router();
const tourContoller = require('./../controllers/tourController');
const authController=require('./../controllers/authController')
// router.param('id',tourContoller.checkID);
//challenge
router.route('/top-5-cheap').get(tourContoller.aliasTopTours, tourContoller.getAllTours);
router.route('/tour-stats').get(tourContoller.getTourStats);
router.route('/monthly-plan/:year').get(tourContoller.getMontlyplan);
router
  .route('/')
  .get(authController.protect,tourContoller.getAllTours)
  .post( tourContoller.createTour);
router
  .route('/:id')
  .get(tourContoller.getTour)
  .patch(tourContoller.updateTour)
  .delete(tourContoller.deleteTour); 

module.exports = router;
