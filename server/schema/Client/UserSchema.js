const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
    userName: {
        type: String,
        required: true,
    },
    email: {    
        type: String,
        required: true,
    },
    phone: {    
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileimg: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Active'
    }
},
    { 
        timestamps: true ,
        versionKey: false
    }
);

module.exports = mongoose.model('users', UserSchema);
