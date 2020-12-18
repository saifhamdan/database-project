const factory = require('./handlerFactory');

// TO DO
const Table = 'Camp_Tour';

exports.getReviews = (req, res, next) => {
	req.mysql = {
		reviews: `Select review_id, rating, description_ from tour_review join camp_tour on Camp_Tour.tour_id = tour_review.tour_id`,
	};
	next();
};

exports.getAllTours = factory.getAll(Table);
exports.getTour = factory.getOne(Table);
exports.createTour = factory.createOne(Table);
exports.updateTour = factory.updateOne(Table);
exports.deleteTour = factory.deleteOne(Table);
