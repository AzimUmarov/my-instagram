const express = require("express");
const route = express.Router();
const Message = require("../controllers/message");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Message.getOne);
route.get("/get-chat-messages/:id", authentication, Message.getChatMessages);
route.post("/create/:id", authentication, Message.create);
route.patch("/edit/:id", authentication, Message.edit);
route.delete("/:id", authentication, Message.unsend);
route.patch("/like/:id", authentication, Message.like);


module.exports = route;