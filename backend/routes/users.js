var express = require("express");
const { registerUser, loginUser } = require("../controller/UserController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
