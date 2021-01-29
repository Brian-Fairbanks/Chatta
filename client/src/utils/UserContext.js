import { createContext } from "react";
export const UserContext = createContext({
  user: "notSet",
  isLoading: "notSet",
});
