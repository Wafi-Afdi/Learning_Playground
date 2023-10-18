const User = require('../models/UserModel.js')
const Chat = require('../models/chatModel.js')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const generateToken = require('../config/generateToken.js')


exports.registerUser = asyncHandler(async(req, res, next) => {
    try {
        const { username, password, role } = req.body;
        let admin = false;
        if(!username || !password || !role) {
            res.status(400);
            throw new Error("Please enter the fields")
        }

        const duplicate = await User.findOne({ username });
        if(duplicate) {
            res.status(400);
            throw new Error("User already exist")
        }

        if(role === "admin") {
            admin = true;
        }
        const hsdPwd = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hsdPwd,
            admin
        });

        if(user) {
            if(user.admin == false) {
                const chat = await Chat.create({
                    chatId: user._id
                })
                res.status(201).json({
                    chat, 
                    msg: "Account Created",
                    token: generateToken(user._id)
                });
            } else
                res.status(201).json({
                    msg: "Account Created",
                    token: generateToken(user._id)
                })
        } else {
            res.status(400);
            throw new Error("user not found")
        }
    } catch (error) {
        next(error)
    }
    
})

exports.loginUser = asyncHandler(async(req, res,next) => {
    try {
        const { username, password, role } = req.body;
        let admin = role === "admin" ? true : false;
        
        const foundUser = await User.findOne({ username, admin});
        if(!foundUser) {
            return res.status(401).json({msg: "Invalid, Check username, password, and role"});
        }
        const passwordValid = await bcrypt.compare(password, foundUser.password)
        if(!passwordValid) {
            return res.status(401).json({msg: "Invalid, Check username password, and role"});
        } 
        return res.json({
            msg: "Authentication Successful", 
            token: generateToken(foundUser._id),
            username: foundUser.username,
            admin: foundUser.admin,
            id: foundUser._id,
            status: true
        })
    } catch (error) {
        next(error)
    }
    
})

exports.searchUser = asyncHandler(async(req,res,next) => {
    const searchUser = req.query.search ? {
        $and: [
            {username: {$regex : req.query.search, $options: "i"}},
            {admin: false }
        ],
    }
    : 
    {admin: false};

    const users = await User.find(searchUser).select("_id");
    if(users.length > 0) {
        const  idsSearch = users.map(obj => obj._id);
        await Chat.find({chatId: {$in : idsSearch}})
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
    else return res.json({results: "Not Found"})
})


