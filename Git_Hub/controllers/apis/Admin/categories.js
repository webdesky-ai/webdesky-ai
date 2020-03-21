/********
* user.js file (controllers/apis)
********/


const express = require('express');

// const userRestrationService = require('../../services/users/user_registration.js');
const Adminservices = require('../../../services/Admin/categories.js');

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


router.post('/categories', upload.array('profiles', 5), Adminservices.Create_Categories);
router.post('/sub_categories', upload.array('profiles', 5), Adminservices.sub_Create_Categories);
router.post('/child_sub_categories', upload.array('profiles', 5), Adminservices.child_sub_Create_Categories);

router.post('/Course_categories', upload.array('profiles', 5), Adminservices.Master_Course_Categories);
module.exports = router;