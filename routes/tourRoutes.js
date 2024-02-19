const express = require('express');
const router = express.Router();
const tourContoller = require('./../controllers/tourController');

// router.param('id',tourContoller.checkID);
//challenge

router
  .route('/')
  .get(tourContoller.getAllTours)
  .post(tourContoller.checkBody, tourContoller.createTour);
router
  .route('/:id')
  .get(tourContoller.getTour)
  .patch(tourContoller.updateTour)
  .delete(tourContoller.deleteTour);

module.exports = router;
