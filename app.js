var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
require("dotenv").config();

var app = express();

const connectDB = async () => {
  console.log(process.env.DB_URI);
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit(1);
  }
};
connectDB();

// view engine setup

app.use(logger("dev"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "public")));

//Define routes
app.use("/", require("./routes/index"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));

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
