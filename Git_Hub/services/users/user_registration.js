/********
* user.js file (services/users)
********/

const express = require('express');
const User = require('../../models/User_Registration.js');

const bcrypt = require('bcrypt-nodejs'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Abc = require('../../constant.js')

var Cryptr = require('cryptr');
var connection = require('../../configs/db.js');
 cryptr = new Cryptr('myTotalySecretKey');

const app = express();
app.set('secretKey', 'nodeRestApi');

const secretkeyss = require('../../services/constant.js');
var dateTime = require('node-datetime');
var moment = require('moment');  


const UserResteration = async (req, res, next) =>{
     debugger
    var encryptedString = cryptr.encrypt(req.body.password);
     try{

        const{

            first_name,
            last_name,
            email_id,
            password,
            mobile_no,
            address,
            qualification,
            subject,
            role_id
        } = req.body


      if (email_id === undefined || email_id === '') {
        debugger
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'Your Body id Empty pls check',
            'field': 'email'
        });
       }

      const temp = {

         first_name: first_name,
         last_name: last_name,
         email_id : email_id,
         password : encryptedString,
         mobile_no : mobile_no,
         address : address,
         qualification : qualification,
         subject : subject,
         role_id : role_id  
       }

   var table = {tablename:'user'};

   User.insert_all(table, temp, function(error, result){
   debugger
   console.log("#$#$#*$ Response", result);
   
    if(error){
      debugger
       res.send({
         code : (404),
         status : false, 
         message : "Email Id Already Exist"});
    }
    else{
      debugger
      res.send({
        code : (200),
        status : true, 
        message:'user registered sucessfully',
      });
    }
   });
     }
     catch{
       res.send({
         code : (404),
         status : false,
         message : "Some Server Error",
       })
     }
}


const userlogin = async  (req, res, next) => {
    try{
      debugger
        const {
          email_id
        } = req.body

        temp = {
          email_id : email_id
        }
        var password=req.body.password;

        var table = {tablename:'user'};

        let issfindemail = await User.findWhere(table, temp, function(error, results){  
       
           if(error){
             res.send({
              code : (400),
              status : false,
              message : "Some Server Error"
             })
           }

          if(results.length == 0){
            res.send({
              code : (420),
              status : false,
              message : 'Your Email Id is Wrong',
            })
          }
             if(results.length >0){
             debugger
             const token = jwt.sign({id: 3}, 'my_secret_key', { expiresIn: '1h' }); 
             decryptedString = cryptr.decrypt(results[0].password);
                if(password==decryptedString){
                    res.json({
                        status:true,
                        code : (200),
                        message:'successfully authenticated',
                        response : results, 
                        token : token
                    })
                }else{
                  debugger
                    res.json({
                      code : (404),
                      status:false,
                      message:" password does not match"
                     });
                }
            }
        });
    }
    catch(error){
        debugger
        console.log("**************", error);
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
           });   
    }
}


