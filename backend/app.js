var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var blogRouter = require("./routes/blog");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/blog", blogRouter);
app.use("/users", usersRouter);

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://shashwatshakya:dbPassword@maincluster.npfzv8f.mongodb.net/",
      { dbName: "blog_database" }
    )
    .then((data) => {
      console.log("Database Connected Successfully", data.connection.name);
    });
}

module.exports = app;
