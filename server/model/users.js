var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('User', {
    email:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message : '{value} is not a valid email'
        }
    },
    password: {
        type:String,
        minlength: 6,
        require: true
    },
    tokens : [{
        access:{
            type:String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

module.exports= User;