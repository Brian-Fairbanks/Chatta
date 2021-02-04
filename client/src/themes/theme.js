import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans", "Arial", "sans-serif"],
    fontSize: 14,
    fontWeight: "600",
    h1: {
      lineHeight: "3em",
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      fontSize: 26,
      textAlign: "center",
      padding: "20%",
      paddingTop: "40px",
      color: "#ffffff",
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },

    h5: {
      fontSize: 16,
      fontWeight: 600,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
    },

    subtitle1: {
      fontSize: 12,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 14,
      color: "#99A9C4",
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14,
      color: "#99A9C4",
    },
    button: {},
  },

  overrides: {
    MuiButton: {
      contained: {
        padding: "16px 53px",
        margin: "0px 30px",
        textTransform: "none",
      },
      text: {
        boxShadow: "0 0 10px rgba(0,0,0,.3)",
        padding: "16px 53px",
        margin: "0px 30px",
        textTransform: "none",
        fontWeight: 600,
      },
    },
  },

  palette: {
    primary: {
      main: "#3A8DFF",
      secondary: "#86B9FF",
      faded: "#99A9C4",
      selfLight: "#F4F6FA",
      selfDark: "#91A3C0",
    },
  },
});
