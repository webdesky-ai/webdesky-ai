/********
* user.js file (models)
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Master_Child_sub_Categories = new Schema(
    {
       
       child_sub_category_name: {
            type:String,
            lowercase: true
        },  
        child_sub_category_image: {
            type:String,
            lowercase: true
        }, 
       child_sub_category_path : {
            type :  String
        },
      category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'mastercategories'},
      sub_category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'master_sub_categories'},
    },
    
    { timestamps: true}
);



module.exports = mongoose.model('master_child_sub_categories', Master_Child_sub_Categories);