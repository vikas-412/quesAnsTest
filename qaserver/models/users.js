var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the field']
    },
    emailID: {
        type: String,
        required: true,
        unique: [true, "Account by this email ID is already present"]
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type : String,
        enum : ["User","Admin"],
        required : true
    }
});

var Users = mongoose.model('users', userSchema);

module.exports = Users;

