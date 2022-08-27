const Message = require("../models/message");
const Comment = require("../models/comment");
const {ObjectId} = require("mongodb");

class MessageController {
    getChatMessages(req, res) {

    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const message = await Message.findById(id);
            if (!message) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(200).json(message);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async create(req, res) {
        try {
            const {body, chat} = req.body;
            const creator = req.user._id;
            let newMessage = await new Message({body, creator, chat: ObjectId(chat)});
            await newMessage.save();

            res.status(200).json({message: "successfully added", data: newMessage});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async edit (req, res) {
        try {
            const id = req.params.id;
            const {body} = req.body;
            const updateMessage = await Comment.findByIdAndUpdate(id,{body},{
                new: true,
                omitUndefined: true
            } );
            res.status(200).json({message: "successfully updated", data: updateMessage});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async unsend(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'please provide a valid id' });
            }
            const message = await Message.findById(id);
            if (!message) {
                return res.status(404).json({ message: "message not found" });
            }
            await Message.findByIdAndDelete(id);
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async like(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user._id;
            const message = await Message.findById(id);
            let res = "";
            if(message.likes.includes(ObjectId(userId))) {
                res = "successfully liked";
                message.likes = message.likes.filter(item => item.toString() === userId);
            }
            else {
                res = "successfully unliked"
                message.likes.push(ObjectId(userId));
            }
            await message.save();
            return res.status(200).json({ message: res });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
}

module.exports = new MessageController();