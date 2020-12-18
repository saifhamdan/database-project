const factory = require('./handlerFactory');

// TO DO
const Table = 'User';

exports.getBookings = (req, res, next) => {
	req.mysql = {
		bookings: `Select booking_id, booking_price, tour_id  from user_booking join User on User.user_id = user_booking.user_id`,
	};
	next();
};

exports.getAllUsers = factory.getAll(Table);
exports.getUser = factory.getOne(Table);
exports.createUser = factory.createOne(Table);
exports.updateUser = factory.updateOne(Table);
exports.deleteUser = factory.deleteOne(Table);
