const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  catagory: {
    type: String,
    enum: ["Technology", "Lifestyle", "Education", "Travel", "Health", "Business"],
    default: "Technology",
  },
  blogImage: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
