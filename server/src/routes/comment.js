const express = require("express");
const route = express.Router();
const Comment = require("../controllers/comment");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Comment.getOne);
route.get("/get-post-comments/:id", authentication, Comment.getPostComments);
route.post("/create/:id", authentication, Comment.create);
route.patch("/edit/:id", authentication, Comment.edit);
route.delete("/:id", authentication, Comment.delete);
route.patch("/like/:id", authentication, Comment.like);


module.exports = route;