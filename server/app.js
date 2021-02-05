const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;
const app = express();

// Instance of Socket IO Listening
//=====================================
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  //connection
  console.log("a user connected");

  // disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // chat message
  socket.on("chatMessage", (msg) => {
    console.log("message: " + msg);
    // io.emit("newMessage", msg);
  });
});

// Middleware
//========================
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

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
  res.json({ error: err });
});

// set up monogo DataBase
//= ===============================
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Chatta", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection
  .once("open", () => console.log("Connected to mongoDB!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

module.exports = app;
