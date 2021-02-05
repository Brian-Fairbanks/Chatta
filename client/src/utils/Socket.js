import openSocket from "socket.io-client";
const socket = openSocket.connect();

export default {
  socketMsg() {
    socket.emit("chatMessage", { content: "test" });
  },
};
