const nodemailer = require('nodemailer');
var constants = require('./constants');


exports.send_mail =  function(to_email, subject, html, callback){
	
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
	
	var mail_data = {
		from: constants.smtp_username,
		to: to_email,
		subject: subject,
		html: html
	};
	
	transporter.sendMail(mail_data, (error, info) => {
		if (error) {
			console.log("error - ", error);
			console.log("info - ", info);
			callback(false)
		} else {
			callback(true)
		}
	});
	
	
}

exports.send_registration_mail = function (username, email, temp_password, callback) {
	var subject = "Registered Successfully";
	var html_body = `
	<meta charset="UTF-8">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="telephone=no">

	<div style="padding: 15px; background-color: rgb(236, 236, 236); margin: 0px;">
	<div style="max-width: 430px; width: 100%; margin-right: auto; margin-left: auto;">
	<div class="sub-container" >
	<div style="margin-top: 10px; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">
	<div style="color: #48486a; padding: 5px 5px; font-weight: 400;">
	<div style="background-color: #ffffff;color: #48486a;padding: 5px 5px;border-bottom: 5px solid #007bff;">
	<div style="">
	<h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;color: #007bff;text-align: center;font-size: 22px;font-weight: 800 ;"><b>Zestboard App</b></h3>
	</div>
	<hr>
	<div style="">
	<h4 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;"><b>Hello `+username+`, </b> <br> <br> Welcome to Zestboard family! Thank you for signing up with us. <br><br> Please use this Email address and Password mentioned below to login into your account - </h4>
	</div>
	
	<table style="text-align: left; width: 100%; margin-left: 0%;">
	<tbody style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px ; ">
	<tr>
	<th style="color: #000000; width:30%; height: 30px;"><b>Name</b></th>
	<td> `+username+` </td>
	</tr>
	<tr>
	<th style="color: #000000; width:30%; height: 30px;">Email </th>
	<td> `+ email +` </td>
	</tr>
	<tr>
	<th style="color: #000000; width:30%; height: 30px;">Temp Password</th>
	<td>`+ temp_password +`<br></td>
	</tr>
	</tbody>
	</table>
	<br>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: flex; flex-wrap: wrap; text-align: center; margin: 0px auto;">
	<a href="http://18.116.55.85/app/#/auth/login" target="_blank" style="text-align: center; margin: 0 auto ;  display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle;
	cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; text-decoration: none;     color: #fff !important; background-color: #007bff; border-color: #007bff;	font-weight: 700;">Go to zestboard &#8594;</a>
	
	</div>
	<hr>
	<br>
	<p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;"> In case you face any issues with registration or logging in, please contact us at our {Email}. Our customer support team will be happy to help you with your queries.
	</p>
	<br>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: black ;"><b>Thanks & Regards,</b></p>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: #007bff ;"><b>Zestboard App</b></p></div></div></div>
	</div>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: -webkit-box; flex-wrap: wrap; text-align: center; width: 85%; margin: 0px auto; color: rgb(121, 121, 121); font-size: 12px; padding-top: 15px;">
	
	<p style="padding-top:10px; color: #000000; font-size: 13px; text-align: center; margin: 0 auto;">This message was mailed to [<a style="color: #007bff;" href="mailto:student@example.com" target="_blank">Student@example.com</a>] by Zestboard App as part of your Account. 
	
	<br> <br>
	{123-XYZ block area city zipcode} | <a style="color: #007bff;" href="mailto:contact@zestboard.com" target="_blank">contact@zestboard.com</a> | <a href="tel:123-456-7890" target="_blank" style="color: #007bff;">123-456-7890</a>
	</p>
	</div>
	</div>
	</div>`;
	
	this.send_mail(email, subject, html_body, (res)=>{
		return callback(res);	
	})
};

exports.forgot_password_mail = function(username, email, temp_password, callback) {
	var subject = "Forgot Password ";
	var html_body = `
	<meta charset="UTF-8">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="telephone=no">

	<div style="padding: 15px; background-color: rgb(236, 236, 236); margin: 0px;">
	<div style="max-width: 430px; width: 100%; margin-right: auto; margin-left: auto;">
	<div class="sub-container" >
	<div style="margin-top: 10px; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">
	<div style="color: #48486a; padding: 5px 5px; font-weight: 400;">
	<div style="background-color: #ffffff;color: #48486a;padding: 5px 5px;border-bottom: 5px solid #007bff;">
	<div style="">
	<h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;color: #007bff;text-align: center;font-size: 22px;font-weight: 800 ;"><b>Zestboard App</b></h3>
	</div>
	<hr>
	<div style="">
	<h4 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;"><b>Hello `+ username +`, </b> <br> <br> At your request, we are here to reset your password. <br><br> Please use the below temporary password  to login into your account - </h4>
	</div>
	<table style="text-align: left; width: 100%; margin-left: 0%;">
	<tbody style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px ; ">
	<tr>
	<th style="color: #000000; width:30%; height: 30px;">Temp. Password</th>
	<td>`+ temp_password +`<br></td>
	</tr>
	</tbody>
	</table>
	<br>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: flex; flex-wrap: wrap; text-align: center; margin: 0px auto;">
	<a href="http://18.116.55.85/app/#/auth/login" target="_blank" style="text-align: center; margin: 0 auto ;  display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle;
	cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; text-decoration: none;     color: #fff !important; background-color: #007bff; border-color: #007bff;	font-weight: 700;">Go to zestboard &#8594;</a>
	
	</div>
	<hr>
	<br>
	<p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;">
	Your account security is important to us. If any of the above information is inaccurate, please contact us using the information below.
	</p>
	<p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;"> In case you face any issues with registration or logging in, please contact us at our {Email}. Our customer support team will be happy to help you with your queries.
	</p>
	<br>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: black ;">Regards,</p>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: #007bff ;"><b>Zestboard </b></p></div></div></div>
	</div>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: -webkit-box; flex-wrap: wrap; text-align: center; width: 85%; margin: 0px auto; color: rgb(121, 121, 121); font-size: 12px; padding-top: 15px;">
	
	<p style="padding-top:10px; color: #000000; font-size: 13px; text-align: center; margin: 0 auto;">This message was mailed to [<a style="color: #007bff;" href="mailto:student@example.com" target="_blank">Student@example.com</a>] by Zestboard App as part of your Account. 
	
	<br> <br>
	{123-XYZ block area city zipcode} | <a style="color: #007bff;" href="mailto:contact@zestboard.com" target="_blank">contact@zestboard.com</a> | <a href="tel:123-456-7890" target="_blank" style="color: #007bff;">123-456-7890</a>
	</p>
	</div>
	</div>
	</div>


	`;
	
	this.send_mail(email, subject, html_body, (res)=>{
		return callback(res);	
	})
};

exports.password_changed = function(username, email, callback) {
	var subject = "Password Changed ";
	var html_body = `
	<meta charset="UTF-8">
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="telephone=no">

	<div style="padding: 15px; background-color: rgb(236, 236, 236); margin: 0px;">
	<div style="max-width: 430px; width: 100%; margin-right: auto; margin-left: auto;">
	<div class="sub-container" >
	<div style="margin-top: 10px; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">
	<div style="color: #48486a; padding: 5px 5px; font-weight: 400;">
	<div style="background-color: #ffffff;color: #48486a;padding: 5px 5px;border-bottom: 5px solid #007bff;">
	<div style="">
	<h3 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;color: #007bff;text-align: center;font-size: 22px;font-weight: 800 ;"><b>Zestboard App</b></h3>
	</div>
	<hr>
	<div style="">
	<h4 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;"><b>Dear `+ username +`, </b> <br> <br> We have detected an important activity on your account.  <br><br> A password has been changed successfully. </h4>
	</div>
	 
	<br>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: flex; flex-wrap: wrap; text-align: center; margin: 0px auto;">
	<a href="http://18.116.55.85/app/#/auth/login" target="_blank" style="text-align: center; margin: 0 auto ;  display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle;
	cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; text-decoration: none;     color: #fff !important; background-color: #007bff; border-color: #007bff;	font-weight: 700;">Go to zestboard &#8594;</a>
	
	</div>
	<hr>
	<br>
	<p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;">
	Your account security is important to us. If any of the above information is inaccurate, please contact us at [e-mail]. 
	</p>
	<p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;color: #48486a;text-align: left;font-size: 16px; font-weight: 500;">
	In case you face any issues with registration or logging in. please contact as at [e-mail] and our customer support team will be happy to help you with your queries. 
	</p>
	<br>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: black ;">Regards,</p>
	<p style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; color: #007bff ;"><b>Zestboard</b></p></div></div></div>
	</div>
	<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; display: -webkit-box; flex-wrap: wrap; text-align: center; width: 85%; margin: 0px auto; color: rgb(121, 121, 121); font-size: 12px; padding-top: 15px;">
	
	<p style="padding-top:10px; color: #000000; font-size: 13px; text-align: center; margin: 0 auto;">This message was mailed to [<a style="color: #007bff;" href="mailto:student@example.com" target="_blank">Student@example.com</a>] by Zestboard App as part of your Account. 
	
	<br> <br>
	{123-XYZ block area city zipcode} | <a style="color: #007bff;" href="mailto:contact@zestboard.com" target="_blank">contact@zestboard.com</a> | <a href="tel:123-456-7890" target="_blank" style="color: #007bff;">123-456-7890</a>
	</p>
	</div>
	</div>
	</div>


	`;
	
	this.send_mail(email, subject, html_body, (res)=>{
		return callback(res);	
	})
};
