const express = require("express");
const route = express.Router();
const User = require("../controllers/user");

route.get("/get-one/:id", User.getOne);
route.get("/get-all", User.getAll);
route.patch("/edit/:id", User.edit);
route.delete("/delete/:id", User.delete);

route.get("/search/:query", User.search);
route.post("/follow/:id/:user", User.follow);
route.post("/favorite/:id/:user", User.favorite);
route.post("/block/:id/:user", User.block);
route.get("/suggestions/:id", User.suggestions);
route.get("/followers/:id", User.followers);
route.get("/following/:id", User.following);

module.exports = route;