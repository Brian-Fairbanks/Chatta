import openSocket from "socket.io-client";
var socket;

export default {
  connect(user) {
    console.log("attempting to open connection to socket.io");
    socket = openSocket.connect("/users");
    socket.emit("setUser", user);
  },
  socketMsg() {
    socket.emit("chatMessage", { content: "test" });
  },
};
