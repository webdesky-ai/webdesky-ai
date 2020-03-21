/********
* user.js file (models)
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema(
    {
        name: {
            type:String,
            required: [true, 'Name is required'],
            lowercase: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true
        },
      //  timestamps: true
    }
);

module.exports = mongoose.model('User', User);