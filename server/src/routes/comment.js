const express = require("express");
const route = express.Router();
const Comment = require("../controllers/comment");

route.get("/:id", Comment.getOne);
route.get("/get-post-comments/:id", Comment.getUserChat);
route.get("/create/:id", Comment.create);
route.patch("/edit/:id", Comment.edit);
route.delete("/:id", Comment.delete);
route.patch("/:id/like", Comment.like);


module.exports = route;