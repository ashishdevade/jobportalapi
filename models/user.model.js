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
			var login_query = "SELECT * FROM user_account WHERE email_id = '" + email + "' AND password = MD5(" + password + ") ";
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

module.exports.get_user_profile_settings = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var type = (req.body.type != undefined && req.body.type != null) ? req.body.type : "";
		var user_id = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		if(type!= ""){
			if(type == 'category'){
				db.query("SELECT * FROM student_category WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == 'expertise' || type == 'expertise_level') {
				db.query("SELECT * FROM student_expertise WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else if(type == 'education'){
				db.query("SELECT * FROM student_education WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else {
				return res.status(200).send({ code: 600, msg: 'Type Parameter Missing' });
				
			}
			
		} else {
			return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
		}
	}
}


module.exports.get_all_categories = function (req, res, next) {
	
	db.query("SELECT category_id, name FROM category", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.get_all_subcategories = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var category_id = (req.body.category_id != undefined && req.body.category_id != null) ? req.body.category_id : "";
		if(category_id!= ""){
			db.query("SELECT id, subcategory_name  FROM subcategories WHERE category_id = '"+category_id+"'", function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
			
		} else {
			return res.status(200).send({ code: 600, msg: 'No Category ID Passed' });
			
		}
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.update_profile_category = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var category = (req.body.category != undefined && req.body.category != null) ? req.body.category : "";
		var subcategory = (req.body.subcategory != undefined && req.body.subcategory != null) ? req.body.subcategory : "";
		var user_id = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		db.query("SELECT * FROM student_category WHERE student_id = '" + user_id + "'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if (result.length == 0) {
				var sqlQuery = 'INSERT INTO student_category SET category_id = ? , subcategory_id = ?, student_id = ?';
				var data = [category, subcategory, user_id];
				db.query(sqlQuery, data, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					var updateUser = 'UPDATE user_account SET profile_completed = "1" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						
						let resultset = {
							"category_id": category,
							"subcategory_id": subcategory,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				});
			} else {
				var sqlQuery = 'UPDATE student_category SET category_id = "'+ category +'" , subcategory_id = "'+ subcategory +'" WHERE student_id = "'+user_id+'"';
				db.query(sqlQuery, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					var updateUser = 'UPDATE user_account SET profile_completed = "1" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						
						let resultset = {
							"category_id": category,
							"subcategory_id": subcategory,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
					
				});
			}
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.update_profile_expertise = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var skills = (req.body.skills != undefined && req.body.skills != null) ? req.body.skills : "";
		var other = (req.body.other != undefined && req.body.other != null) ? req.body.other : "";
		var user_id = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		db.query("SELECT * FROM student_expertise WHERE student_id = '" + user_id + "'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if (result.length == 0) {
				var sqlQuery = 'INSERT INTO student_expertise SET skills = ?, others = ?, student_id = ?';
				var data = [skills, other, user_id];
				db.query(sqlQuery, data, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					var updateUser = 'UPDATE user_account SET profile_completed = "2" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						
						let resultset = {
							"skills": skills,
							"others": other
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				});
			} else {
				var sqlQuery = 'UPDATE student_expertise SET skills = "'+ skills +'", others = "'+ other +'" WHERE student_id = "'+user_id+'"';
				db.query(sqlQuery, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					var updateUser = 'UPDATE user_account SET profile_completed = "2" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						
						let resultset = {
							"skills": skills,
							"others": other
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
					
				});
			}
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.update_profile_expertise_level = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var level = (req.body.level != undefined && req.body.level != null) ? req.body.level : "";
		var user_id = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var sqlQuery = 'UPDATE student_expertise SET level = "'+ level +'" WHERE student_id = "'+user_id+'"';
		db.query(sqlQuery, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			var updateUser = 'UPDATE user_account SET profile_completed = "3" WHERE user_account_id = "'+user_id+'"';
			db.query(updateUser, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				let resultset = {
					"expertise_level": level,
				}
				
				return res.status(200).send({ status: 200, data: resultset });
			});
			
		});
		
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_education = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var school       = (req.body.school != undefined && req.body.school != null) ? req.body.school : "";
		var study        = (req.body.study != undefined && req.body.study != null) ? req.body.study : "";
		var degree       = (req.body.degree != undefined && req.body.degree != null) ? req.body.degree : "";
		var from_year    = (req.body.from_year != undefined && req.body.from_year != null) ? req.body.from_year : "";
		var to_year      = (req.body.to_year != undefined && req.body.to_year != null) ? req.body.to_year : "";
		var description  = (req.body.description != undefined && req.body.description != null) ? req.body.description : "";
		var education_id = (req.body.education_id != undefined && req.body.education_id != null) ? req.body.education_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		
		if (education_id == -1) {
			var sqlQuery = 'INSERT INTO student_education SET school = ?, description = ?, study = ?, student_id = ?, degree = ?, from_year = ?, to_year = ?';
			var data = [school, description, study, user_id, degree, from_year, to_year];
			db.query(sqlQuery, data, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					var updateUser = 'UPDATE user_account SET profile_completed = "4" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						
						let resultset = {
							"school" : school,
							"study" : study,
							"degree" : degree,
							"from_year" : from_year,
							"to_year" : to_year,
							"description" : description,
							"education_id" : result.insertId,
							"user_id" : user_id,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				}
				
			});
		} else {
			var sqlQuery = 'UPDATE student_education SET school = "'+ school +'", study = "'+ study +'", degree = "'+ degree +'", from_year = "'+ from_year +'", to_year = "'+ to_year +'", description = "'+ description +'" WHERE student_id = "'+user_id+'" AND student_education_id = "'+education_id+'" ';
			db.query(sqlQuery, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var updateUser = 'UPDATE user_account SET profile_completed = "4" WHERE user_account_id = "'+user_id+'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					let resultset = {
						"school" : school,
						"study" : study,
						"degree" : degree,
						"from_year" : from_year,
						"to_year" : to_year,
						"description" : description,
						"education_id" : education_id,
						"user_id" : user_id,
					}
					
					return res.status(200).send({ status: 200, data: resultset });
				});
				
			});
		}
		
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.skip_this_step = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var step_id = (req.body.step_id != undefined && req.body.step_id != null) ? req.body.step_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'UPDATE user_account SET profile_completed = "'+step_id+'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { }
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.delete_education = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var education_id = (req.body.education_id != undefined && req.body.education_id != null) ? req.body.education_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'DELETE  FROM student_education WHERE student_id = "'+user_id+'" AND student_education_id = "'+education_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { }
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.get_education_details = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var education_id = (req.body.education_id != undefined && req.body.education_id != null) ? req.body.education_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		if(education_id!= ""){
			db.query('SELECT * FROM student_education WHERE student_id = "'+user_id+'" AND student_education_id = "'+education_id+'"', function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
			
		} else {
			return res.status(200).send({ code: 600, msg: 'No Education ID Passed' });
			
		}
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}
