var express = require("express");
const {
  addBlog,
  getAllBlogs,
  deleteBlog,
} = require("../controller/BlogController");
var router = express.Router();

/* GET home page. */
router.get("/", getAllBlogs);

router.post("/", addBlog);

router.delete("/:blogId", deleteBlog);

module.exports = router;
