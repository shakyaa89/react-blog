const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  blogBody: String,
  uploadedBy: String,
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
