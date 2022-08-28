const Post = require("../models/post");
const User = require("../models/user");
const {ObjectId} = require("mongodb");

class PostController {
    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ message: 'post not found' });
            }

            return res.status(200).json(post);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getUserPosts(req, res) {
        try {
            let id = req.params.id;
            if(id == 0){
                id = req.user._id;
            }
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }

            const post = await Post.find({ "creator": ObjectId(id)});
            if (!post) {
                return res.status(200).json({ message: 'user not have any post yet' });
            }
            return res.status(200).json(post);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getForUser(req, res) {
        console.log("---------getting posts for user: ");
        try {
            const id = req.user._id;
            if (!id) {
                return res.status(400).json({ message: 'please provide a valid id' });
            }
            let posts = await Post.find();
            posts = posts.filter(post => post.creator.toString() !== id);
            return res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getExplorePosts(req, res) {
        try {

        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async getUserSaved(req, res) {
        try {
            let id = req.params.id;
            if(id == 0){
                id = req.user._id;
            }

            const posts = await Post.find({ "saves": ObjectId(id)});
            return res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async create(req, res) {
        console.log("--------------------------------creating new post...");
        try {
            const {media, description, tags, hashtags, mentions} = req.body;
            const creator = ObjectId(req.user._id);
            let newPost = new Post({media, description, creator, tags, hashtags, mentions});
            await newPost.save();
            res.status(200).json({message: "successfully added", data: newPost});
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async edit (req, res) {
        try {
            const id = req.params.id;
            const {media, description, tags, hashtags, mentions} = req.body;
            const updatePost = await Post.findByIdAndUpdate(id, {media, description, tags, hashtags, mentions}, {
                new: true,
                omitUndefined: true
            });
            res.status(200).json({message: "successfully updated", data: updatePost});
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
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ message: "post not found" });
            }
            await Post.findByIdAndDelete(id);
            return res.status(200).json({ message: "successfully deleted" });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async like(req, res) {
        console.log("---------------------like--------------------")
        try {
            const id = req.params.id;
            const userId = req.user._id;
            const post = await Post.findById(id);
            let message = "";
            if(!post.likes.includes(ObjectId(userId))) {
                message = "successfully liked";
                post.likes.push(ObjectId(userId));
            }
            else {
                message = "successfully unliked"
                post.likes = post.likes.filter(item => item.toString() !== userId);
            }
            await post.save();
            res.status(200).json({ message: message });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }
    async save(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user._id;
            const post = await Post.findById(id);
            let message = "";
            if(!post.saves.includes(ObjectId(userId))) {
                message = "successfully saved";
                post.saves.push(ObjectId(userId));
            }
            else {
                message = "successfully unsaved"
                post.saves = post.saves.filter(item => item.toString() !== userId);
            }
            post.save();
            return res.status(200).json({ message: message });
        } catch (err) {
            res.status(500).json({message: `${err.message} , please try again later`})
        }
    }

}

module.exports = new PostController();