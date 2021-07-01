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
			var login_query = "SELECT * FROM user_account WHERE email_id = '" + email + "' AND password = MD5('" + password + "') ";
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
		var company_name = (req.body.company_name != undefined && req.body.company_name != null) ? req.body.company_name : "";
		var industry = (req.body.industry != undefined && req.body.industry != null) ? req.body.industry : "";
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
				var sqlQuery = 'INSERT INTO user_account SET account_type = ? , first_name = ? , last_name = ? , email_id = ? , password = ?, user_name = ?, company_name = ?, industry = ?, is_registered_complete = ? ';
				var data = [account_type, firstname, lastname, email, md5(password), firstname, company_name, industry, 0];
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
							"company_name": company_name,
							"industry": industry,
						}
						
						var full_name = firstname + ' ' + lastname;
						email_functions.send_registration_mail(full_name, email, password, (response)=>{
							console.log("response ", response);
							if(response == true){
								return res.status(200).send({ status: 200, data: resultset });
							} else{
								return res.status(500).send({ code: 600, msg: 'Unable to send email' });
							}
						});
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
				db.query("SELECT sc.*, cat.profile_name as profile_name,  industry_name FROM student_category as sc  LEFT JOIN  job_profiles  as cat ON sc.category_id = cat.id LEFT JOIN industry as subcat ON sc.subcategory_id = subcat.id  WHERE student_id = '"+user_id+"'", function (err, result, fields) {
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
				var lagnuage_query = "SELECT * FROM student_languages WHERE student_id = '"+user_id+"' ORDER BY id ASC";
				console.log("lagnuage_query ", lagnuage_query);
				db.query(lagnuage_query, function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "hourly-rate") {
				db.query("SELECT hourly_rate, service_fees, receive_rate, job_type, salary_expectation FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "title-overview") {
				db.query("SELECT job_title, professional_overview, uploaded_jd FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			} else if(type == "location") {
				db.query("SELECT country_id, country, state_id, state, city_id, city, street_address, zipcode FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else if(type == "phone") {
				db.query("SELECT country_calling_code, country_calling_id, phone_number FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			} else if(type == "job_type") {
				db.query("SELECT job_type FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			} else if(type == "projects") {
				db.query("SELECT * FROM student_project WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else if(type == "student_certificate") {
				db.query("SELECT * FROM student_certificate WHERE student_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
				
			} else if(type == "profile-photo") {
				db.query("SELECT profile_photo FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });
					var path = result[0]['profile_photo'];
					if (!fs.existsSync(path)) {
						result[0]['profile_photo'] = "";
					} 
					return res.status(200).send({ status: 200, data: result });
				});
				
			} else if(type == "user-account") {
				var user_account_query = "SELECT industry, company_name, first_name, last_name, email_id, user_name, account_type, hourly_rate, service_fees, receive_rate, job_type, salary_expectation, job_title, professional_overview, uploaded_jd, country_id, country, state_id, state, city_id, city, street_address, zipcode, country_calling_code,country_calling_id, phone_number, job_type,  profile_photo, location_preference, prefered_country_id,  prefered_country, prefered_state_id, prefered_state, location_preference_name, location_preference_id, prefered_street_address, prefered_zipcode, timeline_hiring, timeline_hiring_weeks, profile_completed FROM user_account WHERE user_account_id = '"+user_id+"'";
					// console.log("user_account_query " , user_account_query);
				db.query(user_account_query, function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });
					// console.log("result " , result[0]);
					var path = result[0]['profile_photo'];
					if(path != ""){
						if (!fs.existsSync(path)) {
							result[0]['profile_photo'] = "";
						} 
					}
					return res.status(200).send({ status: 200, data: result });
				});
				
			}  else if(type == "location-preference") {
				db.query("SELECT location_preference, prefered_country_id,  prefered_country, prefered_state_id, prefered_state, location_preference_name, location_preference_id, prefered_street_address, prefered_zipcode FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			}  else if(type == "timeline-hiring") {
				db.query("SELECT timeline_hiring, timeline_hiring_weeks FROM user_account WHERE user_account_id = '"+user_id+"'", function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });

					return res.status(200).send({ status: 200, data: result });
				});
			}  else if(type == "review") {
				var user_account_query = "SELECT industry, company_name, first_name, last_name, email_id, user_name, account_type, hourly_rate, service_fees, receive_rate, job_type, salary_expectation, job_title, professional_overview, country_id, country, state_id, state, city_id, city, street_address, zipcode, country_calling_code,country_calling_id, phone_number, job_type,  profile_photo, location_preference, uploaded_jd, prefered_country_id,  prefered_country, prefered_state_id, prefered_state, location_preference_name, location_preference_id, prefered_street_address, prefered_zipcode, timeline_hiring, timeline_hiring_weeks, profile_completed FROM user_account WHERE user_account_id = '"+user_id+"'";
				var student_category_query = "SELECT sc.*, cat.profile_name as profile_name,  industry_name FROM student_category as sc  LEFT JOIN  job_profiles  as cat ON sc.category_id = cat.id LEFT JOIN industry as subcat ON sc.subcategory_id = subcat.id  WHERE student_id = '"+user_id+"'"
				var student_expertise_query = "SELECT * FROM student_expertise WHERE student_id = '"+user_id+"'";
				var student_education_query = "SELECT * FROM student_education WHERE student_id = '"+user_id+"'";
				var student_experience_query = "SELECT * FROM student_experience WHERE student_id = '"+user_id+"'";
				var student_languages_query = "SELECT * FROM student_languages WHERE student_id = '"+user_id+"' ORDER BY id ASC";
				var student_project_query = "SELECT * FROM student_project WHERE student_id = '"+user_id+"'";
				var student_certificate_query = "SELECT * FROM student_certificate WHERE student_id = '"+user_id+"'";
				
				db.query(user_account_query + ";" + student_category_query + ";" + student_expertise_query + ";" + student_education_query + ";" + student_experience_query + ";" + student_languages_query + ";" + student_project_query + ";" + student_certificate_query, function (err, result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });
					var user_account_details = result;
					var path = result[0][0]['profile_photo'];
					if(path != ""){
						if (!fs.existsSync(path)) {
							result[0][0]['profile_photo'] = "";
						} 
					}
					
					let return_response = {
						"user_account_data" : result[0],
						"category_data" : result[1],
						"expertise_data" : result[2],
						"education_data" : result[3],
						"experience_data" : result[4],
						"languages_data" : result[5],
						"project_data" : result[6],
						"certificate_data" : result[7],
					}

					return res.status(200).send({ status: 200, data: return_response });
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
		var industry_description = (req.body.industry_description != undefined && req.body.industry_description != null) ? req.body.industry_description : "";
		var user_id = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var access_type = (req.body.access_type != undefined && req.body.access_type != null) ? req.body.access_type : "";
		db.query("SELECT * FROM student_category WHERE student_id = '" + user_id + "'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if (result.length == 0) {
				var sqlQuery = "";
				var data = [];
				if(access_type == 'Student'){
					sqlQuery = 'INSERT INTO student_category SET category_id = ? , subcategory_id = ?, industry_description = ?,  student_id = ?';
					data = [category, subcategory, industry_description, user_id];
					
				} else if(access_type == 'Company'){
					sqlQuery = 'INSERT INTO student_category SET category_id = ? , team_department = ?, student_id = ?';
					data = [category, subcategory, user_id];
				}
				
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
				var sqlQuery = "";
				if(access_type == 'Student'){
					sqlQuery = 'UPDATE student_category SET category_id = "'+ category +'" , subcategory_id = "'+ subcategory +'", industry_description = "'+ industry_description +'" WHERE student_id = "'+user_id+'"';
				} else if(access_type == 'Company'){
					sqlQuery = 'UPDATE student_category SET category_id = "'+ category +'" , team_department = "'+ subcategory +'" WHERE student_id = "'+user_id+'"';
				}
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
				var data = [JSON.stringify(skills), other, user_id];
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
				let skill_set = JSON.stringify(skills);
				var sqlQuery = "UPDATE student_expertise SET skills = '"+ skill_set +"', others = '"+ other +"' WHERE student_id = '"+ user_id + "'";
				console.log("sqlQuery ", sqlQuery);
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
		db.query("SELECT * FROM student_expertise WHERE student_id = '" + user_id + "'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if (result.length == 0) {
				var sqlQuery = 'INSERT INTO student_expertise SET level = ?, student_id = ?';
				var data = [level, user_id];
				db.query(sqlQuery, data, function (error, result, fields) {
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
			} else {
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
			}
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
	db.query("SELECT id, country_name as name, country_name FROM countries", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.get_states = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var country_id = (req.body.country_id != undefined && req.body.country_id != null) ? req.body.country_id : "";
		if(country_id!= ""){
			db.query("SELECT id, state_name as name  FROM states WHERE country_id = '"+country_id+"'", function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
			
		} else {
			return res.status(200).send({ code: 600, msg: 'No Country ID Passed' });
			
		}
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.get_cities = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var state_id = (req.body.state_id != undefined && req.body.state_id != null) ? req.body.state_id : "";
		if(state_id!= ""){
			db.query("SELECT id, name  FROM cities WHERE state_id = '"+state_id+"'", function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
			
		} else {
			return res.status(200).send({ code: 600, msg: 'No State ID Passed' });
			
		}
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.get_calling_code = function (req, res, next) {
	db.query('SELECT call_prefix as id, CONCAT("(+", call_prefix, ")", " ", country_name) AS calling_code from countries WHERE call_prefix != "" ORDER BY country_name ASC', function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });

		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.add_update_profile_employment = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var company_name     = (req.body.company_name != undefined && req.body.company_name != null) ? req.body.company_name : "";
		var job_title        = (req.body.job_title != undefined && req.body.job_title != null) ? req.body.job_title : "";
		var location         = (req.body.location != undefined && req.body.location != null) ? req.body.location : "";
		
		//var country          = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var country_id       = (req.body.country_id != undefined && req.body.country_id != null) ? req.body.country_id : "";
		var country          = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var state_id         = (req.body.state_id != undefined && req.body.state_id != null) ? req.body.state_id : "";
		var state            = (req.body.state != undefined && req.body.state != null) ? req.body.state : "";
		var location         = (req.body.location != undefined && req.body.location != null) ? req.body.location : "";
		var location_id         = (req.body.location_id != undefined && req.body.location_id != null) ? req.body.location_id : "";
		var zipcode          = (req.body.zipcode != undefined && req.body.zipcode != null) ? req.body.zipcode : "";
		
		var from_month       = (req.body.from_month != undefined && req.body.from_month != null) ? req.body.from_month : "";
		var from_year        = (req.body.from_year != undefined && req.body.from_year != null) ? req.body.from_year : "";
		var to_month         = (req.body.to_month != undefined && req.body.to_month != null) ? req.body.to_month : "";
		var to_year          = (req.body.to_year != undefined && req.body.to_year != null) ? req.body.to_year : "";
		var job_description  = (req.body.job_description != undefined && req.body.job_description != null) ? req.body.job_description : "";
		var experience_id    = (req.body.experience_id != undefined && req.body.experience_id != null) ? req.body.experience_id : "";
		var currently    = (req.body.currently != undefined && req.body.currently != null) ? req.body.currently : "";
		var user_id          = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		if (experience_id == -1) {
			var data = {
				"company_name" : company_name,
				"job_title" : job_title,
				// "country" : country,
				"country_id" : country_id,
				"country" : country,
				"state_id" : state_id,
				"state" : state,
				"location" : location,
				"location_id" : location_id,
				"zipcode" : zipcode,
				
				"from_month" : from_month,
				"from_year" : from_year,
				"to_year" : to_year,
				"to_month" : to_month,
				"to_year" : to_year,
				"currently" : currently,
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
							"location_id": location_id,
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
			var sqlQuery = 'UPDATE student_experience SET company_name = "'+ company_name +'", job_title = "'+ job_title +'", location = "'+ location +'", location_id = "'+ location_id +'", country_id = "'+ country_id +'", country = "'+ country +'", state_id = "'+ state_id +'", state = "'+ state +'", zipcode = "'+ zipcode +'", from_month = "'+ from_month +'", from_year = "'+ from_year +'", to_month = "'+ to_month +'", to_year = "'+ to_year +'", currently = "'+ currently +'", job_description = "'+ job_description +'" WHERE student_id = "'+user_id+'" AND student_experience_id = "'+experience_id+'" ';
			db.query(sqlQuery, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var updateUser = 'UPDATE user_account SET profile_completed = "5" WHERE user_account_id = "'+user_id+'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					let resultset = {
						"company_name": company_name,
						"job_title": job_title,
						"location": location,
						"location_id": location_id,
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
	
	db.query("SELECT id, name FROM language_list group by name order by name asc", function (err, result, fields) {
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
		var salary_expectation = (req.body.salary_expectation != undefined && req.body.salary_expectation != null) ? req.body.salary_expectation : "";
		var service_fees = (req.body.service_fees != undefined && req.body.service_fees != null) ? req.body.service_fees : "";
		var receive_rate = (req.body.receive_rate != undefined && req.body.receive_rate != null) ? req.body.receive_rate : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'UPDATE user_account SET profile_completed = "7", hourly_rate = "'+ hourly_date +'", service_fees = "'+ service_fees +'", salary_expectation = "'+ salary_expectation +'", receive_rate = "'+ receive_rate +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = {
				"hourly_date":hourly_date,
				"service_fees":service_fees,
				"salary_expectation":salary_expectation,
				"receive_rate":receive_rate,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_title_overview = function (req, res, next) {
	// if (Object.keys(req.body).length > 0) {
		var uploaded_document = "";
		if(req.file!= undefined){
			if(req.file.path != undefined ){
				//uploaded_document = (req.file.path).trim();
				uploaded_document = req.file.path.replace(/\\/g, "/");
			}
		}
		
		var additional_parameter = "";
		if(uploaded_document!= ""){
			additional_parameter = ' , uploaded_jd = "'+ uploaded_document +'"  ';
		}
		
		var job_title = (req.body.job_title != undefined && req.body.job_title != null) ? req.body.job_title : "";
		var professional_overview = (req.body.professional_overview != undefined && req.body.professional_overview != null) ? req.body.professional_overview : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'UPDATE user_account SET profile_completed = "8", job_title = "'+ job_title +'", professional_overview = "'+ mysql.escape(professional_overview) +'"  '+ additional_parameter  +'  WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				"job_title": job_title, 
				"professional_overview": professional_overview,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	/*}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} */
}


module.exports.add_update_profile_location = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var country_id = (req.body.country_id != undefined && req.body.country_id != null) ? req.body.country_id : "";
		var country = (req.body.country != undefined && req.body.country != null) ? req.body.country : "";
		var state_id = (req.body.state_id != undefined && req.body.state_id != null) ? req.body.state_id : "";
		var state = (req.body.state != undefined && req.body.state != null) ? req.body.state : "";
		var city_id    = (req.body.city_id != undefined && req.body.city_id != null) ? req.body.city_id : "";
		var city    = (req.body.city != undefined && req.body.city != null) ? req.body.city : "";
		var street_address = (req.body.street_address != undefined && req.body.street_address != null) ? req.body.street_address : "";
		var zipcode = (req.body.zipcode != undefined && req.body.zipcode != null) ? req.body.zipcode : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "10", country = "'+ country +'", country_id = "'+ country_id +'",  state_id = "'+ state_id +'", state = "'+ state +'", city_id = "'+ city_id +'", city = "'+ city +'", street_address = "'+ street_address +'", zipcode = "'+ zipcode +'" WHERE user_account_id = "'+user_id+'"';
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
		var country_calling_id = (req.body.country_calling_id != undefined && req.body.country_calling_id != null) ? req.body.country_calling_id : "";
		var phone_number    = (req.body.phone_number != undefined && req.body.phone_number != null) ? req.body.phone_number : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "11", country_calling_code = "'+ country_calling_code +'", country_calling_id = "'+ country_calling_id +'", phone_number = "'+ phone_number +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'country_calling_code' : country_calling_code,
				'country_calling_id' : country_calling_id,
				'phone_number' : phone_number,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.update_profile_job_type = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var job_type = (req.body.job_type != undefined && req.body.job_type != null) ? req.body.job_type : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "14", job_type = "'+ job_type +'" WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'job_type' : job_type,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_profile_project = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		
		var title             = (req.body.title != undefined && req.body.title != null) ? req.body.title : "";
		var description       = (req.body.description != undefined && req.body.description != null) ? req.body.description : "";
		var link              = (req.body.link != undefined && req.body.link != null) ? req.body.link : "";
		var project_duration  = (req.body.project_duration != undefined && req.body.project_duration != null) ? req.body.project_duration : "";
		var project_id        = (req.body.project_id != undefined && req.body.project_id != null) ? req.body.project_id : "";
		var user_id           = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		
		if (project_id == -1) {
			var data = {
				"title" : title,
				"description" : description,
				"link" : link,
				"project_start_date" : project_duration[0],
				"project_end_date" : project_duration[1],
				"student_id" : user_id
			}

			var sqlQuery = 'INSERT INTO student_project SET ? ';
			// var data = [ company_name, job_title, location, country, from_month, from_year, to_month, to_year, job_description, user_id  ];
			db.query(sqlQuery, data, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					var updateUser = 'UPDATE user_account SET profile_completed = "12" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						let resultset = {
							"title" : title,
							"description" : description,
							"link" : link,
							"project_start_date" : project_duration[0],
							"project_end_date" : project_duration[1],
							"student_project_id" : result.insertId,
							"user_id" : user_id,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				}
			});
		} else {
			var sqlQuery = 'UPDATE student_project SET title = "'+ title +'", description = "'+ description +'", link = "'+ link +'", project_start_date = "'+ project_duration[0] +'", project_end_date = "'+ project_duration[1] +'" WHERE student_id = "'+ user_id +'" AND student_project_id = "'+project_id+'" ';
			db.query(sqlQuery, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var updateUser = 'UPDATE user_account SET profile_completed = "12" WHERE user_account_id = "'+user_id+'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					let resultset = {
						"title" : title,
						"description" : description,
						"link" : link,
						"project_start_date" : project_duration[0],
						"project_end_date" : project_duration[1],
						"student_project_id" : project_id,
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

module.exports.get_project_details = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var project_id = (req.body.project_id != undefined && req.body.project_id != null) ? req.body.project_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		if(project_id!= ""){
			db.query('SELECT * FROM student_project WHERE student_id = "'+user_id+'" AND student_project_id = "'+project_id+'"', function (err, result, fields) {
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

module.exports.delete_project = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var project_id = (req.body.project_id != undefined && req.body.project_id != null) ? req.body.project_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'DELETE  FROM student_project WHERE student_id = "'+user_id+'" AND student_project_id = "'+project_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { }
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_license_certificate = function (req, res, next) {
//	if (Object.keys(req.body).length > 0) {
	var uploaded_document = "";
	if(req.file!= undefined){
		if(req.file.path != undefined ){
				//uploaded_document = (req.file.path).trim();
				uploaded_document = req.file.path.replace(/\\/g, "/");
			}
		}
		var type                = (req.body.type != undefined && req.body.type != null) ? req.body.type : "";
		var title               = (req.body.title != undefined && req.body.title != null) ? req.body.title : "";
		var description         = (req.body.description != undefined && req.body.description != null) ? req.body.description : "";
		var provider            = (req.body.provider != undefined && req.body.provider != null) ? req.body.provider : "";
		var link                = (req.body.link != undefined && req.body.link != null) ? req.body.link : "";
		var date_earned         = (req.body.date_earned != undefined && req.body.date_earned != null) ? req.body.date_earned : "";
		var date_expirty        = (req.body.date_expirty != undefined && req.body.date_expirty != null) ? req.body.date_expirty : "";
		var lic_certificate_id  = (req.body.license_certificate_id != undefined && req.body.license_certificate_id != null) ? req.body.license_certificate_id : "";
		var user_id             = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		if (lic_certificate_id == -1) {
			var data = {
				"type": type,
				"certificate_name": title,
				"description": description,
				"provider": provider,
				"certificate_link": link,
				"date_earned": date_earned,
				"date_ended": date_expirty,
				"student_id" : user_id,
				"uploaded_document" : uploaded_document,
			}

			var sqlQuery = 'INSERT INTO student_certificate SET ? ';
			db.query(sqlQuery, data, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					var updateUser = 'UPDATE user_account SET profile_completed = "13" WHERE user_account_id = "'+user_id+'"';
					db.query(updateUser, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
						let resultset = {
							"type" : type,
							"certificate_name" : title,
							"description" : description,
							"provider" : provider,
							"certificate_link" : link,
							"date_earned" : date_earned,
							"date_ended" : date_expirty,
							"user_id" : user_id,
						}
						
						return res.status(200).send({ status: 200, data: resultset });
					});
				}
			});
		} else {
			var additional_parameter = "";
			if(uploaded_document!= ""){
				additional_parameter = ' , uploaded_document = "'+ uploaded_document +'"  ';
			}
			
			var sqlQuery = 'UPDATE student_certificate SET type = "'+ type +'", description = "'+ description +'", certificate_name = "'+ title +'", provider = "'+ provider +'", certificate_link = "'+ link  +'", date_earned = "'+ date_earned +'", date_ended = "'+ date_expirty +'"  '+ additional_parameter +'  WHERE student_id = "'+ user_id +'" AND student_certificate_id = "'+lic_certificate_id+'" ';
			db.query(sqlQuery, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				var updateUser = 'UPDATE user_account SET profile_completed = "13" WHERE user_account_id = "'+user_id+'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					let resultset = {
						"type" : type,
						"certificate_name" : title,
						"description" : description,
						"provider" : provider,
						"certificate_link" : link,
						"date_earned" : date_earned,
						"date_ended" : date_expirty,
						"user_id" : user_id,
					}
					
					return res.status(200).send({ status: 200, data: resultset });
				});
			});
		}
	/*}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} */
}

module.exports.get_license_certificate_details = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var lic_certificate_id = (req.body.lic_certificate_id != undefined && req.body.lic_certificate_id != null) ? req.body.lic_certificate_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		if(lic_certificate_id!= ""){
			db.query('SELECT * FROM student_certificate WHERE student_id = "'+user_id+'" AND student_certificate_id = "'+lic_certificate_id+'"', function (err, result, fields) {
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

module.exports.delete_license_certificate = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var lic_certificate_id = (req.body.lic_certificate_id != undefined && req.body.lic_certificate_id != null) ? req.body.lic_certificate_id : "";
		var user_id      = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var updateUser = 'DELETE  FROM student_certificate WHERE student_id = "'+user_id+'" AND student_certificate_id = "'+lic_certificate_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { }
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.get_skills = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var skill_id = (req.body.skill_id != undefined && req.body.skill_id != null) ? req.body.skill_id : "";
		var where_clause ='';
		if(skill_id!= "-1"){
			where_clause =" WHERE skill_id = '"+skill_id+"'";
		} 
		
		var select = "SELECT skill_id as id, skill_name as name FROM skill" + where_clause;
		console.log("select ", select);
		db.query(select, function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });

			return res.status(200).send({ status: 200, data: result });
		});
		
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}


module.exports.add_update_profile_photo = function (req, res, next) {
	/*if (Object.keys(req.body).length > 0) {*/
		var profile_photo = "";
		if(req.file!= undefined){
			if(req.file.path != undefined ){
				//profile_photo = (req.file.path).trim();
				profile_photo = req.file.path.replace(/\\/g, "/");
			}
		}
		// var profile_photo = (req.body.profile_photo != undefined && req.body.profile_photo != null) ? req.body.profile_photo : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		console.log("profile_photo ", profile_photo);
		var updateUser = "UPDATE user_account SET profile_completed = '9', profile_photo = '"+ profile_photo +"' WHERE user_account_id = '"+user_id + "' ";
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'profile_photo' : profile_photo,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	/*}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} */
}

module.exports.update_profile_job_location_preference = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var location_preference = (req.body.location_preference != undefined && req.body.location_preference != null) ? req.body.location_preference : "";
		var location_preference_name = (req.body.location_preference_name != undefined && req.body.location_preference_name != null) ? req.body.location_preference_name : "";
		
		var location_preference_id = (req.body.location_preference_id != undefined && req.body.location_preference_id != null) ? req.body.location_preference_id : "";
		
		var prefered_country_id = (req.body.prefered_country_id != undefined && req.body.prefered_country_id != null) ? req.body.prefered_country_id : "";
		var prefered_country = (req.body.prefered_country != undefined && req.body.prefered_country != null) ? req.body.prefered_country : "";
		var prefered_state_id = (req.body.prefered_state_id != undefined && req.body.prefered_state_id != null) ? req.body.prefered_state_id : "";
		var prefered_state = (req.body.prefered_state != undefined && req.body.prefered_state != null) ? req.body.prefered_state : "";
		/*var prefered_street_address = (req.body.prefered_street_address != undefined && req.body.prefered_street_address != null) ? req.body.prefered_street_address : "";
		var prefered_zipcode = (req.body.prefered_zipcode != undefined && req.body.prefered_zipcode != null) ? req.body.prefered_zipcode : "";*/
		
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "6", location_preference = "'+ location_preference +'", location_preference_id = "'+ location_preference_id +'", location_preference_name = "'+ location_preference_name +'", prefered_country_id = "'+ prefered_country_id +'", prefered_country = "'+ prefered_country +'", prefered_state_id = "'+ prefered_state_id +'", prefered_state = "'+ prefered_state +'"  WHERE user_account_id = "'+user_id+'"'; 
		/*, prefered_street_address = "'+ prefered_street_address +'", prefered_zipcode = "'+ prefered_zipcode +'"*/
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				"location_preference" : location_preference,
				"location_preference_name" : location_preference_name,
				"prefered_country_id" : prefered_country_id,
				"prefered_country" : prefered_country,
				"prefered_state_id" : prefered_state_id,
				"prefered_state" : prefered_state,
			/*	"prefered_street_address" : prefered_street_address,
			"prefered_zipcode" : prefered_zipcode,*/
		}
		
		return res.status(200).send({ status: 200, data: resultset });
	});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}


module.exports.update_profile_timeline_hiring = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var timeline_hiring = (req.body.timeline_hiring != undefined && req.body.timeline_hiring != null) ? req.body.timeline_hiring : "";
		var timeline_hiring_weeks = (req.body.timeline_hiring_weeks != undefined && req.body.timeline_hiring_weeks != null) ? req.body.timeline_hiring_weeks : "";
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET profile_completed = "6", timeline_hiring = "'+ timeline_hiring +'", timeline_hiring_weeks = "'+ timeline_hiring_weeks +'"  WHERE user_account_id = "'+user_id+'"';
		db.query(updateUser, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });
			
			let resultset = { 
				'timeline_hiring' : timeline_hiring,
				'timeline_hiring_weeks' : timeline_hiring_weeks,
			}
			
			return res.status(200).send({ status: 200, data: resultset });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.remove_job_description = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var updateUser = 'UPDATE user_account SET uploaded_jd = ""  WHERE user_account_id = "'+user_id+'"';
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

module.exports.get_job_profile = function (req, res, next) {
	db.query("SELECT id, profile_name FROM job_profiles", function (err, result, fields) {
		if (err) return res.status(200).send({ status: 500, data: err });
		return res.status(200).send({ status: 200, data: result });
	});
}

module.exports.get_all_industries = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var access_type  = (req.body.access_type != undefined && req.body.access_type != null) ? req.body.access_type : "";
		db.query("SELECT id, industry_name as name FROM industry WHERE access_type = '"+ access_type +"'", function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });

			return res.status(200).send({ status: 200, data: result });
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}


module.exports.change_password = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		var old_pass = (req.body.old_pass != undefined && req.body.old_pass != null) ? req.body.old_pass : "";
		var new_pass = (req.body.new_pass != undefined && req.body.new_pass != null) ? req.body.new_pass : "";
		var user_select_query = "SELECT * FROM user_account WHERE user_account_id = '" + user_id + "' ";
		
		db.query(user_select_query, function (err, resultset, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			console.log("otp ", resultset[0]['password'])
			console.log("new pass  ", md5(old_pass))
			if(resultset[0]['password'] == md5(old_pass)){
				var updateUser = 'UPDATE user_account SET is_registered_complete = "1", password = MD5("' + new_pass + '") WHERE user_account_id = "'+ user_id +'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					
					var full_name = resultset[0]['first_name'] + ' ' + resultset[0]['last_name'];
					email_functions.password_changed(full_name, resultset[0]['email_id'], (response)=>{
						console.log("response ", response);
						if(response == true){
							return res.status(200).send({ status: 200, data: resultset });
						} else{
							return res.status(500).send({ code: 600, msg: 'Unable to send email' });
						}
					});
					
				});	
			} else {
				return res.status(200).send({ code: 600, msg: 'Password Doesnt Match', data : [] });
			}
			
		});
		
		
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.forgot_password = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var email_id  = (req.body.email_id != undefined && req.body.email_id != null) ? req.body.email_id : "";
		var temp_password = (req.body.temp_pass != undefined && req.body.temp_pass != null) ? req.body.temp_pass : "";
		
		var user_select_query = "SELECT * FROM user_account WHERE email_id = '" + email_id + "' ";
		db.query(user_select_query, function (err, resultset, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			if(resultset.length > 0){
				var updateUser = 'UPDATE user_account SET is_registered_complete = "0", password = MD5("' + temp_password + '") WHERE email_id = "'+ email_id +'"';
				db.query(updateUser, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });
					var full_name = resultset[0]['first_name'] + ' ' + resultset[0]['last_name'];
					email_functions.forgot_password_mail(full_name, email_id, temp_password, (response)=>{
						console.log("response ", response);
						if(response == true){
							return res.status(200).send({ status: 200, data: resultset });
						} else{
							return res.status(500).send({ code: 600, msg: 'Unable to send email' });
						}
					});
				});	
			} else {
				return res.status(200).send({ code: 600, msg: 'Email Address Invalid', data : [] });
			}
			
		});
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.validate_temp_password = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var temp_password = (req.body.temp_password != undefined && req.body.temp_password != null) ? req.body.temp_password : "";
		if(temp_password!= ""){
			var check_passowrd = md5(temp_password);
			db.query("SELECT user_account_id, email_id FROM user_account WHERE password = '"+ check_passowrd +"' LIMIT 1", function (err, result, fields) {
				if (err) return res.status(200).send({ status: 500, data: err });

				return res.status(200).send({ status: 200, data: result });
			});
		} else {
			return res.status(200).send({ code: 600, msg: 'Temporary password cannot be blank.' });
		}
	}  else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}