const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }, chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        uniqued: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Chat', chatModel)