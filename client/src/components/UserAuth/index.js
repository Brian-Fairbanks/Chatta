import UserPaneSplash from "../UserPaneSplash";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  paneWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },

  contentPane: {
    flexGrow: 1,
    maxHeight: "100vh",
    overflow: "auto"

  },

  pageHeader: {
    fontSize: 14,
    paddingTop: 30,
    color: "#B0B0B0",
    textAlign: "right",
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

function UserAuth(props) {
  const classes = useStyles();

  const {type} = props;
  return (
    <Box className={classes.paneWrapper}>
      <UserPaneSplash />
      <Box className={classes.contentPane}>
        <Box className={classes.pageHeader}>
          <Typography variant="subtitle1">
            {type === "login"? "Don't have an account?":"Already have an account?"}
          </Typography>
          <Link className={classes.noUnderline}
            to={type === "login"? "/signup":"/login"}
            >
            <Button className={classes.buttonLight}>
              {type === "login"? "Create account":"Login"}
            </Button>
          </Link>
        </Box>
        <Box  className={classes.header}>
        {type === "login"? <LoginForm/>:<SignupForm/>}
        </Box>
      </Box>
    </Box>
  );
}

export default UserAuth;
