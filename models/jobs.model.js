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

module.exports.get_job_posting = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var search = (req.body.search != undefined && req.body.search != null) ? req.body.search : "";
		var job_id = (req.body.job_id != undefined && req.body.job_id != null) ? req.body.job_id : "";
		var company_id = (req.body.company_id != undefined && req.body.company_id != null) ? req.body.company_id : "";
		var data_type = (req.body.data_type != undefined && req.body.data_type != null) ? req.body.data_type : "";
		var where_and = '';
 
		if (job_id != '') {
			where_and = ' AND jp.id = "' + job_id +'" ';
		}
		
		var sql = `SELECT jp.*, category.name as category_name, job_profiles.profile_name  FROM job_posting as jp
		LEFT JOIN category on category.category_id = jp.category
		LEFT JOIN job_profiles on job_profiles.id = jp.job_profile_id
		WHERE company_id = '` + company_id +`'  ` + where_and;
	 	db.query(sql, function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			var result_set = result;
			if (data_type == 'h') {
				for (let result of result_set) {
					delete result.candidate_language;
					delete result.industry_id;
					delete result.skills_list;
					result['date_created'] = common_functions.get_formatted_date(result['date_created'], 2, '/');
					result['date_updated'] = common_functions.get_formatted_date(result['date_updated'], 2, '/');
					
				}
				return res.status(200).send({ status: 200, data: result_set });
			} else if (data_type == 'd') {
				db.query('SELECT * FROM job_posting_questions WHERE job_id = "' + job_id + '"', function (err, question_result, fields) {
					if (err) return res.status(200).send({ status: 500, data: err });
					result_set[0]['question_list'] = question_result;
					for (let result of result_set) {
						result.candidate_language =  (result.candidate_language!= "" && result.candidate_language!= null) ? JSON.parse(result.candidate_language) : []; 
						result.industry_id =  (result.industry_id!= "" && result.industry_id!= null) ? JSON.parse(result.industry_id) : []; 
						result.skills_list =  (result.skills_list!= "" && result.skills_list!= null) ? JSON.parse(result.skills_list) : []; 
						
						result['date_created'] = common_functions.get_formatted_date(result['date_created'], 2, '/');
						result['date_updated'] = common_functions.get_formatted_date(result['date_updated'], 2, '/');
					}
				
					return res.status(200).send({ status: 200, data: result_set });
					/* db.query('SELECT * FROM job_posting_hashtags WHERE job_id = "' + job_id + '"', function (err, skills_result, fields) {
						if (err) return res.status(200).send({ status: 500, data: err });
						result_set[0]['skill_expertise_list'] = skills_result;
						
					}); */
				});
			}

		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}

