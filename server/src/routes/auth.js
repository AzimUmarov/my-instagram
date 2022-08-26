const express = require("express");
const route = express.Router();
const Auth = require("../controllers/auth");

route.post("/signup", Auth.signup);
route.post("/signin", Auth.signIn);
route.patch("/update-password/:id", Auth.updatePassword);
route.post("/check-username", Auth.checkUsername);
route.delete("/sign-out/:token", Auth.signOut);

module.exports = route;