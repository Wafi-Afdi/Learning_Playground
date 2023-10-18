const Chat = require('../models/chatModel')
const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')


exports.fetchChats = asyncHandler(async (req, res, next) => {
    try {
        if(!req.params.userId) {
            console.log("User id not found");
            res.sendStatus(400)
        }
        const user = await User.findOne({_id: req.params.userId,}).select("-password")
        if(user.admin === true) {
            await Chat.find()
                .populate("chatId", "-password")
                .populate("latestMessage")
                    .sort({updatedAt: -1})
                .then(async (results)=> {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "username admin"
                    })

                    res.status(200).send(results)
                })
        } else if (user.admin === false) {
            await Chat.find({chatId: user._id})
                .populate("chatId", "-password")
                .populate("latestMessage")
                    .sort({updatedAt: -1})
                .then(async (results)=> {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "username admin"
                    })

                    res.status(200).send(results)
                })
        }
    } catch (error) {
        next(error)
    }
    
})