const express = require("express");
const route = express.Router();

route.get("/:id", Post.getOne);
route.get("/get-user-posts/:id", Post.getUserPosts);
route.get("/get-for-user/:id", Post.getForUser);
route.get("/get-explore-posts/:id", Post.getExplorePosts);
route.get("/get-for-user/:id", Post.getForUser);
route.get("/get-saved/:id", Post.getForUser);
route.get("/create", Post.create);
route.putch("/edit/:id", Post.edit);
route.delete("/:id", Post.delete);
route.putch("/:id/like", Post.like);
route.putch("/:id/save", Post.save);


module.exports = route;