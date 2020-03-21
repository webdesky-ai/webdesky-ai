/********
* user.js file (models)
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Master_sub_Categories = new Schema(
    {
       
       sub_category_name: {
            type:String,
            lowercase: true
        },  
        sub_category_image: {
            type:String,
            lowercase: true
        }, 
       sub_category_path : {
            type :  String
        },
      category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'mastercategories'},
    },
    
    {timestamps: true}
);



module.exports = mongoose.model('master_sub_categories', Master_sub_Categories);