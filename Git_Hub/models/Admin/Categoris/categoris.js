/********
* user.js file (models)
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Master_Categories = new Schema(
    {
       
        category_name: {
            type:String,
            lowercase: true
        },  
        category_image: {
            type:String,
            lowercase: true
        }, 
       category_path : {
            type :  String
        },

    },
    
    { timestamps: true}
);



module.exports = mongoose.model('mastercategories', Master_Categories);