const express = require("express");
const route = express.Router();

route.get("/:id", User.getOne);
route.get("/get-all-user", User.getAll);
route.putch("/edit/:id", User.edit);
route.delete("/:id", User.delete);

route.get("/search/:id", User.search);
route.post("/:id/follow/:id", User.follow);
route.delete("/:id/unfollow/:id", User.unfollow);
route.get("/:id/suggestions", User.suggestions);
route.get("/:id/followers", User.followers);
route.get("/:id/following", User.following);

module.exports = route;