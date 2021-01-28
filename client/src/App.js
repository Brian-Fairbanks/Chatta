import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
// preserved from starter script, if it is needed in the future.
// import LandingPage from "./pages/Landing";

import "./App.css";
import ChatPage from "./pages/Chat";
import UserAuth from "./components/UserAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import useFindUser from "./components/useFindUser";
import { UserContext } from "./utils/UserContext";

function App() {
  // validate user in the beginning
  const { user, setUser, isLoading } = useFindUser();

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Route exact path="/">
            {" "}
            <Redirect to="/signup" />
          </Route>
          <Route exact path="/signup">
            <UserAuth type="signup" />
          </Route>
          <Route exact path="/login">
            <UserAuth type="login" />{" "}
          </Route>

          <Route path="/chat">
            <ProtectedRoute component={ChatPage} />
          </Route>
        </UserContext.Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
