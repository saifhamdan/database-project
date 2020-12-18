const factory = require('./handlerFactory');
// TO DO
const Table = 'Tour_Review';

exports.setData = (req, res, next) => {
	if (!req.body.tour_id) req.body.tour_id = req.params.tourId;
	next();
};

exports.getAllReviews = factory.getAll(Table);
exports.getReview = factory.getOne(Table);
exports.createReview = factory.createOne(Table);
exports.updateReview = factory.updateOne(Table);
exports.deleteReview = factory.deleteOne(Table);
