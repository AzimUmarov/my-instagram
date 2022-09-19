const express = require("express");
const route = express.Router();
const Chat = require("../controllers/chat");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", authentication, Chat.getOne);
route.post("/create", authentication, Chat.create);
route.patch("/edit/:id", authentication, Chat.edit);
route.delete("/:id", authentication, Chat.delete);
route.get("/get-user-chats", authentication, Chat.getUserChat);
route.get("/get-chat-users/:id", authentication, Chat.getChatUsers);
route.patch("/member-on-chat/:id", authentication, Chat.membershipOnChat);

module.exports = route;