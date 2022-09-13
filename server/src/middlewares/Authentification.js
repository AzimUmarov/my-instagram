require("dotenv").config();
const jwt = require('jsonwebtoken');
const TokenBlockList = require("../models/tokenBlockList");

async function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token ? "*---authorized" : "!---denied");
    if (token == null)
        return res.status(401).json({message: "problem with your credentials, Please try again later."});

    const blockedToken = [];// await TokenBlockList.find({token});

    jwt.verify(token, process.env.ACCESS_TOKEN + "", (err, user) => {
      if (err || blockedToken.length)
        return res.status(401).json({message: "non authorized, re-signIn required", error: err});
      req.user = user;
      next();
    })
}

module.exports = authentication;
