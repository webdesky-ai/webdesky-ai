/********
* v1.js file (inside routes/apis)
********/

// const userController = require('../../controllers/apis/user');
const userController = require('../../controllers/apis/user_registration');
const AdminController = require('../../controllers/apis/Admin/categories.js');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
router.use('/Admin', AdminController);
module.exports = router;