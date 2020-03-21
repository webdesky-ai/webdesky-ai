/********
* user.js file (models)
********/


var con = require('../configs/db.js');
var SqlString = require('sqlstring');



module.exports.insert_all = function(tableobj, obj, cb){  
    debugger
      con.connect(function(err, resultss){
      debugger
      var que = ("INSERT INTO "+tableobj.tablename+" SET ?"); 
       con.query(que,obj, cb); 
       debugger
   });
}


module.exports.findWhere =function(tableobj, obj, cb){
	debugger
	con.connect(function(err){
		debugger
		var que = ("SELECT * FROM "+tableobj.tablename+" WHERE ?");
    con.query(que,obj, cb); 
    console.log("que,obj, cb", que,obj);
    debugger
	});
}

module.exports.Update = function(tableobj,obj,fealdname,temp1, cb){
  debugger
  con.connect(function(err){
    debugger
   var que = ("UPDATE " + tableobj.tablename + " SET? WHERE "+fealdname+" = "+[temp1]);
    // var que = (" UPDATE " + tableobj.tablename + " WHERE ?" +temp);
    con.query(que,obj,cb); 
    console.log("This is Query", que);
    debugger
	});
}

module.exports.Delete = function(tableobj, obj, cb){
  debugger
  con.connect(function(err){
    
    var que = ("DELETE FROM " + tableobj.tablename + " WHERE ?")
    debugger
    con.query(que,obj, cb);
    debugger
  });
}


 module.exports.selectdata = function(tableobj,cb){
   debugger
  con.connect(function(err){
    debugger
 var que =  con.query("SELECT * FROM " + tableobj.tablename); 
  // var que =  con.query("SELECT * FROM master_category "); 
  con.query(que,cb);
  debugger
  // console.log('This is Query of selectdata', que);
    });
  } 

