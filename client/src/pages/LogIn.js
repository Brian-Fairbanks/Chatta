import UserPaneSplash from "../components/UserPaneSplash";
import LoginForm from "../components/LoginForm";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  paneWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },

  contentPane: {
    flexGrow: 1,
  },

  pageHeader: {
    fontSize: 14,
    paddingTop: 30,
    color: "#B0B0B0",
    textAlign: "right",
    fontFamily: "'Open Sans', Arial, sans-serif",
    fontWeight: 500,
  },

  buttonLight: {
    color: "#3A8DFF",
    boxShadow: "0 0 10px rgba(0,0,0,.3)",
    padding: "16px 53px",
    margin: "0px 30px",
    textTransform: "none",
    fontFamily: "'Open Sans', Arial, sans-serif",
    fontWeight: 600,
  },

  noUnderline: {
    textDecoration: "none",
  },

  header: {
    padding: 20,
    paddingTop: 50,
    margin: "auto",
    maxWidth: 380,
  },
});

function LogIn(props) {
  const classes = useStyles();

  return (
    <Box className={classes.paneWrapper}>
      <UserPaneSplash />
      <Box className={classes.contentPane}>
        <Box className={classes.pageHeader}>
          <span>Don't have an account?</span>
          <Link className={classes.noUnderline} to="/SignUp">
            <Button className={classes.buttonLight}>Create account</Button>
          </Link>
        </Box>
        <Box  className={classes.header}>
          <LoginForm/>
        </Box>

      </Box>
    </Box>
  );
}

export default LogIn;
