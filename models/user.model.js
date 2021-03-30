var express = require("express");
const app = express();
const { body, validationResult } = require('express-validator')
var db = require('../config/database');
var constants = require('../config/constants');
var common_functions = require('../config/common.function');
var async = require('async');
var md5 = require('md5');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// test api 
module.exports.get_user_list = function (req, res, next) {
	db.query("SELECT * FROM user_account", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.validate_login = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var email = (req.body.email != undefined && req.body.email != null) ? req.body.email : "";
		var password = (req.body.password != undefined && req.body.password != null) ? req.body.password : "";
		if (email != "" && password != "") {
			db.query("SELECT * FROM user_account WHERE email_id = '" + email + "' AND password = MD5(" + password + ") ", function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
		} else {
			return res.status(200).send({ code: 400, status: 'e', msg: 'Email or Password is null, Please enter respective value.' });
		}
	} else {
		return res.status(200).send({ code: 600, status: 'e', msg: 'No Parameter Passed' });
	}
}

module.exports.register_user = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var account_type = (req.body.account_type != undefined && req.body.account_type != null) ? req.body.account_type : "";
		var firstname = (req.body.firstname != undefined && req.body.firstname != null) ? req.body.firstname : "";
		var lastname = (req.body.lastname != undefined && req.body.lastname != null) ? req.body.lastname : "";
		var email = (req.body.email != undefined && req.body.email != null) ? req.body.email : "";
		var password = (req.body.password != undefined && req.body.password != null) ? req.body.password : "";

		if (email == "") {
			return res.status(200).send({ code: 600, status: 'e', msg: 'Email Id is required' });
		}

		if (password == "") {
			return res.status(200).send({ code: 600, status: 'e', msg: 'Password Id is required' });
		}

		db.query("SELECT * FROM user_account WHERE email_id = '" + email + "'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if (result.length == 0) {
				var sqlQuery = 'INSERT INTO user_account SET account_type = ? , first_name = ? , last_name = ? , email_id = ? , password = ?, user_name = ? ';
				var data = [account_type, firstname, lastname, email, md5(password), firstname];
				db.query(sqlQuery, data, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					if (result.insertId > 0) {
						let resultset = {
							"user_account_id": result.insertId,
							"user_name": firstname,
							"account_type": account_type,
							"firstname": firstname,
							"lastname": lastname,
							"email": email,
							"password": password,
						}

						return res.status(200).send({ status: 200, data: resultset });

					} else {
						return res.status(201).send({ status: 201, msg: 'user not created. Something went wrong' });
					}
				});

			} else {
				return res.status(200).send({ code: 600, msg: 'Email Id already exists' });
			}

		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });

	}
}