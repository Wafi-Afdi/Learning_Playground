const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})





module.exports = mongoose.model('User', userModel)