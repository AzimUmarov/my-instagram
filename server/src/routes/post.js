const express = require("express");
const route = express.Router();
const Post = require("../controllers/post");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Post.getOne);
route.get("/get-user-posts/:id", authentication, Post.getUserPosts);
route.get("/get-saved/:id", authentication, Post.getUserSaved);
route.get("/get-for-user", authentication, Post.getForUser);
route.get("/get-for-explore", authentication, Post.getForUser);
route.post("/create", authentication, Post.create);
route.patch("/edit/:id", authentication, Post.edit);
route.delete("/:id", authentication, Post.delete);
route.patch("/like/:id", authentication, Post.like);
route.patch("/save/:id", authentication, Post.save);


module.exports = route;