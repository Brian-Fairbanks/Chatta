import React from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import "./style.css";
export default function UserPaneSplash() {
  return (
    <Box className="splashPane" display={{ xs: "none", md: "block" }}>
      <Box className="content">
        <i className="far fa-comment-dots titleImage"></i>
        <Typography variant="h2">
          Converse with anyone with any language
        </Typography>
      </Box>
    </Box>
  );
}
