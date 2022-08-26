const express = require("express");
const route = express.Router();
const Message = require("../controllers/message");

route.get("/:id", Message.getOne);
route.get("/get-chat-messages/:id", Message.getChatMessages);
route.get("/create", Message.create);
route.patch("/edit/:id", Message.edit);
route.delete("/:id", Message.delete);
route.patch("/:id/like", Message.like);


module.exports = route;