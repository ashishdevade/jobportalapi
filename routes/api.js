var express                 = require('express');
const app                   = express();
var router                  = express.Router();
var multer                  = require('multer')
var path                    = require('path')
// Constants - start 
var constants               = require('../config/constants');
// Constants - end 

var cors                          = require('cors')
// Models - start 
var userModel               = require('../models/user.model');
// Models - end

const bodyParser            = require('body-parser');


app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8945');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		if(file.fieldname == "image"){
			callback(null, constants.image_folder + 'business')
		} else if(file.fieldname == "upload" || file.fieldname == "upload"){
			callback(null, constants.image_folder + '')
		}
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var uploads = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////////////////// ------------------ ///////////////
/////////////////// Common API Start ///////////////

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get("/media/:filename", function(req, res){
	res.sendFile( '/media/'+ req.params.filename, {root : "./"});
});

router.get("/"+constants.image_folder+":foldername/:filename", function(req, res){
	res.sendFile( '/' + constants.image_folder + req.params.foldername +'/'+ req.params.filename, {root : "./"});
});

router.get('/user/get_all_users/', userModel.get_user_list, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/validate_login', userModel.validate_login, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/register_user', userModel.register_user, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_user_profile_settings', userModel.get_user_profile_settings, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_all_categories', userModel.get_all_categories, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 


router.post('/user/get_all_subcategories', userModel.get_all_subcategories, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 


router.post('/user/update_profile_category', userModel.update_profile_category, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/update_profile_expertise', userModel.update_profile_expertise, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/update_profile_expertise_level', userModel.update_profile_expertise_level, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_education', userModel.add_update_profile_education, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});

router.post('/user/skip_this_step', userModel.skip_this_step, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/delete_education', userModel.delete_education, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_education_details', userModel.get_education_details, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_countries', userModel.get_countries, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_calling_code', userModel.get_calling_code, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_employment', userModel.add_update_profile_employment, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_employment_details', userModel.get_employment_details, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/delete_employment', userModel.delete_employment, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/get_language_list', userModel.get_language_list, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_language', userModel.add_update_profile_language, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_hourlyrate', userModel.add_update_profile_hourlyrate, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_title_overview', userModel.add_update_profile_title_overview, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
}); 

router.post('/user/add_update_profile_location', userModel.add_update_profile_location, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});


router.post('/user/add_update_profile_phone', userModel.add_update_profile_phone, function(req, res, callback){
  // res.json({ status : res.status, message: res.message });
});

 
module.exports = router;