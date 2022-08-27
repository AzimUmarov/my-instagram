const Hashtag = require("../models/comment")
const Post = require("../models/post");
const {ObjectId} = require("mongodb");

class HashtagController {
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const hashtag = await Hashtag.findById(id);
            if (!hashtag) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(200).json(hashtag);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async create(req, res) {
        try {
            const {name} = req.body;
            let newHashtag = await new Hashtag({name});
            await newHashtag.save();
            res.status(200).json({message: "successfully added", data: newHashtag});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async edit (req, res) {
        try {
            const id = req.params.id;
            const {name} = req.body;
            const updateHashtag = await Hashtag.findByIdAndUpdate(id,{name},{
                new: true,
                omitUndefined: true
            } );
            res.status(200).json({message: "successfully updated", data: updateHashtag});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async delete (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(404).json({ message: 'please provide a valid id' });
            }
            await Hashtag.findByIdAndDelete(id);
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async addPost(req, res) {
        try {
            const id = req.params.id;
            const postId = req.params.post;

            const hashtag = await Hashtag.findById(id);

            let res = "";
            if (hashtag.posts.includes(ObjectId(postId))) {
                res = "successfully added";
                hashtag.posts = hashtag.posts.filter(item => item.toString() === postId);
            } else {
                res = "successfully removed";
                hashtag.posts.push(ObjectId(postId));
            }
            await hashtag.save();
            return res.status(200).json({message: res});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async adduser(req, res) {
        try {
            const id = req.params.id;
            const userId = req.params.post;

            const hashtag = await Hashtag.findById(id);

            let res = "";
            if (hashtag.users.includes(ObjectId(userId))) {
                res = "successfully added";
                hashtag.users = hashtag.posts.filter(item => item.toString() === userId);
            } else {
                res = "successfully removed"
                hashtag.users.push(ObjectId(userId));
            }
            await hashtag.save();
            return res.status(200).json({message: res});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }

}

module.exports = new HashtagController()