const forgatepassword = async (req, res, next) =>{
    try{
      debugger
        const { 
            email_id
           } = req.body

           temp = {
             email_id : email_id
           }

          //  var dt = dateTime.create();
          //  var formatted = dt.format('Y-m-d'+'/'+'H:M:S');
       
            var  data = moment().format('YYYY-MM-DD'+'/'+'HH:mm:ss');
            console.log("This is forgot_Password Time And Date",data);


           if (email_id === undefined || email_id === '') {
             debugger
            return res.status(422).json({
                'code':  (400), 
                'description': 'email is required',
                'field': 'email'
            });
        }

        var table = {tablename:'user'};

       let issfindEmailId = await User.findWhere(table, temp , function(error, results ){
          
        if(error){
          debugger
          res.send({
            code : (400),
            status : false,
            message : "Some Server Error"
          })
        }
        if(results.length == 0){
          debugger
          res.send({
            code : (420),
            status : false,
            message : 'Email_Id is Wrong'
          })
        }
        if(results.length > 0){
            debugger
          userId = results[0].user_id;
          var encryptedString = cryptr.encrypt(userId);
  
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'webdesky313@gmail.com', // idhar apna gmail detail daalna bhopdike
                pass: 'webdesky@#$12345'
            }
        });
    
    
        const mailOptions = {
            from: 'webdesky313@gmail.com', // sender address
            to: req.body.email_id, // list of receivers
            subject: 'Online-Learning-APP -- Forgot_Passowrd', // Subject line
            html: '<h2><a href="http://192.168.1.80:4200/forgotpasswordlink/'+encryptedString+'/'+data+'">http://192.168.1.80:4200/forgotpassword/'+encryptedString+'/'+data+'</a></h2>'// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
          console.log("mailOptionsmailOptions", mailOptions);
          res.send({
            code : (200), 
            status:true, 
            Userid : encryptedString,
            message: "Please Check Your Email And Follow Link"
          });
          debugger
            });
        }
       }); 
    }
    catch(error){
      debugger
        console.log("**************", error);
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
           });   
    }
}

      const comparelink = async (req, res) =>{
      try{
          debugger
         // var  decryptedString = cryptr.decrypt(req.body.user_id); 

        var c_time = req.body.urltime;
        var c_date = req.body.c_date
  
        var  data = moment().format('YYYY-MM-DD');
        var data1 = moment().format('HH:mm:ss');

         var ms = moment(data1,"HH:mm:ss").diff(moment(c_time,"HH:mm:ss"));
         var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format("mm");
        var  h = 30
        console.log('s', s);
        console.log('this.h', h);


        if(s <= h){
          res.send({
            code : (200),
            status : true,
            message : 'Please change Password'
          });
        }
        else{
          debugger
          res.send({
            code : (404),
            status : false,
            message : 'your Link Expired'
          })
        }

             res.send({
             status : true
             });
         }
         catch(error){
         debugger
         res.send({
         code : (400),
        status : false,
        message : 'Some Server Error'
       });
       }
      }

          const ChangePassword = async (req, res, next) =>{
          try{
              debugger
           
              var  decryptedString = cryptr.decrypt(req.body.user_id); 
              var  encryptedString = cryptr.encrypt(req.body.newPassword);

                temp1 = {
                user_id : decryptedString,
                   }  

                var table = {tablename:'user'};
      
                let issfindemail = await User.findWhere(table, temp1 , async(error, results ) =>{
                  debugger
                  if(error){
                   debugger
                    res.send({
                    code : (400),
                    status : false,
                    message : 'Some Server Error'
                    });
                   }
                   if(results.length == 0){
                     debugger
                     res.send({
                       code : (422),
                       status: false,
                       message : 'ID is Wrong'
                       });
                       }
                   if(results.length !== 0){
                    debugger
                   temp = {
                     password : encryptedString
                     }
                   var whereid = {fealdname : 'user_id'}
                   let issupdate = await User.Update(table, temp,whereid.fealdname,temp1.user_id, function(error, resultss){
                     debugger

                     if(error){
                       debugger
                       res.send({
                         status : false,
                         message : 'Dont be Update'
                        });
                        }
                        if(resultss){
                       debugger
                       res.send({
                         status : true,
                         message : 'your password chnage succsefully'
                         });
                        }
                      });
                     }
                   });
             }
             catch(error){
             debugger
            console.log("**************", error);
            debugger
            return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
             });  
           }
         }
   

   const Showprofile = async (req, res, next) => {
       try{

          const {
            user_id
          } = req.body

          temp = {
            user_id : user_id
          }

          var table = {tablename:'user'};

          let issfinduserdata = await User.findWhere(table, temp, function(error, results){
            debugger
            if(error){
              res.send({
                  code : (400),
                 status : false,
                 message : 'Some Server Error'
              });
            }
              if(results){
                debugger
                res.send({
                  code : (200),
                  status : true,
                  message : "Your data",
                  response : results
                });
              }
          });
       }
       catch(error){
        debugger
        return res.status(500).json({
            
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
       }
   }

   const UpdateProfiledata = async (req, res, next) =>{  
             
     debugger
    try{
    debugger
      const {
        user_id,
        first_name,
        last_name,
        mobile_no,
        address,
        qualification,
        subject,
    } = req.body

    console.log("UserIDDDD", req.body.user_id);

    for(var i = 0; i < req.files.length; i++){
      debugger  
      var fff = req.files[i].originalname;
      var AAA = Abc.URL + req.files[i].path;
      debugger
       }

       const temp = {
        first_name: first_name,
        last_name: last_name,
        mobile_no : mobile_no,
        address : address,
        qualification : qualification,
        subject : subject,
        profile_image : fff,
        image_path : AAA
        }

        temp1 = {
          user_id  : user_id
        }

          var table = {tablename:'user'};
          var whereid = {fealdname : 'user_id'}

          let issUpdate  = await User.Update(table, temp,whereid.fealdname,temp1.user_id , async (error, results) =>{

            if(error){
              res.send({
                status : false,
                message : 'Some Sql Query Error'
              });
            }
            if(results){
              let issfinddata = await User.findWhere(table, temp1, async (error, resultss) =>{
                if(error){
                  res.send({
                    status : false,
                    message : 'Some Sql Query Error'
                  })
                }
                if(resultss){
                  res.send({
                    status : true,
                    message : 'This is Your data',
                    response : {resultss}
                  })
                }
              }); 
            }
          });
    }
    catch(error){
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
   }

   const mastercategory = async (req, res, next) => {
     try{
       debugger
      const{
        cat_name
      } = req.body

      temp ={
        cat_name : cat_name
      }

      var table = {tablename:'master_category'};

      let isscreatemastercategory = await User.insert_all(table, temp, function(error, results){

        if(error){
          res.send({
            code : (400),
            status : false,
            message : 'Some SQL Server Error',
            response : {}
          });
        }
        else{
          res.send({
            code : (200),
            status : true,
            message : 'Master_Category Add Successfully',
            response : {}
          })
        }
      })
     }
     catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
     }
   }


   const submastercategory = async (req, res, next) => {
    try{
     debugger
     const{
      master_id,
      sub_name
     } = req.body

     temp ={
      master_id :master_id,
      sub_name : sub_name
     }

     var table = {tablename:'Sub_master_category'};

     let issSubcategory = await User.insert_all(table, temp, function(error, results){

      if(error){
        res.send({
          code : (400),
          status : false,
          message : 'Some SQL Server Error',
          response : {}
        })
      }
      else{
        res.send({
          code : (200),
          status : true,
          message : 'Sub_master_category Add Successfully',
          response : {}
        });
      }
     });
    }
    catch(error){
     debugger
     return res.status(500).json({
         'code': 'SERVER_ERROR',
         'description': 'something went wrong, Please try again'
     });
    }
  }

  const sub_sub_mastercategory = async (req, res, next) => {
    try{
     debugger
     const{
      sub_master_id,
      sub_master_name
     } = req.body

     temp ={
      sub_master_id :sub_master_id,
      sub_master_name : sub_master_name
     }

     var table = {tablename:'Sub_SubMastercategory'};


     let isscerateSub_Submaster = await User.insert_all(table, temp, function(error, results) {

      if(error){
        debugger
        res.send({
          code : (400),
          status : false,
          message : 'Some SQL Server Error',
          response : {}
        })
      }
      else{
        debugger
        res.send({
          code : (200),
          status : true,
          message : 'Sub_SubMastercategory Add Successfully',
          response : {}
        })
      }

     })
    }
    catch(error){
     debugger
     return res.status(500).json({
         'code': 'SERVER_ERROR',
         'description': 'something went wrong, Please try again'
     });
    }
  }

  const Get_mastercategory = async (req, res, next) => {
    try{
      debugger
      var table = {tablename:'master_category'};

      let finddata = await User.selectdata(table, function(error, results){
         if(error){
           debugger
         }
         if(results){
           debugger
         }
      })

    }
    catch(error){
        debugger
     return res.status(500).json({
         'code': 'SERVER_ERROR',
         'description': 'something went wrong, Please try again'
     });
    }
  }

  // const Get_mastercategory = async (req, res, next) => {
  //   try{
  //     debugger
      
  //   let getMsatercategory = await connection.query('SELECT * FROM master_category', function(error, data){

  //     if(error){
  //       res.send({
  //       status : false,
  //       code : (404),
  //       message : 'No data Found'
  //       })
  //     }
  //     if(data){
  //       res.send({
  //         response : data
  //       })
  //     }
  //   });

  //   }
  //   catch(error){
  //       debugger
  //    return res.status(500).json({
  //        'code': 'SERVER_ERROR',
  //        'description': 'something went wrong, Please try again'
  //    });
  //   }
  // }

  const Get_submastercategory = async (req, res, next) =>{
    try{
      debugger
        const {
          master_id
        } = req.body

        temp = {
          master_id : master_id
        }

        var table = {tablename:'Sub_master_category'};

        if (master_id === undefined || master_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Please Enter UserId',
                'field': 'UserId'
            });
           }

           let subcategory = await User.findWhere(table, temp, function(error, results){
            debugger
            if(error){
               res.send({
                 status : false,
                 message : 'some Sql Server Error'
               });
              }
            if(results){
              res.send({
                code : (200),
                status : true,
                message : 'this is Sub_master_category data',
                response : results
              });
            }
        });
     }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }


  const Get_sub_submastercategory = async (req, res, next) =>{
    try{
      debugger

        const {
          sub_master_id
        } = req.body

        temp = {
          sub_master_id : sub_master_id
        }

        if (sub_master_id === undefined || sub_master_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Please Enter UserId',
                'field': 'UserId'
            });
        }

        var table = {tablename:'Sub_SubMastercategory'};

        let subcategory = await User.findWhere(table, temp, function(error, results){

          if(error){
            res.send({
              code : (400),
              message : 'Some Sql Error',
              response : {}
            });
          }
          if(results){
            res.send({
              code : (200),
              message : 'Thsi is Sub_SubMastercategory data',
              response : results
            });
          }

        });
    }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }

  const Update_mastercategory = async (req, res, next) =>{
    try{
         debugger

      var categoryId = req.body.cat_id
      const {
        cat_name,
        cat_id
      } = req.body

      temp ={
        cat_name : cat_name
      }
      temp1 = {
        cat_id : cat_id
      }

          var table = {tablename:'master_category'};
          var whereid = {fealdname : 'cat_id'}


          let updatecategory = await User.Update(table, temp,whereid.fealdname,temp1.cat_id , function(error, results){
            if(error){
              res.send({
                code : (400),
                message : 'Some Sql Error',
                response : {}
              });
            }
            if(results){
              res.send({
                code : (200),
                message : 'Master_Category Update Successfully',
                response : {}
              });
            }
          });
          }
    catch(error){
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }

  const Update_submastercategory = async (req, res, next) =>{
    try{
debugger

      // var categoryId = req.body.sub_id
      const {
        sub_name,
        sub_id
      } = req.body

     
      temp ={
        sub_name : sub_name
      }
      temp1 = {
        sub_id : sub_id
      }

      var table = {tablename:'Sub_master_category'};
      var whereid = {fealdname : 'sub_id'}


      let updatecategory = await User.Update(table, temp, whereid.fealdname, temp1.sub_id, function(error, results){
        if(error){
          res.send({
            code : (400),
            status : false,
            message : 'Some Sql Query Eroor',
            response : {}
          });
        }
        if(results){
          res.send({
            code : (200),
            status : true,
            message : 'Sub_master_category Update Successfully'
          });
        }
      });
    }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }


  const Update_sub_submastercategory = async (req, res, next) =>{
    try{
        debugger
      // var categoryId = req.body.sub_sub_id
      const {
        sub_master_name,
        sub_sub_id
      } = req.body
 
      temp ={
        sub_master_name : sub_master_name
      }
      temp1 ={
        sub_sub_id : sub_sub_id
      }

      var table = {tablename:'Sub_SubMastercategory'};
      var whereid = {fealdname : 'sub_sub_id'}

      let updatecategory = await User.Update(table,temp, whereid.fealdname, temp1.sub_sub_id, function(error, results){
         if(error){
           res.send({
             code : (400),
             status : false,
             message : 'this is some Sql Error',
             response : {}
           });
         }
         if(results){
           res.send({
             code : (200),
             status : true,
             message : 'Sub_SubMastercategory Update Succsessfully',
             response : {}
           })
         }
      });
    }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }


  const Delete_mastercategory = async (req, res) =>{
    try{
      debugger
      const{
        cat_id
      } = req.body

      temp = {
        cat_id : cat_id
      }

      var table = {tablename:' master_category'};

       let issmastercategory = await User.Delete(table, temp, function(error, results){
           if(error){
             res.send({
               code : (404),
              status : false,
              messge : 'Some SQL Query Error'
             });
           }
           if(results){
             res.send({
               code : (200),
               status : true,
               message : 'Master Category Delete successfully'
             });
           }
       });
    }
    catch(error){
      res.send({
        code : (400),
        status : false,
        message : 'Some Server Error'
      });
    }
  }

  const Delete_submastercategory = async ( req, res) =>{
    try{
      debugger
      const{
        sub_id
      } = req.body

      temp = {
        sub_id : sub_id
      }

      var table = {tablename:' Sub_master_category'};

      let isssubmaserdelete = await User.Delete(table, temp, function(error, results){
        if(error){
          debugger
          res.send({
            code : (400),
            status : false,
            message : 'Some SQL Query Error',
            response : {}
          });
        }
        if(results){
          debugger
          res.send({
            code : (200),
            status : true,
            message : 'Your Sub_master_category Delete Successfully'
          });
        }
      });
    }
    catch(error){
      debugger
      res.send({
        code : (404),
        status : false,
        message : 'Some Server Error',
      });
    }
  }

  const Delete_sub_submastercategory = async ( req, res) =>{
    try{
      debugger
      const{
        sub_sub_id
      } = req.body

      temp = {
        sub_sub_id : 	sub_sub_id
      }

      var table = {tablename:' Sub_SubMastercategory'};

      let isssubmaserdelete = await User.Delete(table, temp, function(error, results){
        if(error){
          res.send({
            code : (400),
            status : false,
            message : 'Some SQL Query Error',
            response : {}
          });
        }
        if(results){
          res.send({
            code : (200),
            status : true,
            message : 'Your Sub_master_category Delete Successfully'
          });
        }
      });
    }
    catch(error){
      res.send({
        code : (404),
        status : false,
        message : 'Some Server Error',
      });
    }
  }

  const Getuser = async (req , res) =>{
    try{
     debugger
      // var role_id = req.body.role_id;

      const {
        role_id
      } = req.body

      temp = {
        role_id : role_id
      }
      var table = {tablename:'user'};

      let issuserselect =  await User.findWhere(table, temp, function(error, results){

        if(error){
          res.send({
            code : (400),
            status : false,
            message : 'Some Sql Error',
          });
        }
        if(results){
          res.send({
            code : (200),
            status : true,
            message : "Some Data",
            response : results
          });
        }
      });
    }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }


  const Activedeactive = async (req, res) =>{
    try{
     debugger
      var user_idddd = req.body.user_id;

      const {
        status,
        user_id
      } = req.body

      temp1 = {
        user_id : user_id
      }

      var table = {tablename:'user'};
      var whereid = {fealdname : 'user_id'}

      let issstatuscheck = await User.findWhere(table,temp1, async (error, results) =>{
        if(error){
          res.send({
            code : (400),
            status : false,
            message : 'Some Sql Server Error',
            response : {}
          });
        }
        if(results){
          debugger
          if(results[0].status == 1){
            temp= {
              status : 0
            }
            let updatestastus = await User.Update(table,temp,whereid.fealdname,temp1.user_id, async(error,resultss) =>{
              if(error){
                debugger
              }
              debugger
              if(resultss){
                debugger
                res.send({
                  code : (200),
                  status : true,
                  message : 'Status Deactiveted',
                });
              }
            });
          }
          if(results[0].status == 0){
            temp= {
              status : 1
            }
            let updatestastus = await User.Update(table,temp,whereid.fealdname,temp1.user_id, async( error, resultssss) =>{
              if(error){
                debugger
              }
              debugger
              if(resultssss){
                debugger
                res.send({
                  code : (200),
                  status : true,
                  message : 'Status Activeted',
                });
              }
            });
          }

        }
      });
    }
    catch(error){
      debugger
      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      });
    }
  }