module.exports.add_update_job_posting = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		let dataset = req.body;
		let industry = (dataset.industry != undefined) ? JSON.stringify(dataset.industry) : '';
		let skills = (dataset.skills != undefined) ? JSON.stringify(dataset.skills) : '';
		let candidate_language = (dataset.candidate_language != undefined) ? JSON.stringify(dataset.candidate_language) : '';

		if (dataset.job_id == 0) {
			var posting_data = {
				company_id: dataset.company_id,
				job_title: dataset.job_title,
				job_description: dataset.job_desc,
				candidate_required_description: dataset.candidate_req_details,
				expert_level: dataset.expert_level,
				location_country_id: dataset.job_country_id,
				location_country: dataset.job_country_name,
				category: dataset.category_id,
				job_profile_id: dataset.profile_id,
				industry_id: industry,
				skills_list: skills,
				rate_type: dataset.rate_type,
				hourly_rate_from : dataset.hourly_rate_from,
				hourly_rate_to : dataset.hourly_rate_to,
				fixed_rate: dataset.fixed_rate,
				project_type: dataset.project_type,
				project_status: dataset.project_status,
				project_length: dataset.project_length,
				candidate_required_type: dataset.candidate_type,
				total_candidate_required: dataset.candidate_required_id,
				minimum_hours_from_candidate: dataset.minimum_hours_from_candidate,
				candidate_country_id: dataset.candidate_country_id,
				candidate_country_name: dataset.candidate_country_name,
				candidate_city_id: dataset.candidate_city_id,
				candidate_city_name: dataset.candidate_city_name,
				candidate_state_id: dataset.candidate_state_id,
				candidate_state_name: dataset.candidate_state_name,
				candidate_language: candidate_language,
				job_status: dataset.status,
				job_preference: dataset.job_preference,
				department: dataset.department,
				hashtags : '',
				date_created: new Date(),
				date_updated: new Date(),
			}

			var job_posting_query = 'INSERT INTO job_posting SET ? ';
			db.query(job_posting_query, posting_data, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				if (result.insertId > 0) {
					let inserted_job_id = result.insertId;
					let resultset = dataset;
				 if (dataset.question_list.length > 0) {
						var job_posting_ques_query = 'INSERT INTO job_posting_questions (job_id, question, mandatory) VALUES ?';
						let ques_data = [];
						for (let questions of dataset.question_list) {
							ques_data.push([inserted_job_id, questions['question'], questions['mandatory']])
						}
						 db.query(job_posting_ques_query, [ques_data], function (error, result, fields) {
							if (error) return res.status(500).send({ status: 600, msg: error.message });
						});
					}
					
				/* 	if (dataset.skill_expertise_list.length > 0) {
						var job_posting_skill_query = 'INSERT INTO job_posting_hashtags (job_id, heading, multiple_hastags) VALUES ?';
						let skill_data = [];
						for (let skill_expertise of dataset.skill_expertise_list) {
							skill_data.push([inserted_job_id, skill_expertise['heading'], skill_expertise['multiple_hastags']])
						}
						 db.query(job_posting_skill_query, [skill_data], function (error, result, fields) {
							if (error) return res.status(500).send({ status: 600, msg: error.message });
						});
					} */
					return res.status(200).send({ status: 200, data: resultset });
				}					
			});
		} else {
			var update_query = `UPDATE job_posting SET company_id= '` + dataset.company_id + `', job_title= '` + dataset.job_title + `', job_description= '` + dataset.job_desc + `', candidate_required_description= '` + dataset.candidate_req_details + `', expert_level= '` + dataset.expert_level + `', location_country_id= '` + dataset.job_country_id + `', location_country= '` + dataset.job_country_name + `', category= '` + dataset.category_id + `', job_profile_id= '` + dataset.profile_id + `', industry_id= '` + industry + `', skills_list= '` + skills + `', rate_type= '` + dataset.rate_type + `', hourly_rate_from = '` + dataset.hourly_rate_from + `', hourly_rate_to = '` + dataset.hourly_rate_to + `', fixed_rate= '` + dataset.fixed_rate + `', project_type= '` + dataset.project_type + `', project_status= '` + dataset.project_status + `', project_length= '` + dataset.project_length + `', candidate_required_type= '` + dataset.candidate_type + `', total_candidate_required= '` + dataset.candidate_required_id + `', minimum_hours_from_candidate= '` + dataset.minimum_hours_from_candidate + `', candidate_country_id= '` + dataset.candidate_country_id + `', candidate_country_name= '` + dataset.candidate_country_name + `', candidate_city_id= '` + dataset.candidate_city_id + `', candidate_city_name= '` + dataset.candidate_city_name + `', candidate_state_id= '` + dataset.candidate_state_id + `', candidate_state_name= '` + dataset.candidate_state_name + `', candidate_language= '` + candidate_language + `', job_status= '` + dataset.status + `', job_preference= '` + dataset.job_preference + `', department = '` + dataset.department  + `', date_updated= now() WHERE id = '` + dataset.job_id + `'`;
			console.log(`update_query `, update_query)
			db.query(update_query, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });
				
				if (dataset.question_list.length > 0) {
					var delete_job_posting = 'DELETE FROM job_posting_questions WHERE job_id = "' + dataset.job_id + '"';
					db.query(delete_job_posting, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
					});
					
					var job_posting_ques_query = 'INSERT INTO job_posting_questions (job_id, question, mandatory) VALUES ?';
					let ques_data = [];
					for (let questions of dataset.question_list) {
						ques_data.push([dataset.job_id, questions['question'], questions['mandatory']])
					}
					db.query(job_posting_ques_query, [ques_data], function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
					});
				}

				/* if (dataset.skill_expertise_list.length > 0) {
					var delete_job_posting = 'DELETE FROM job_posting_hashtags WHERE job_id = "' + dataset.job_id + '"';
					db.query(delete_job_posting, function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
					});
					
					var job_posting_skill_query = 'INSERT INTO job_posting_hashtags (job_id, heading, multiple_hastags) VALUES ?';
					let skill_data = [];
					for (let skill_expertise of dataset.skill_expertise_list) {
						skill_data.push([dataset.job_id, skill_expertise['heading'], skill_expertise['multiple_hastags']])
					}
					db.query(job_posting_skill_query, [skill_data], function (error, result, fields) {
						if (error) return res.status(500).send({ status: 600, msg: error.message });
					});
				} */
				
					return res.status(200).send({ status: 200, data: [] });

			});
		}

	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	}
}

module.exports.delete_job_posting = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var job_id = (req.body.job_id != undefined && req.body.job_id != null) ? req.body.job_id : "";
		var delete_query = 'DELETE  FROM job_posting WHERE id = "' + job_id + '"';
		db.query(delete_query, function (error, result, fields) {
			if (error) return res.status(500).send({ status: 600, msg: error.message });

			var delete_query = 'DELETE  FROM job_posting_questions WHERE job_id = "' + job_id + '"';
			db.query(delete_query, function (error, result, fields) {
				if (error) return res.status(500).send({ status: 600, msg: error.message });

			/* 	var delete_query = 'DELETE  FROM job_posting_hashtags WHERE job_id = "' + job_id + '"';
				db.query(delete_query, function (error, result, fields) {
					if (error) return res.status(500).send({ status: 600, msg: error.message });

					
				}); */
				let resultset = {}
				return res.status(200).send({ status: 200, data: resultset });
			});
		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	}
}

