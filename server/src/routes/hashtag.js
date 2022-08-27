const express = require("express");
const route = express.Router();
const Hashtag = require("../controllers/hashtag");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Hashtag.getOne);
route.get("/create/:id", authentication, Hashtag.create);
route.patch("/edit/:id", authentication, Hashtag.edit);
route.delete("/:id", authentication, Hashtag.delete);
route.delete("/addPost/:id/:postId", authentication, Hashtag.addPost);
route.delete("/addUser/:id/:userId", authentication, Hashtag.adduser);

module.exports = route;