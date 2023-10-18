const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require("express-async-handler")
require('dotenv').config()
const protect = asyncHandler(async (req,res, next) => {
    let token;
    const authHeaders = req.headers['authorization'];
    if(
        authHeaders &&
        authHeaders.split(" ")[0]
    ) {
        try {
            token = authHeaders.split(" ")[1];
            const decodedJWT = jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
                if(err) return res.status(401).send(err);
                req.user = await User.findById(user.id).select("-password")
                if(!req.user) return res.status(401).send(err);
                next();
            });
            
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed")            
        }
    }
    if(!token) {
        res.status(401);
        throw new Error("Not Authorized, token missing");
    }
})

module.exports = protect;