const express = require("express");
const route = express.Router();
const User = require("../controllers/user");
const authentication = require("../middlewares/Authentification");

route.get("/get-one/:id", User.getOne);
route.get("/get-one-by-id/:id", User.getOneByUsername);
route.get("/get-all", authentication, User.getAll);
route.patch("/update", authentication, User.edit);
route.delete("/delete", authentication, User.delete);

route.get("/search/:query", authentication, User.search);
route.post("/follow/:user", authentication, User.follow);
route.post("/favorite/:user", authentication, User.favorite);
route.post("/block/:user", authentication, User.block);
route.get("/suggestions", authentication, User.suggestions);
route.get("/followers", authentication, User.followers);
route.get("/following", authentication, User.following);

module.exports = route;