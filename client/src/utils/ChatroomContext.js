import { createContext } from "react";
export const ChatroomContext = createContext({
  conversation: "no conversation",
  participants: null,
  messages: null,
});
