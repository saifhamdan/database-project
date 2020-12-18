const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DATABASE_PORT,
});

DB.connect(() => {
	try {
		console.log('DB has Connected Successfully!');
	} catch (err) {
		console.log(err);
	}
});
module.exports = DB;

const app = require('./app');
const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
