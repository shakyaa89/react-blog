const Blog = require("../model/BlogModel");

const addBlog = async (req, res) => {
  const title = req.body.title;
  const blogBody = req.body.blogBody;
  const uploadedBy = req.body.uploadedBy;

  console.log({ title, blogBody });

  if (!title || !blogBody) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const blogData = {
      title,
      blogBody,
      uploadedBy,
    };

    const newBlog = new Blog(blogData);

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog Created Successfully!", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); // fetch all blogs
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  console.log(blogId);

  try {
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = { addBlog, getAllBlogs, deleteBlog };
