var express = require("express");
const app = express();
var mysql      = require('mysql2');

const { body, validationResult } = require('express-validator')
var db = require('../config/database');
var constants = require('../config/constants');
var common_functions = require('../config/common.function');
var email_functions = require('../config/email.function');
var async = require('async');
var md5 = require('md5');
const bodyParser = require('body-parser');
const fs = require("fs");
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.admin_validate_login = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var email = (req.body.email != undefined && req.body.email != null) ? req.body.email : "";
		var password = (req.body.password != undefined && req.body.password != null) ? req.body.password : "";
		if (email != "" && password != "") {
			var login_query = "SELECT * FROM user_account WHERE email_id = '" + email + "' AND password = MD5('" + password + "') AND account_type = 'Admin' AND status = '1'";
			console.log("login_query ", login_query);
			db.query(login_query, function (err, result, fields) {
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

module.exports.get_all_companies = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var search = (req.body.search != undefined && req.body.search != null) ? req.body.search : "";
		var where_and = '';
		if(search!= ''){
			where_and = ' AND  (first_name LIKE "%'+search+'%" or last_name LIKE "%'+search+'%" or email_id LIKE "%'+search+'%" ) ';
		}
		
		var sql = "SELECT * FROM user_account WHERE is_deleted = '0' AND account_type = 'Company' " + where_and;
		console.log("sql ", sql);
		db.query(sql, function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });

			return res.status(200).send({ status: 200, data: result });
		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.get_all_candidate_users = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var search = (req.body.search != undefined && req.body.search != null) ? req.body.search : "";
		var where_and = '';
		if(search!= ''){
			where_and = ' AND  (first_name LIKE "%'+search+'%" or last_name LIKE "%'+search+'%" or email_id LIKE "%'+search+'%" ) ';
		}
		
		var sql = "SELECT * FROM user_account WHERE is_deleted = '0' AND account_type = 'Student' " + where_and;
		
		db.query(sql, function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });

			return res.status(200).send({ status: 200, data: result });
		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.admin_user_change_password = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var new_pass = (req.body.new_pass != undefined && req.body.new_pass != null) ? req.body.new_pass : "";
		var updateUser = 'UPDATE user_account SET  password = MD5("' + new_pass + '") WHERE user_account_id = "'+ user_id +'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			let resultset = {
				
			};
			
			return res.status(200).send({ status: 200, data:  resultset });
			
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.update_admin_user_edit = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var access_type = (req.body.access_type != undefined && req.body.access_type != null) ? req.body.access_type : "";
		
		var company_name = (req.body.company_name != undefined && req.body.company_name != null) ? req.body.company_name : "";
		var industry = (req.body.industry != undefined && req.body.industry != null) ? req.body.industry : "";
		var other_industry = (req.body.other_industry != undefined && req.body.other_industry != null) ? req.body.other_industry : "";
		var first_name = (req.body.first_name != undefined && req.body.first_name != null) ? req.body.first_name : "";
		var last_name = (req.body.last_name != undefined && req.body.last_name != null) ? req.body.last_name : "";
		var email_id = (req.body.email_id != undefined && req.body.email_id != null) ? req.body.email_id : "";
		var level = (req.body.level != undefined && req.body.level != null) ? req.body.level : "";
		var status = (req.body.status != undefined && req.body.status != null) ? req.body.status : "";
		
		var country_id = (req.body.country_id != undefined && req.body.country_id != null) ? req.body.country_id : "";
		var country = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var state_id = (req.body.state_id != undefined && req.body.state_id != null) ? req.body.state_id : "";
		var state = (req.body.state != undefined && req.body.state != null) ? req.body.state : "";
		var city_id    = (req.body.city_id != undefined && req.body.city_id != null) ? req.body.city_id : "";
		var city    = (req.body.city != undefined && req.body.city != null) ? req.body.city : "";
		var street_address = (req.body.street_address != undefined && req.body.street_address != null) ? req.body.street_address : "";
		var zipcode = (req.body.zipcode != undefined && req.body.zipcode != null) ? req.body.zipcode : "";
		
		var category = (req.body.category_id != undefined && req.body.category_id != null) ? req.body.category_id : "";
		var subcategory = (req.body.subcategory_id != undefined && req.body.subcategory_id != null) ? req.body.subcategory_id : "";
		var industry_description = (req.body.industry_description != undefined && req.body.industry_description != null) ? req.body.industry_description : "";
		
		var update_user = 'UPDATE user_account SET  company_name = "'+ company_name +'", industry = "'+ industry +'", other_industry = "'+ other_industry +'", first_name = "'+ first_name +'", last_name = "'+ last_name +'", email_id = "'+ email_id +'", status = "'+ status +'",  country = "'+ country +'", country_id = "'+ country_id +'",  state_id = "'+ state_id +'", state = "'+ state +'", city_id = "'+ city_id +'", city = "'+ city +'", street_address = "'+ street_address +'", zipcode = "'+ zipcode +'" WHERE user_account_id = "'+user_id+'"';
		
		db.query(update_user, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			var update_category = "";
			if(access_type == 'student'){
				update_category = 'UPDATE student_category SET category_id = "'+category+'" , subcategory_id = "'+subcategory+'", industry_description = "'+industry_description+'",  student_id = "'+user_id+'"';
				
			} else if(access_type == 'company'){ 
				update_category = 'UPDATE student_category SET category_id = "'+ category +'" , team_department = "'+ subcategory +'", student_id = "'+ user_id +'"';
			}
			
			db.query(update_category, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var update_expertise = 'UPDATE student_expertise SET level = "'+ level +'" WHERE student_id = "'+user_id+'"';
				db.query(update_expertise, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					let resultset = {
						"country": country,
						"city": city,
						"street_address": street_address,
						"zipcode": zipcode,
						"category_id": category,
						"subcategory_id": subcategory,
					}
					
					return res.status(200).send({ status: 200, data: resultset });
				});		
			});			
		});
		
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.soft_delete_user = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET is_deleted = "1"  WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'user_id' : user_id
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}