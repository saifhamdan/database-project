const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const app = express();
// app.set('pool', pool);
// to read all data from config.env file and save it in process.env
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body parser, read data from body into req.body
app.use(
	express.json({
		limit: '10kb',
	}),
);

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `can't find ${req.originalUrl} on this server!`,
	});
});
module.exports = app;
