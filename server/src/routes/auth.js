const express = require("express");
const route = express.Router();

route.post("/signup", Auth.signup);
route.post("/signin", Auth.signin);
route.get("/signout", Auth.signout);

module.exports = route;