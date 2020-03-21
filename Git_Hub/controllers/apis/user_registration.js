/********
* user.js file (controllers/apis)
********/


const express = require('express');

const userRestrationService = require('../../services/users/user_registration.js');

let router = express.Router();

var multer = require('multer');
var upload = multer({dest:'uploads/'});


 var userprofileimage = multer.diskStorage({
    destination: function(req, file, cb) { 
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
      //  cb(null , file.originalname);
      cb( null, file.originalname);
      Filename = file.originalname
    }
});
upload = multer({ storage : userprofileimage}, {limits: {fileSize : 5 * 1000000}});


//router.post('/registration', userRestrationService.UserRester);
// router.post('/userlogin', userRestrationService.userlogin);
router.post('/registration', upload.array('profiles', 5), userRestrationService.UserResteration);
router.post('/userlogin',upload.array('profiles', 5), userRestrationService.userlogin);
router.post('/forgotpassword',upload.array('profiles', 5), userRestrationService.forgatepassword);
router.post('/forgotpassword',upload.array('profiles', 5), userRestrationService.forgatepassword);
router.post('/ChangePassword',upload.array('profiles', 5), userRestrationService.ChangePassword);
router.post('/comparelink',upload.array('profiles', 5), userRestrationService.comparelink);
router.post('/UpdateProfile',upload.array('profiles', 5), userRestrationService.UpdateProfiledata);

router.post('/mastercategory', upload.array('profiles', 5), userRestrationService.mastercategory);
router.post('/sub_mastercategory',upload.array('profiles', 5), userRestrationService.submastercategory);
router.post('/sub_sub_mastercategory', upload.array('profiles', 5), userRestrationService.sub_sub_mastercategory);

 router.post('/Get_mastercategory', upload.array('profiles', 5), userRestrationService.Get_mastercategory);
 router.post('/Get_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Get_submastercategory);
 router.post('/Get_sub_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Get_sub_submastercategory);

 router.post('/Update_mastercategory', upload.array('profiles', 5), userRestrationService.Update_mastercategory);
 router.post('/Update_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Update_submastercategory);
 router.post('/Update_sub_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Update_sub_submastercategory);

 router.post('/delete_mastercategory', upload.array('profiles', 5), userRestrationService.Delete_mastercategory);
 router.post('/delete_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Delete_submastercategory);
 router.post('/delete_sub_sub_mastercategory', upload.array('profiles', 5), userRestrationService.Delete_sub_submastercategory);

router.post('/getuser',upload.array('profiles', 5), userRestrationService.Getuser); 

router.post('/Active&deactive', upload.array('profiles', 5), userRestrationService.Activedeactive);



module.exports = router;


// html: '<h2><a href="http://192.168.1.80:4200/forgotpasswordlink/'+encryptedString+'/'+encriptdate+'/'+encriptdate1+'">http://192.168.1.80:4200/forgotpassword/'+encryptedString+'/'+encriptdate+'/'+encriptdate1+'</a></h2>'// plain text body

// var encryptedString = cryptr.encrypt(userId);
// var encriptdate = cryptr.encrypt(data);
// var encriptdate1 = cryptr.encrypt(data1);

// var  data = moment().format('YYYY-MM-DD');
// var data1 = moment().format('HH:mm:ss');