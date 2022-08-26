const express = require("express");
const route = express.Router();
const Chat = require("../controllers/chat");

route.get("/:id", Chat.getOne);
route.get("/get-user-chats/:id", Chat.getUserChat);
route.get("/create", Chat.create);
route.patch("/edit/:id", Chat.edit);
route.delete("/:id", Chat.delete);
route.delete("/leave-chat/:id", Chat.leaveChat);

module.exports = route;