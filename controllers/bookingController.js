const factory = require('./handlerFactory');
// TO DO
const Table = 'user_booking';

exports.getAllBookings = factory.getAll(Table);
exports.getBooking = factory.getOne(Table);
exports.createBooking = factory.createOne(Table);
exports.updateBooking = factory.updateOne(Table);
exports.deleteBooking = factory.deleteOne(Table);
