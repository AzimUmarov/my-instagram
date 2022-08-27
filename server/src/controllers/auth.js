require("dotenv").config();
const User = require('../models/user.js');
const TokenBlockList = require('../models/tokenBlockList'); // redis? :(
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {ObjectId} = require("mongodb");

class AuthController {

     async signup(req, res){
         console.log("--------------------------------Signing up...");
        try {
            const { firstName, lastName, avatar, username, email, password, gender, birthDate, bio} = req.body;

            const hashPassword = await bcrypt.hash(password, 10);

            let newUser = new User({ firstName, lastName, avatar, username, email, password: hashPassword, gender, birthDate, bio});
            console.log(newUser)
            await newUser.save();

            const token = await jwt.sign(newUser.toJSON(), process.env.ACCESS_TOKEN);

            res.status(200).json({message: "new user saved successfully", data: {user: newUser, token}});

        } catch (err) {
            res.status(400).json({message: `${err.message.split(":")[2] || err.message}, please try again later`});
        }
     }
     async signIn(req, res){
         try {
            const {username, password} = req.body;

            const user = await User.findOne({username});
            if (!user) {
                throw new Error("User not found");
            }
            const token = await jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN);

             bcrypt.compare(password,user.password)
                 .then (r => {
                    if(r){
                        res.status(200).json({message: "logged", data: {user, token}});
                    }
                    else{
                        res.status(400).json({message: "invalid password"});
                    }
                 })
         }
         catch (err) {
             console.log(err)
             res.status(400).json({message: `${err.message.split(":")[2] || err.message}, please try again later`});
         }
     }
     async checkUsername(req, res) {
         try {
            const {username} = req.body;
            const user = await User.findOne({username: username});

             if(user) {
                 res.status(400).json({message: "username already taken"})
             }
             else{
                 res.status(200).json({message: "username available"});
             }
         }
         catch (err) {
             res.status(400).json({message: `${err.message.split(":")[2] || err.message}, please try again later`});
         }
     }

     async signOut(req, res){
         try {
             const authHeader = req.headers['authorization'];
             const token = authHeader && authHeader.split(' ')[1];

             const newTokenBlockList = new TokenBlockList({token});
             await newTokenBlockList.save();
             res.status(200).json({message: "logged out successfully"});
         }
         catch (err) {
             res.status(400).json({message: `${err.message.split(":")[2] || err.message}, please try again later`});
         }
     }

     async updatePassword(req, res){
         try {
            const id = req.user._id;
            const user = await User.findOne({_id: ObjectId(id)});
            const {password} = req.body;
            user.password = await bcrypt.hash(password, 10);
            await user.save();
            res.status(200).json({message: "user password has been updated successfully", data: {user}});
         }
         catch (err) {
             res.status(500).json({message: `${err.message.split(":")[2] || err.message}, please try again later`});
         }
     }
}

module.exports = new AuthController();
