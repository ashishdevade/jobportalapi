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
			} else if(type == "employment") {
				db.query("SELECT * FROM student_experience WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "language") {
				db.query("SELECT * FROM student_languages WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "hourly-rate") {
				db.query("SELECT hourly_rate, service_fees, receive_rate FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "title-overview") {
				db.query("SELECT job_title, professional_overview FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "location") {
				db.query("SELECT country, city, street_address, zipcode FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else if(type == "phone") {
				db.query("SELECT country_calling_code, phone_number FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else {
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

module.exports.get_countries = function (req, res, next) {
	db.query("SELECT id, country_name FROM countries", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.get_calling_code = function (req, res, next) {
	db.query('SELECT call_prefix, CONCAT("(+", call_prefix, ")", " ", country_name) AS calling_code from countries', function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.add_update_profile_employment = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var company_name     = (req.body.company_name != undefined && req.body.company_name != null) ? req.body.company_name : "";
		var job_title        = (req.body.job_title != undefined && req.body.job_title != null) ? req.body.job_title : "";
		var location         = (req.body.location != undefined && req.body.location != null) ? req.body.location : "";
		var country          = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var from_month       = (req.body.from_month != undefined && req.body.from_month != null) ? req.body.from_month : "";
		var from_year        = (req.body.from_year != undefined && req.body.from_year != null) ? req.body.from_year : "";
		var to_month         = (req.body.to_month != undefined && req.body.to_month != null) ? req.body.to_month : "";
		var to_year          = (req.body.to_year != undefined && req.body.to_year != null) ? req.body.to_year : "";
		var job_description  = (req.body.job_description != undefined && req.body.job_description != null) ? req.body.job_description : "";
		var experience_id    = (req.body.experience_id != undefined && req.body.experience_id != null) ? req.body.experience_id : "";
		var user_id          = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		if (experience_id == -1) {
			var data = {
				"company_name" : company_name,
				"job_title" : job_title,
				"location" : location,
				"country" : country,
				"from_month" : from_month,
				"from_year" : from_year,
				"to_year" : to_year,
				"to_month" : to_month,
				"to_year" : to_year,
				"job_description" : job_description,
				"student_id" : user_id
			}

			var sqlQuery = 'INSERT INTO student_experience SET ? ';
			// var data = [ company_name, job_title, location, country, from_month, from_year, to_month, to_year, job_description, user_id  ];
			db.query(sqlQuery, data, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					var updateUser = 'UPDATE user_account SET profile_completed = "5" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						let resultset = {
							"company_name": company_name,
							"job_title": job_title,
							"location": location,
							"country": country,
							"from_month": from_month,
							"from_year": from_year,
							"to_month": to_month,
							"to_year": to_year,
							"job_description": job_description,
							"experience_id" : result.insertId,
							"user_id" : user_id,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				}
			});
		} else {
			var sqlQuery = 'UPDATE student_experience SET company_name = "'+ company_name +'", job_title = "'+ job_title +'", location = "'+ location +'", country = "'+ country +'", from_month = "'+ from_month +'", from_year = "'+ from_year +'", to_month = "'+ to_month +'", to_year = "'+ to_year +'", job_description = "'+ job_description +'" WHERE student_id = "'+user_id+'" AND student_experience_id = "'+experience_id+'" ';
			db.query(sqlQuery, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var updateUser = 'UPDATE user_account SET profile_completed = "5" WHERE user_account_id = "'+user_id+'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					let resultset = {
						"company_name": company_name,
						"job_title": job_title,
						"location": location,
						"country": country,
						"from_month": from_month,
						"from_year": from_year,
						"to_month": to_month,
						"to_year": to_year,
						"job_description": job_description,
						"experience_id" : experience_id,
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

module.exports.get_employment_details = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var employment_id = (req.body.employment_id != undefined && req.body.employment_id != null) ? req.body.employment_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		if(employment_id!= ""){
			db.query('SELECT * FROM student_experience WHERE student_id = "'+user_id+'" AND student_experience_id = "'+employment_id+'"', function (err, result, fields) {
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

module.exports.delete_employment = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var employment_id = (req.body.employment_id != undefined && req.body.employment_id != null) ? req.body.employment_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'DELETE  FROM student_experience WHERE student_id = "'+user_id+'" AND student_experience_id = "'+employment_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { }
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}


module.exports.get_language_list = function (req, res, next) {
	
	db.query("SELECT id, name FROM language_list GROUP BY name order by name asc", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.add_update_profile_language = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var languages     = (req.body.languages != undefined && req.body.languages != null) ? req.body.languages : "";
		var user_id          = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'DELETE  FROM student_languages WHERE student_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			var sqlQuery = 'INSERT INTO student_languages (language_name, proficiency, student_id) VALUES ?';
			let data = [];
			for(let language of languages){
				data.push( [ language.names, language.proficiency, user_id] )
			}
			
			db.query(sqlQuery, [data], function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					var updateUser = 'UPDATE user_account SET profile_completed = "5" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						let resultset = {
							"languages": languages,
							"user_id" : user_id,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				}
			});
			
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_hourlyrate = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var hourly_date = (req.body.hourly_date != undefined && req.body.hourly_date != null) ? req.body.hourly_date : "";
		var service_fees = (req.body.service_fees != undefined && req.body.service_fees != null) ? req.body.service_fees : "";
		var receive_rate = (req.body.receive_rate != undefined && req.body.receive_rate != null) ? req.body.receive_rate : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'UPDATE user_account SET profile_completed = "7", hourly_rate = "'+ hourly_date +'", service_fees = "'+ service_fees +'", receive_rate = "'+ receive_rate +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = {
				"hourly_date":hourly_date,
				"service_fees":service_fees,
				"receive_rate":receive_rate,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_title_overview = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var job_title = (req.body.job_title != undefined && req.body.job_title != null) ? req.body.job_title : "";
		var professional_overview = (req.body.professional_overview != undefined && req.body.professional_overview != null) ? req.body.professional_overview : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'UPDATE user_account SET profile_completed = "8", job_title = "'+ job_title +'", professional_overview = "'+ professional_overview +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				"job_title": job_title, 
				"professional_overview": professional_overview,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}


module.exports.add_update_profile_location = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var country = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var city    = (req.body.city != undefined && req.body.city != null) ? req.body.city : "";
		var street_address = (req.body.street_address != undefined && req.body.street_address != null) ? req.body.street_address : "";
		var zipcode = (req.body.zipcode != undefined && req.body.zipcode != null) ? req.body.zipcode : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "10", country = "'+ country +'", city = "'+ city +'", street_address = "'+ street_address +'", zipcode = "'+ zipcode +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				"country": country,
				"city": city,
				"street_address": street_address,
				"zipcode": zipcode,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_phone = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var country_calling_code = (req.body.country_calling_code != undefined && req.body.country_calling_code != null) ? req.body.country_calling_code : "";
		var phone_number    = (req.body.phone_number != undefined && req.body.phone_number != null) ? req.body.phone_number : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "10", country_calling_code = "'+ country_calling_code +'", phone_number = "'+ phone_number +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'country_calling_code' : country_calling_code,
				'phone_number' : phone_number,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

 