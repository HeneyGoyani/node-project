const express = require("express");
const { userDelete, updateUser, changePassword } = require("../controller/user.controller.js");
const uploadImage = require("../middleware/multer.middleware.js");
const { verifyToken } = require("../middleware/verify.middelware.js");

const routes = express.Router();

routes.put("/userDelete/:id", verifyToken, userDelete);
routes.put("/updateUser/:id", uploadImage.single("profilePic"), verifyToken, updateUser);
routes.put("/changePassword", verifyToken, changePassword);

module.exports = routes;