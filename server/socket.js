var socketio = require("socket.io");

module.exports.Create = function (server) {
  io = socketio(server);

  users = io.of("users");
  users.on("connection", (socket) => {
    //connection

    // each socket is it's own instance, and can be given its own properties: such as userID and username
    socket.on("setUser", (user) => {
      socket.userID = user._id;
      socket.username = user.username;
      console.log(socket.username, "has disconnected");
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log(socket.username, "has disconnected");
    });
  });
};
