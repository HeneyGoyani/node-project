const express = require("express");
const { addBlog, deleteBlog, updateBlog, getAllBlogs } = require("../controller/blog.controller.js");
const uploadImage = require("../middleware/multer.middleware.js");
const { verifyToken } = require("../middleware/verify.middelware.js");

const routes = express.Router();

routes.post("/addBlog", verifyToken, uploadImage.single("blogImage"), addBlog);
routes.delete("/deleteBlog/:id", verifyToken, deleteBlog);
routes.put("/updateBlog/:id", verifyToken, uploadImage.single("blogImage"), updateBlog);
routes.get("/getAllBlogs/:id", verifyToken, getAllBlogs);

module.exports = routes;
