var socketio = require("socket.io");

module.exports.Create = function (server) {
  io = socketio(server);

  // users = io.of("/users");
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
};
