import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Open Sans', "Arial", "sans-serif"],
    fontSize: 14,
    fontWeight:"600",
    h1: {
      lineHeight:"3em",
      fontFamily: ['Open Sans', "Arial", "sans-serif"],
      fontSize:32,
      fontWeight:700
    },
    h6: {
      fontFamily: ['Open Sans', "Arial", "sans-serif"],
      fontSize:26,
      textAlign: "center",
      padding:"20%",
      paddingTop:"40px",
      color:"#ffffff"
    },
    subtitle1: {
      display:"inline-block"
    }
  },
  palette: {
    primary: { main: "#3A8DFF" }
  }
});
