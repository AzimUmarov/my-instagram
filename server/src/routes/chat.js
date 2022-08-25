const express = require("express");
const route = express.Router();

route.get("/:id", Chat.getOne);
route.get("/get-user-chats/:id", Chat.getUserChat);
route.get("/create", Chat.create);
route.putch("/edit/:id", Chat.edit);
route.delete("/:id", Chat.delete);
route.delete("/leavechat:id", Chat.leaveChat);

module.exports = route;