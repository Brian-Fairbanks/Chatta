import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
// import Loading from './../components/Loading';

const useStyles = makeStyles({
  loadingWrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function ProtectedRoute(props) {
  const { user, isLoading } = useContext(UserContext);
  const { component: Component } = props;
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.loadingWrapper}>
        <CircularProgress size="50vmin" />
      </Box>
    );
  }
  if (user) {
    return <Component />;
  }
  //redirect if there is no user
  return <Redirect to="/login" />;
}

export default ProtectedRoute;
