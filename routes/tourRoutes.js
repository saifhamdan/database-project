const express = require('express');
const reviewRouter = require('./reviewRoutes');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(tourController.createTour);
router
	.route('/:id')
	.get(tourController.getReviews, tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