module.exports = {

   // UserRester : UserRester,
    userlogin : userlogin,
    forgatepassword : forgatepassword,
    comparelink : comparelink,
    ChangePassword : ChangePassword,
    Showprofile : Showprofile,
    UpdateProfiledata : UpdateProfiledata,
    UserResteration : UserResteration,

    mastercategory : mastercategory,
    submastercategory : submastercategory,
    sub_sub_mastercategory : sub_sub_mastercategory,

    Get_mastercategory : Get_mastercategory,
     Get_submastercategory : Get_submastercategory,
    Get_sub_submastercategory : Get_sub_submastercategory,

    Update_mastercategory : Update_mastercategory,
    Update_submastercategory : Update_submastercategory,
    Update_sub_submastercategory : Update_sub_submastercategory,

    Delete_mastercategory : Delete_mastercategory,
    Delete_submastercategory : Delete_submastercategory,
    Delete_sub_submastercategory : Delete_sub_submastercategory,

    Getuser : Getuser,
    Activedeactive :Activedeactive
}


// const ChangePassword = async (req, res, next) =>{
//     try{
//         const { 
//             email_id,
//             newPassword,
//            // password
//              } = req.body
//              var encryptedString = cryptr.encrypt(req.body.newPassword);
//              password : encryptedString

