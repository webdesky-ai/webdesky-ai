/********
* index.js file (inside routes/apis)
********/

const express = require('express');
const v1ApiController = require('./v1');
let router = express.Router();
router.use('/v1', v1ApiController);
module.exports = router;

// const app = express();

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });