const express = require("express");
const route = express.Router();
const Post = require("../controllers/post");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", Post.getOne);
route.get("/get-user-posts/:id", Post.getUserPosts);
route.get("/get-saved/:id", Post.getUserSaved);
route.get("/get-for-user", authentication, Post.getForUser);
route.get("/get-for-explore", Post.getForUser);
route.post("/create", authentication, Post.create);
route.patch("/edit/:id", authentication, Post.edit);
route.delete("/:id", authentication, Post.delete);
route.patch("/like/:id", authentication, Post.like);
route.patch("/save/:id", authentication, Post.save);


module.exports = route;