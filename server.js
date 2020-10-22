var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const config = require("config");

const mongoose = require("mongoose");
// require("dotenv").config();

var app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("DB_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Kevin's MongoDB Connected!");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit(1);
  }
};
connectDB();

// view engine setup

// app.use("dev");
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//for development
app.use(express.static(path.join(__dirname, "client", "public")));

//for production
// app.use(express.static(path.join(__dirname, "client", "build")));

//Define routes
app.use("/", require("./routes/index"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));

//Serve static assets in production
// console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
