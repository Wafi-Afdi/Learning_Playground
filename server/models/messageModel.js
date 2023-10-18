const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    }, 
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chat",
    }, 
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', messageModel)