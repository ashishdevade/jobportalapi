var express = require("express");
const app = express();
const { body, validationResult } = require('express-validator')
var db = require('../config/database');
var constants = require('../config/constants');
var common_functions = require('../config/common.function');
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