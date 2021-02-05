import React from "react";
import Box from "@material-ui/core/Box";
import { Typography, makeStyles } from "@material-ui/core";
import bg from "./bg-img.png";

const useStyles = makeStyles((theme) => ({
  splashPane: {
    position: "relative",
    height: "100vh",
    width: "40vw",
    background: `linear-gradient(180deg, rgba(56, 139, 255,.85), rgba(133, 184, 255,.85) ), url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
  },

  content: {
    width: "100%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  titleImage: {
    fontSize: 100,
    color: theme.palette.common.white,
  },
}));

export default function UserPaneSplash() {
  const classes = useStyles();
  return (
    <Box className={classes.splashPane} display={{ xs: "none", md: "block" }}>
      <Box className={classes.content}>
        <i className={`${classes.titleImage} far fa-comment-dots`}></i>
        <Typography variant="h2">
          Converse with anyone with any language
        </Typography>
      </Box>
    </Box>
  );
}
