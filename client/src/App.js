import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          {" "}
          <Redirect to="/signup" />
        </Route>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
