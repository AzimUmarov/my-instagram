const express = require("express");
const route = express.Router();

route.get("/:id", Message.getOne);
route.get("/get-chat-messages/:id", Message.getChatMessages);
route.get("/create", Message.create);
route.putch("/edit/:id", Message.edit);
route.delete("/:id", Message.delete);
route.putch("/:id/like", Message.like);


module.exports = route;