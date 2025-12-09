const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller.js");
const uploadImage = require("../middleware/multer.middleware.js");

const routes = express.Router();

routes.post("/registerUser", uploadImage.single("profilePic"), registerUser);
routes.post("/loginUser", loginUser);

module.exports = routes;