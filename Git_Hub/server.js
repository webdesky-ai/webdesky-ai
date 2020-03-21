/*******
* server.js file
********/ 

const server = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');

const bodyparser = require('body-parser');

//create the basic server setup
  server.create(config,db);

// Start the server
  server.start();




