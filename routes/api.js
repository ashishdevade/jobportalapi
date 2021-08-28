var express = require('express');
const app = express();
var router = express.Router();
var multer = require('multer')
var path = require('path')
// Constants - start 
var constants = require('../config/constants');
// Constants - end 

// Models - start 
var userModel = require('../models/user.model');
var adminModel = require('../models/admin.model');
var testModel = require('../models/test.model');
// Models - end
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  limit: "50000mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50000mb"}));


router.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname == "profile_picture") {
      callback(null, constants.image_folder + 'profile_picture')
    } else if (file.fieldname == "license_document") {
      callback(null, constants.upload_folder + 'license_document')
    } else if (file.fieldname == "uploaded_jd") {
      callback(null, constants.upload_folder + 'job_description')
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var uploads = multer({ storage: storage });



/////////////////// ------------------ ///////////////
/////////////////// Common API Start ///////////////

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/media/:filename", function (req, res) {
  res.sendFile('/media/' + req.params.filename, { root: "./" });
});

router.get("/" + constants.image_folder + ":foldername/:filename", function (req, res) {
  res.sendFile('/' + constants.image_folder + req.params.foldername + '/' + req.params.filename, { root: "./" });
});

router.get("/" + constants.upload_folder + ":foldername/:filename", function (req, res) {
  res.sendFile('/' + constants.upload_folder + req.params.foldername + '/' + req.params.filename, { root: "./" });
});

router.get('/user/get_all_users/', userModel.get_user_list, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/validate_login', userModel.validate_login, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/register_user', userModel.register_user, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_user_profile_settings', userModel.get_user_profile_settings, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_all_categories', userModel.get_all_categories, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_all_subcategories', userModel.get_all_subcategories, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_category', userModel.update_profile_category, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_expertise', userModel.update_profile_expertise, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_expertise_level', userModel.update_profile_expertise_level, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/add_update_profile_education', userModel.add_update_profile_education, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/skip_this_step', userModel.skip_this_step, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/delete_education', userModel.delete_education, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_education_details', userModel.get_education_details, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_countries', userModel.get_countries, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_states', userModel.get_states, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_cities', userModel.get_cities, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_calling_code', userModel.get_calling_code, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/add_update_profile_employment', userModel.add_update_profile_employment, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_employment_details', userModel.get_employment_details, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/delete_employment', userModel.delete_employment, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_language_list', userModel.get_language_list, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/add_update_profile_language', userModel.add_update_profile_language, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/add_update_profile_hourlyrate', userModel.add_update_profile_hourlyrate, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

/*router.post('/user/add_update_profile_title_overview', userModel.add_update_profile_title_overview, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});*/

router.post('/user/add_update_profile_title_overview/',uploads.single('uploaded_jd'),  userModel.add_update_profile_title_overview, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/add_update_profile_location', userModel.add_update_profile_location, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});


router.post('/user/add_update_profile_phone', userModel.add_update_profile_phone, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_job_type', userModel.update_profile_job_type, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});


router.post('/user/add_update_profile_project', userModel.add_update_profile_project, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_project_details', userModel.get_project_details, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/delete_project', userModel.delete_project, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});


/*router.post('/user/add_update_license_certificate', userModel.add_update_license_certificate, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});*/

router.post('/user/add_update_license_certificate/',uploads.single('license_document'),  userModel.add_update_license_certificate, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});


router.post('/user/get_license_certificate_details', userModel.get_license_certificate_details, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/delete_license_certificate', userModel.delete_license_certificate, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_skills', userModel.get_skills, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

/*router.post('/user/add_update_profile_photo', userModel.add_update_profile_photo, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});
*/

router.post('/user/add_update_profile_photo/',uploads.single('profile_picture'),  userModel.add_update_profile_photo, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_job_location_preference', userModel.update_profile_job_location_preference, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/update_profile_timeline_hiring', userModel.update_profile_timeline_hiring, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/remove_job_description', userModel.remove_job_description, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_all_industries', userModel.get_all_industries, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/get_job_profile', userModel.get_job_profile, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/validate_temp_password', userModel.validate_temp_password, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/change_password', userModel.change_password, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/forgot_password', userModel.forgot_password, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});




// test Model

router.post('/test/send_test_mail', testModel.send_test_mail, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/test/send_test_mail_with_body', testModel.send_test_mail_with_body, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/test/remove_user_with_data', testModel.remove_user_with_data, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

// admin model 

router.post('/admin/admin_validate_login', adminModel.admin_validate_login, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/get_all_companies', adminModel.get_all_companies, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/get_all_candidate_users', adminModel.get_all_candidate_users, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/admin_user_change_password', adminModel.admin_user_change_password, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/update_admin_user_edit', adminModel.update_admin_user_edit, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/soft_delete_user', adminModel.soft_delete_user, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/get_all_masters_data', adminModel.get_all_masters_data, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/add_update_master_data', adminModel.add_update_master_data, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});

router.post('/admin/delete_master_data', adminModel.delete_master_data, function (req, res, callback) {
  // res.json({ status : res.status, message: res.message });
});


module.exports = router;