//              if (email_id === undefined || email_id === '') {
//                 debugger
//              return res.status(422).json({
//                  'code': 'REQUIRED_FIELD_MISSING',
//                  'description': 'email is required',
//                  'field': 'email'
//              });
//          }
        
//          connection.query('SELECT * FROM user WHERE email_id = ?',[email_id], function (error, results, fields) {
//             if (error) {
//                 res.json({
//                   status:false,
//                   message:'there are some error with query'
//                   })
//             }else{
             
//         if(results.length >0){
//        connection.query('UPDATE user SET password=',[password], function (error, results, fields) {
         

//             });
//               }
//               else if(error){
//                   debugger
//                 res.json({
//                     status:false,    
//                   message:"Email does not exits"
//                 });
//               }
//             }
//           });

        

//     }
//     catch(error){

//     }
// }


//////////////////////Registration Code new type/////////////////


// const UserResteration = async (req, res, next) =>{
//     try{
// debugger
//         var encryptedString = cryptr.encrypt(req.body.password);

//         const{
//             first_name,
//             last_name,
//             email_id,
//             password,
//             mobile_no,
//             address,
//             qualification,
//             subject,
//             role_id
//         } = req.body

//         if (email_id === undefined || email_id === '') {
//             debugger
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'Your Body id Empty pls check',
//                 'field': 'email'
//             });
//         }
//         const temp = {
//             first_name: first_name,
//             last_name: last_name,
//             email_id : email_id,
//             password : encryptedString,
//             mobile_no : mobile_no,
//             address : address,
//             qualification : qualification,
//            subject : subject,
//            role_id : role_id
//         }
//         connection.query('INSERT INTO  user SET ?', temp, function (error, results, fields) {
//           if (error) {
//               debugger
//             res.json({
//                 status:false,
//                 code : (404),
//                 message:'This Email Adress Already Exist',
//                 //response : {error}
//             })
//           }else{
//               res.json({
//                 status:true,
//                 code : (200),
//                 message:'user registered sucessfully'
//             })
//           }
//         });
//     }
//     catch(error){
//         debugger
//         console.log("**************", error);
//         debugger
//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }
