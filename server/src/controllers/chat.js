const Chat = require('../models/chat');
const User = require("../models/user");
const {ObjectId} = require("mongodb");

class chatController {
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const chat = await Chat.findById(id);
            if (!chat) {
                return res.status(404).json({ message: 'chat not found' });
            }

            return res.status(200).json(chat);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getUserChat(req, res) {
        try {
            const id = req.user._id;

            const chat = await Chat.find({ "creator": ObjectId(id)});
            if (!chat) {
                return res.status(200).json({ message: 'user not have any post yet' });
            }
            return res.status(200).json(chat);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }

    async getChatUsers(req, res) {
        try {
            const id = req.params.id;
            const chat = await Chat.findById(id);
            let users = [];
            chat.participants.map(async item => {
                const members = await User.findById(item);
                console.log(members._id);
                // -------------------------------- here is where
                // users = [..., members];
            })

            return res.status(200).json({data: users});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }

    async create(req, res) {
        console.log("----------------creating new chat ----------------")
        try {
            const {title} = req.body;
            const creator = req.user._id;
            let newChat = new Chat({title, creator, participants: [creator]});
            await newChat.save();
            res.status(200).json({message: "successfully added", data: newChat});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async edit(req, res) {
        try {
            const {title} = req.body;
            const id = req.params.id;
            const updateChat = await Chat.findByIdAndUpdate(id, {title}, {
                new: true,
                omitUndefined: true
            });
            if(!updateChat)
                return res.status(404).json({ message: 'not found' });
            else
                res.status(200).json({message: "successfully updated", data: updateChat});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'please provide a valid id' });
            }
            const chat = await Chat.findById(id);
            if (!chat) {
                return res.status(404).json({ message: "post not found" });
            }
            await Chat.findByIdAndDelete(id);
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async membershipOnChat(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user._id;
            const chat = await Chat.findById(id);
            let message = "";
            if(!chat.participants.includes(ObjectId(userId))) {
                message = "successfully joined";
                chat.participants.push(ObjectId(userId));
            }
            else {
                message = "successfully leaved"
                chat.participants = chat.participants.filter(item => item.toString() !== userId);
            }
            await chat.save();
            res.status(200).json({ message: message });
        }
        catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
}

module.exports = new chatController

