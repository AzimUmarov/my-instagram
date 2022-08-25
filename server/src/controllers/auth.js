const User = require('../models/user.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

class Auth {
     async register(req, res){
        try {
            const { firstName, lastName, avatar, username, email, password, gender, bithDate, bio} = req.body;
            let newUser = { firstName, lastName, avatar, username, email, password, gender, bithDate, bio};

            const checkUserName = await Users.findOne({username: newUserName});
            const checkUserName = await Users.findOne({username: newUserName});
        } catch (err) {
           
        }
      }
      
}

module.exports = new UserController()
