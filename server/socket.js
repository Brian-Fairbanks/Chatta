var socketio = require("socket.io");

module.exports.Create = function (server) {
  io = socketio(server);

  users = io.of("users");
  users.on("connection", (socket) => {
    //connection
    console.log("a user connected");

    socket.on("setUser", (user) => {
      console.log(user);
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
