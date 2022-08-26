const jwt = require('jsonwebtoken');
const TokenBlockList = require("../models/tokenBlockList");

export default async function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    res.setHeader('Content-Type', 'application/json');
    if (token == null)
        return res.setHeader('Content-Type', 'application/json').sendStatus(401).json({message: "problem with your credentials, Please try again later."});

    const blockedToken = await TokenBlockList.find({token});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || blockedToken)
        return res.setHeader('Content-Type', 'application/json').sendStatus(401).json({message: "non authorized, re-signIn required"});
      req.user = user;
      next();
    })
}
