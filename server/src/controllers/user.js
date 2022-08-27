const User = require('../models/user.js');
const Hashtag = require('../models/hashtag');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const TokenBlockList = require("../models/tokenBlockList");

class UserController {
    async getAll(req, res) {
        try {
            console.log("------ all user ********************************");
            const users = await User.find();
            return res.status(200).json({data: users});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }

            return res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async edit (req, res) {
        try {
            const id = req.user._id;
            const { firstName, lastName, avatar, username, email, gender, birthDate, bio} = req.body;

            const updateUser = await User.findByIdAndUpdate(id, {firstName, lastName, avatar, username, email, gender, birthDate, bio}, {
                new: true,
                omitUndefined: true
            });

            if(!updateUser){
                return res.setHeader('Content-Type', 'application/json').status(404).json({ message: "user not found" });
            }
            return res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async delete (req, res) {
        try {
            const id = req.user._id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            await User.findByIdAndDelete(id);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const newTokenBlockList = new TokenBlockList({token});
            await newTokenBlockList.save();
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }

    async search(req, res) {
        try {
            const query = req.params.query;
            console.log("---- searching ********************************");
            if (!query)
                return res.status(404).json({message: 'please provide a valid query'});

            const users = await User.find({ "username": {
                    "$regex": query,
                        "$options": "i"
                }});
            const hashtags = await Hashtag.find({ "name": {
                    "$regex": query,
                    "$options": "i"
                }});
            return res.status(200).json({data: {users, hashtags}});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }

    async follow(req, res) {
        try {
            const id = req.user._id;
            const focusUser = req.params.user;
            if (!id || !focusUser) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const user = await User.findById(id);

            const userFocus = await User.findById(focusUser);

            if (!user || !userFocus) {
                return res.status(404).json({ message: 'user not found' });
            }

            let result = "";

            if(!user.following.includes(userFocus._id)) {
                result = "followed";
                user.following.push(userFocus._id);
                userFocus.followers.push(user._id);
            }
            else {
                result = "unfollowed";
                user.following = user.following.filter(user => userFocus._id === user);
                userFocus.followers = userFocus.followers.filter(item => item === user._id);
            }
            await user.save();
            await userFocus.save();
            return res.status(200).json({message: `successfully ${result}`,data:  user});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async favorite(req, res) {
        try {
            const id = req.user._id;
            const focusUser = req.params.user;
            if (!id && !focusUser) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const user = await User.findById(id);
            const userFocus = await User.findById(focusUser);

            if (!user || !userFocus) {
                return res.status(404).json({ message: 'user not found' });
            }
            let result = "";
            if(!user.favorite.includes(userFocus._id)) {
                result = "add to favorites";
                user.favorite.push(userFocus._id);
            }
            else {
                result = "remove from favorites";
                user.favorite = user.favorite.filter(user => userFocus._id === user);
            }
            user.save();
            return res.status(200).json({message: `successfully ${result}`,data:  user});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async block(req, res){
        try {
            const id = req.user._id;
            const focusUser = req.params.user;
            if (!id && !focusUser) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const user = await User.findById(id);
            const userFocus = await User.findById(focusUser);

            if (!user || !userFocus) {
                return res.status(404).json({ message: 'user not found' });
            }
            let result = "";
            if(!user.blocked.includes(userFocus._id)) {
                result = "add to blocked";
                user.blocked.push(userFocus._id);
            }
            else {
                result = "remove from blocked";
                user.blocked = user.blocked.filter(user => userFocus._id === user);
            }
            user.save();
            return res.status(200).json({message: `successfully ${result}`,data:  user});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async suggestions(req, res) {
        try {
            const id = req.user._id;
            let users = await User.find();
            users = users.filter(item => !item.following.includes(ObjectId(id)) && item._id.toString() !== id);
            users = users.filter((user, index) => index < 5);
            return res.status(200).json({data:  users});
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async followers(req, res) {
        try {
            const id = req.user._id;
            const users = await User.find({ "following": ObjectId(id)});
            return res.status(200).json({data:  users});
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async following(req, res) {
        try {
            const id = req.user._id;
            const users = await User.find({ "followers": ObjectId(id)});
            return res.status(200).json({data:  users});
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async
}

module.exports = new UserController()