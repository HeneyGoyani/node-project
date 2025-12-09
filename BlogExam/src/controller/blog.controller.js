const Blog = require("../models/blog.model.js");
const path = require("path")
const fs = require("fs")

exports.addBlog = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `uploads/${req.file.filename}`;
    }

    const blog = await Blog.create({
      ...req.body,
      author: req.user._id,
      blogImage: imagePath,
    });

    return res.json({ status: 201, message: "Blog Added Successfully", blog });
  } catch (error) {
    console.error("Add Blog Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    return res.json({ status: 200, blogs });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findOne({ _id: req.params.id, author: req.user._id });
    if (!blog) {
      return res.json({ message: "Blog not found or not your blog" });
    }

    if (blog.blogImage) {
      let imagePath = path.join(__dirname, "..", blog.blogImage);
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log("Image delete error:", err.message);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findOne({ _id: id, author: req.user._id });
    if (!blog) return res.json({ message: "Blog not found or not your blog" });

    let blogImage = blog.blogImage;
    if (req.file) {
      if (blog.blogImage) {
        const oldImagePath = path.join(__dirname, "..", blog.blogImage);
        try {
          fs.unlinkSync(oldImagePath);
        } catch (err) {
          console.log("Old image delete error:", err.message);
        }
      }
      blogImage = `uploads/${req.file.filename}`;
    }

    await Blog.findByIdAndUpdate(
      id,
      { ...req.body, blogImage },
      { new: true }
    );

    return res.json({ status: 200, message: "Blog updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


