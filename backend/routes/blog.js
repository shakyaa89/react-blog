var express = require("express");
const { addBlog, getAllBlogs } = require("../controller/BlogController");
var router = express.Router();

/* GET home page. */
router.get("/", getAllBlogs);

router.post("/", addBlog);

module.exports = router;
