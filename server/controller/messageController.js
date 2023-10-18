const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const UserModel = require('../models/UserModel');

exports.sendMessage = asyncHandler(async (req,res,next) => {
    const { chatId, senderId, message } = req.body;
    if(!chatId && !senderId && !message) {
        console.log("Invalid data passed")
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: senderId,
        chat: chatId,
        content: message
    };
    try {
        let message = await Message.create(newMessage); 
        message = await message.populate("sender", "username admin")
        await Chat.findOneAndUpdate({chatId: req.body.chatId}, {
            latestMessage: message
        })
        res.status(200).json(message);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

exports.getMessage = asyncHandler(async (req,res,next) => {
    const { userId,  chatId } = req.body;
    if(!userId && !chatId) res.sendStatus(401);
    const user = await UserModel.findOne({_id: userId});
    if(user.admin) {
        const fullMessages = await Message.find({chat: chatId}).populate(
            "sender",
            "admin username"
        ).sort({updatedAt: 1})
        res.json(fullMessages)
    } else 
    {
        const fullMessages = await Message.find({chat: userId}).populate(
            "sender",
            "admin username"
        )
        res.json(fullMessages)
    }
    
})

exports.DeleteMessage = asyncHandler(async (req,res,next) => {
    const { messageId } = req.params;
    console.log(messageId)
    if(!messageId) res.sendStatus(401);
    const message = await Message.findById(messageId);
    console.log(message)
    if(!message) return res.json({message: "Message doesn't exist"}).status(304)
    else {
        message.content = "Message has been deleted"
        await message.save();
        return res.status(200).json({message: "Message has been deleted"})
    }
    
})