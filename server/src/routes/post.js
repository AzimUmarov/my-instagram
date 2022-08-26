const express = require("express");
const route = express.Router();
const Post = require("../controllers/post");

route.get("/:id", Post.getOne);
route.get("/get-user-posts/:id", Post.getUserPosts);
route.get("/get-for-user/:id", Post.getForUser);
route.get("/get-explore-posts/:id", Post.getExplorePosts);
route.get("/get-for-user/:id", Post.getForUser);
route.get("/get-saved/:id", Post.getSavedUser);
route.get("/create", Post.create);
route.patch("/edit/:id", Post.edit);
route.delete("/:id", Post.delete);
route.patch("/:id/like", Post.like);
route.patch("/:id/save", Post.save);


module.exports = route;