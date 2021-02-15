import { useContext } from "react";
import openSocket from "socket.io-client";
import { ChatroomContext } from "./ChatroomContext";

let socket;

export default {
  // connect user to backend sockets
  connect(user) {
    socket = openSocket("/users", { query: user });
    return socket;
  },
};
