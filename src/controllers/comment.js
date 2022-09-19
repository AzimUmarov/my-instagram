const Comment = require("../models/comment")
const User = require("../models/user")
const {ObjectId} = require("mongodb");

class CommentController {
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getPostComments(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({message: 'please provide a valid id'});
            }
            const comments = await Comment.find({post: ObjectId(id)});
            for (let i = 0; i < comments.length; i++) {
                comments[i]["creator"] = await User.findById(comments[i].creator)
            }
            return res.status(200).json({data: comments});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getUserComments(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user._id;
            console.log(userId)
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            const comments = await Comment.find({post: ObjectId(id), creator: ObjectId(userId)})
            console.log(comments)
            return res.status(200).json({data: comments});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }

    async create(req, res) {
        try {
            const {body} = req.body;
            const creator = ObjectId(req.user._id);
            const post = Object(req.params.id);

            let newComment = await new Comment({body, creator, post});

            await newComment.save();
            res.status(200).json({message: "successfully added", data: newComment});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async edit (req, res) {
        try {
            const id = req.params.id;
            const {body} = req.body;
            const updateComment = await Comment.findByIdAndUpdate(id,{body},{
                new: true,
                omitUndefined: true
            } );
            res.status(200).json({message: "successfully updated", data: updateComment});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async delete (req, res) {
        try {
            const id = req.params.id;
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({ message: "comment not found" });
            }
            await Comment.findByIdAndDelete(id);
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async like(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user._id;
            const comment = await Comment.findById(id);
            let message = "";
            if(!comment.likes.includes(ObjectId(userId))) {
                message = "successfully liked";
                comment.likes.push(ObjectId(userId));
            }
            else {
                message = "successfully unliked"
                comment.likes = comment.likes.filter(item => item.toString() !== userId);
            }
            await comment.save();
            res.status(200).json({ message: message });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
}

module.exports = new CommentController()