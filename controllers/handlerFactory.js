/*
 * here where we will handle all requests that are coming from our app
 * since all tables kinda look the same (Don't repeat yourself)
 */
const nanoid = require('nanoid');
const DB = require('../server');
exports.getAll = (table) => async (req, res, next) => {
	// 1) Get all data from our database for this table
	const mysql = `SELECT * FROM ${table}`;
	DB.query(mysql, (error, result) => {
		if (!error) {
			// 2) Send the data in json format
			res.status(200).json({
				status: 'success',
				data: {
					data: result,
				},
			});
			// if there is an error log to the console
		} else {
			console.log(error);
			next();
		}
	});
};

exports.getOne = (table) => async (req, res, next) => {
	// 1) Find by ID and get the data
	const mysql = `SELECT * FROM ${table} WHERE ${
		table.split('_')[1] ? table.split('_')[1] : table
	}_id = '${req.params.id}'`;

	DB.query(mysql, (error, result1) => {
		if (!error) {
			// 2) Send the data in json format
			if (req.mysql) {
				DB.query(Object.values(req.mysql)[0], (error, result2) => {
					res.status(200).json({
						status: 'success',
						data: {
							data: [result1, [...result2]],
						},
					});
				});
			}
			// if there is an error log to the console
		} else {
			console.log(error);
			next();
		}
	});
};

exports.createOne = (table) => async (req, res, next) => {
	// 1) Get the data from the user using req.body
	const id = nanoid.nanoid();
	const keys = Object.keys({ ...req.body });
	const values = Object.values({ id, ...req.body }).map((el) => `'${el}'`);
	// 2)Create a doc with a unique id for each item using a nanoid package
	const mysql = `INSERT INTO ${table} (${
		table.split('_')[1] ? table.split('_')[1] : table
	}_id, ${keys}) VALUES (${values})`;
	DB.query(mysql, (error, result) => {
		if (!error) {
			// 3) Send the new created data in json format
			res.status(201).json({
				status: 'success',
				data: {
					data: { id, ...req.body },
				},
			});
			// if there is an error log to the console
		} else {
			console.log(error);
			next();
		}
	});
};

exports.updateOne = (table) => async (req, res, next) => {
	// 1) Set the data that user want to update
	const keys = Object.keys({ ...req.body });
	const values = Object.values({ ...req.body }).map((el) => `'${el}'`);
	const modifiedData = keys.map(
		(el, index) =>
			`${el} = ${values[index]}${index < keys.length - 1 ? ',' : ''}`,
	);
	// 2) Find by ID and Update
	const mysql = `UPDATE ${table} SET ${modifiedData} WHERE ${
		table.split('_')[1] ? table.split('_')[1] : table
	}_id = '${req.params.id}'`;
	DB.query(mysql, (error, result) => {
		if (!error) {
			// 2) Send the data in json format
			res.status(200).json({
				status: 'success',
				data: {
					id: req.params.id,
					data: result.message + ')',
				},
			});
			// if there is an error log to the console
		} else {
			console.log(error);
			next();
		}
	});
};

exports.deleteOne = (table) => async (req, res, next) => {
	// 1) Find by ID and get the data
	const mysql = `DELETE FROM ${table} WHERE ${
		table.split('_')[1] ? table.split('_')[1] : table
	}_id = '${req.params.id}'`;
	DB.query(mysql, (error, result) => {
		if (!error) {
			// 2) Send the data in json format
			res.status(204).json({
				status: 'success',
				data: {
					effectedRows: result.affectedRows,
				},
			});
			// if there is an error log to the console
		} else {
			console.log(error);
			next();
		}
	});
};
