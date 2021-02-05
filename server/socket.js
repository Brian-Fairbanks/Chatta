var socketio = require("socket.io");

// keep an array of users online
const socketUserDict = {};

module.exports.Create = function (server) {
  io = socketio(server);

  users = io.of("users");
  users.on("connection", (socket) => {
    //connection

    // each socket is it's own instance, and can be given its own properties: such as userID and username
    socket.on("setUser", (user) => {
      socket.userID = user._id;
      socket.username = user.username;
      console.log(socket.username, "has connected");
      addClientToMap(user._id, socket.id);
      console.log(socketUserDict);
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log(socket.username, "has disconnected");
      removeClientFromMap(socket.userID, socket.id);
      console.log(socketUserDict);
    });
  });
};

function addClientToMap(userID, socketID) {
  if (socketUserDict[userID]) {
    socketUserDict[userID].push(socketID);
  } else {
    socketUserDict[userID] = [socketID];
  }
}

function removeClientFromMap(userID, socketID) {
  try {
    socketUserDict[userID] = socketUserDict[userID].filter(
      (connection) => connection != socketID
    );
  } catch (err) {
    console.log(err);
  }
}
