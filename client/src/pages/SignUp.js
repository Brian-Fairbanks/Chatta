import UserPaneSplash from "../components/UserPaneSplash";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
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
  },
});

function SignUp() {
  const classes = useStyles();

  return (
    <Box className="paneWrapper">
      <UserPaneSplash />
      <Box className="contentPane">
        <Box className={classes.container}>
          <span>Already have an account?</span>
          <Link to="/LogIn">
            <Button className={classes.buttonLight}>Login</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
