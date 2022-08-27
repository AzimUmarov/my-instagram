const express = require("express");
const route = express.Router();
const Auth = require("../controllers/auth");
const authentication = require("../middlewares/Authentification");

route.post("/signup", Auth.signup);
route.post("/signin", Auth.signIn);
route.patch("/update-password", authentication, Auth.updatePassword);
route.post("/check-username", Auth.checkUsername);
route.delete("/sign-out", authentication, Auth.signOut);

module.exports = route;