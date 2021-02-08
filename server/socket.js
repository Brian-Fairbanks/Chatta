var socketio = require("socket.io");
const db = require("./models");

// keep an array of users online
const socketUserDict = {};

module.exports.Create = function (server) {
  io = socketio(server);

  users = io.of("users");
  users.on("connection", async (socket) => {
    const user = socket.handshake.query;

    socket.userID = user._id;
    socket.username = user.username;
    addClientToMap(user._id, socket.id);
    console.log(socket.username, "has connected");
    // Set users status as online
    db.User.findOneAndUpdate({ _id: user._id }, { status: "online" });

    // disconnection
    socket.on("disconnect", () => {
      removeClientFromMap(socket.userID, socket.id);
      console.log(socket.username, "has disconnected");
      // Set users status as online
      db.User.findOneAndUpdate({ _id: user._id }, { status: "offline" });
    });

    // sendMessage
    socket.on("chatMessage", (msg) => {
      // get participants for message
      const participants = [
        ...new Set(msg.participants.map((user) => user._id)),
      ];
      // check these against all users logged on
      const loggedSockets = participants.map((id) => socketUserDict[id]).flat();
      // emit to those users.
      loggedSockets.forEach((socketID) => {
        users.to(socketID).emit("newMessage", msg.msg);
      });
    });
  });
};

// Helper Functions
//=========================
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
