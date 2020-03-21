
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const express = require('express');
const app = express();

var path = require('path');

// app.use(cors());

module.exports = function() {

    let server = express(), 
                 create,
                 start;

        create = (config,db) => {
            let routes = require('../routes');

            // set all the server things
              server.set('env', config.env);
              server.set('port', config.port);
              server.set('hostname', config.hostname);

              // app.use(cors({
              //   'Access-Control-Allow-Origin' :'*',
              //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Access-Control-Allow-Methods, Accept, offline, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
              //   'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
              //   'Content-Type': 'application/json',
              //   'Accept':'*',
              // }));

              // app.use(function(req, res, next) {
              //   res.header("Access-Control-Allow-Origin", "*");
              //   res.header("Access-Control-Allow-Methods", "*");
              //   res.header("Access-Control-Allow-Headers", "Host, User-Agent, Accept-Language, Accept-Encoding, Access-Control-Request-Method, Access-Control-Request-Headers, Referer, DNT, Connection,Origin, X-Requested-With, Content-Type, Accept, Authorization");
              //   next();
              // });


              var allowCrossDomain = function(req, res, next) {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Methods', '*');
                res.header('Access-Control-Allow-Headers', '*');
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                res.header('Content-Type', 'application/json');
                next();
                }
                app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
                server.use(allowCrossDomain);

            // add middleware to parse the json
              server.use(bodyparser.json());
              server.use(bodyparser.urlencoded({
                  extended:false
              }));

            // Connect the database
            //   mongoose.connect(
            //       db.database,
            //       {
            //           useNewUrlParser:true,
            //           useCreateIndex:true
            //       }
            //   );

            // Set up routes
              routes.init(server);
        }; // create ends here
      

        // const app = express();
        // app.set('secretKey', 'nodeRestApi');

        start = () => {
            let hostname = server.get('hostname'),
                port = server.get('port');

            server.listen(port, function(){
                console.log('Express server listening on - http://'+hostname+':'+port);
            });
        };

        return {
            create: create,
            start: start   
        };

};