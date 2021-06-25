var express = require("express");
const app = express();
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

module.exports.send_test_mail = async function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var to_email  = (req.body.to_email != undefined && req.body.to_email != null) ? req.body.to_email : "";
		
		const transporter = nodemailer.createTransport({
			host: constants.smtp_host,
			port: constants.smtp_port,
			secure: false,
			requireTLS: true,
			auth: {
				user: constants.smtp_user,
				pass: constants.smtp_pass
			}
		});
		
		let mail_data = {
			from: constants.smtp_username,
			to: to_email,
			subject: 'Test Mail',
			html: '<h1>Example HTML Message Body</h1>'
		};

		await transporter.sendMail(mail_data, (error, info) => {
			if (error) {
				console.log(error.message);
				return res.status(500).send({ code: 600, msg: 'Unable to send email' });
			} else {
				console.log('success');
				return res.status(200).send({ code: 200, msg: 'Mail Sent Successfully' });
			}
		});
	} else {
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	}
}

module.exports.send_test_mail_with_body = function (req, res, next) {
	email_functions.send_registration_mail("James Bond", "j.meenesh@gmail.com", "absdf1234556adasd", (response)=>{
		console.log("response ", response);
		if(response == true){
			return res.status(200).send({ code: 200, msg: 'Mail Sent Successfully' });
			
		} else{
			
			return res.status(500).send({ code: 600, msg: 'Unable to send email' });
		}
	});
	
}

module.exports.remove_user_with_data = function (req, res, next) {
	if (Object.keys(req.body).length > 0) {
		var user_id  = (req.body.user_id != undefined && req.body.user_id != null) ? req.body.user_id : "";
		
		var user_account_query = " DELETE FROM user_account WHERE user_account_id = '"+user_id+"'";
		var student_category_query =  "DELETE FROM student_category WHERE student_id = '"+user_id+"'"
		var student_expertise_query = " DELETE FROM student_certificate WHERE student_id = '"+user_id+"'";
		var student_education_query = " DELETE FROM student_education WHERE student_id = '"+user_id+"'";
		var student_experience_query = " DELETE FROM student_experience WHERE student_id = '"+user_id+"'";
		var student_languages_query = " DELETE FROM student_languages WHERE student_id = '"+user_id+"'";
		var student_project_query = " DELETE FROM student_project WHERE student_id = '"+user_id+"'";
		var student_certificate_query = " DELETE FROM student_record WHERE student_id = '"+user_id+"'";
		
		db.query(user_account_query + ";" + student_category_query + ";" + student_expertise_query + ";" + student_education_query + ";" + student_experience_query + ";" + student_languages_query + ";" + student_project_query + ";" + student_certificate_query, function (err, result, fields) {
			if (err) return res.status(200).send({ status: 500, data: err });
			 
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
		return res.status(200).send({ code: 600, msg: 'No Parameter Passed' });
	} 
}
