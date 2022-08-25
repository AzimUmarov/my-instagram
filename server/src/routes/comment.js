const express = require("express");
const route = express.Router();

route.get("/:id", Comments.getOne);
route.get("/get-post-comments/:id", Comments.getUserChat);
route.get("/create", Comments.create);
route.putch("/edit/:id", Comments.edit);
route.delete("/:id", Comments.delete);
route.putch("/:id/like", Comments.like);


module.exports = route;