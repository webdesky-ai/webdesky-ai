/********
* user.js file (models)
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Master_Course = new Schema(
    {
       
       course_name: {
            type:String,
            lowercase: true
        },  
        course_video: {
            type:String,
            lowercase: true
        }, 
        course_path : {
            type :  String
        },
        regular_price : {
            type :  String
        },
        sale_price : {
            type :  String
        },
        course_description : {
            type :  String
        },
        course_Athorname : {
            type :  String
        },
        // course_Athorname : {
        //     type :  String
        // },
        course_buy : {
            type :  String
        },
      category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'mastercategories'},
      sub_category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'master_sub_categories'},
      Chile_sub_category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'master_child_sub_categories'}
    },
    
    { timestamps: true}
);



module.exports = mongoose.model('master_course', Master_Course);