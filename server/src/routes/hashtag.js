const express = require("express");
const route = express.Router();
const Hashtag = require("../controllers/hashtag");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Hashtag.getOne);
route.post("/create", authentication, Hashtag.create);
route.patch("/edit/:id", authentication, Hashtag.edit);
route.delete("/:id", authentication, Hashtag.delete);
route.patch("/add-post/:id/:post", authentication, Hashtag.addPost);
route.patch("/add-user/:id/:userId", authentication, Hashtag.adduser);

module.exports = route;