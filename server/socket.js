var socketio = require("socket.io");
const db = require("./models");

// keep an array of users online
const socketUserDict = {};

module.exports = {
  // Create instance of socket listener/logic
  Create: function (server) {
    io = socketio(server);

    users = io.of("users");
    users.on("connection", async (socket) => {
      const user = socket.handshake.query;

      socket.userID = user._id;
      socket.username = user.username;
      addClientToMap(user._id, socket.id);
      console.log(socket.username, "has connected");
      // Set users status as online

      // disconnection
      socket.on("disconnect", () => {
        removeClientFromMap(socket.userID, socket.id);
        console.log(socket.username, "has disconnected");
      });
    });
  },

  // sendMessages to all participants of a conversation
  fireMessage: function (msg, toUsers) {
    // get participants for message
    const participants = [...new Set(toUsers.map((user) => user._id))];
    // check these against all users logged on
    const loggedSockets = participants.map((id) => socketUserDict[id]).flat();
    // emit to those users.
    loggedSockets.forEach((socketID) => {
      users.to(socketID).emit("newMessage", msg);
    });
  },

  //return the io instance
  getInstance: function () {
    return io;
  },
};

// Helper Functions
//=========================
async function addClientToMap(userID, socketID) {
  if (socketUserDict[userID]) {
    socketUserDict[userID].push(socketID);
  } else {
    socketUserDict[userID] = [socketID];
  }
  const user = await db.User.findOneAndUpdate(
    { _id: userID },
    { status: "online" },
    { useFindAndModify: false }
  );
}

async function removeClientFromMap(userID, socketID) {
  try {
    socketUserDict[userID] = await socketUserDict[userID].filter(
      (connection) => connection != socketID
    );

    if (socketUserDict[userID].length == 0) {
      // Set users status as online
      const user = await db.User.findOneAndUpdate(
        { _id: userID },
        { status: "offline" },
        { useFindAndModify: false }
      );
    }
  } catch (err) {
    console.error(err);
  }
}
