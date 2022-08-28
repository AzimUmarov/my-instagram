const Message = require("../models/message");
const Comment = require("../models/comment");
const {ObjectId} = require("mongodb");

class MessageController {
    async getChatMessages(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const messages = await Message.find({chat: ObjectId(id) });

            return res.status(200).json({data: messages});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const message = await Message.findById(id);
            if (!message) {
                return res.status(404).json({ message: 'message not found' });
            }
            return res.status(200).json(message);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async create(req, res) {
        try {
            const {body} = req.body;
            const chat = req.params.id;
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
            const updateMessage = await Message.findByIdAndUpdate(id,{body},{
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
            let msg = "";
            if(!message.likes.includes(ObjectId(userId))) {
                msg = "successfully liked";
                message.likes.push(ObjectId(userId));
            }
            else {
                msg = "successfully unliked"
                message.likes = message.likes.filter(item => item.toString() !== userId);
            }
            await message.save();
            return res.status(200).json({ message: msg });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
}

module.exports = new MessageController();