const User = require('../models/user.js');
const Hashtag = require('../models/hashtag');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

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
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'please provide a valid id' });
            }

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
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'please provide a valid id' });
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            await User.findByIdAndDelete(id);
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
            const id = req.params.id;
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
            console.log("user" + id)
            console.log("focusUser" + focusUser)
            if(!user.following.includes(userFocus)) {
                result = "followed";
                user.following.push(userFocus);
                userFocus.followers.push(user);
            }
            else {
                result = "unfollowed";
                user.following.filter(user => userFocus !== user);
                userFocus.followers.filter(item => item !== user);
            }
            user.save();
            userFocus.save();
            return res.status(200).json({message: `successfully ${result}`,data:  user});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async favorite(req, res) {
        try {
            const id = req.params.id;
            const focusUser = req.params.user;
            if (!id && !focusUser) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            if(!user.favorite.includes(focusUser)) {
                user.favorite.push(focusUser);
            }
            else {
                user.favorite.filter(user => userFocus !== user);
            }
            user.save();
            return res.status(200).json({message: "successfully followed",data:  user});

        } catch (err) {
            res.setHeader('Content-Type', 'application/json').sendStatus(500).json({message: `${err.message} , please try again later`});
        }
    }
    async block(req, res){

    }
    async suggestions(req, res) {
        try {
            const id = req.params.id;
            let users = await User.find();
            users = users.filter(user => !user.following.includes(id));
            return res.status(200).json({data:  users});
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async followers(req, res) {
        try {
            const id = req.params.id;
            const users = await User.find({ "following": ObjectId(id)});
            return res.status(200).json({data:  users});
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`});
        }
    }
    async following(req, res) {
        try {
            const id = req.params.id;
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