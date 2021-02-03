import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { theme } from "../../themes/theme";
import { ChatroomContext } from "../../utils/ChatroomContext";

const useStyles = makeStyles({
  shadowBox: {
    boxShadow: "0 0 20px rgba(0,0,0,.4)",
    padding: 20,
    borderRadius: 3,
  },
  test: {
    color: theme.palette.primary.faded,
  },
});

export default function ConversationTitleCard() {
  const classes = useStyles();
  const { conversation } = useContext(ChatroomContext);

  return (
    <Box className={classes.shadowBox}>
      <Grid container direction="row" alignItems="center" flexWrap="nowrap">
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          flexWrap="nowrap"
          xs={11}
        >
          <Typography variant="h5">Conversation Title</Typography>
          <Typography variant="subtitle2">offline</Typography>
        </Grid>
        <Grid item container xs={1} justify="flex-end">
          <i className={`${classes.test} fas fa-ellipsis-h`}></i>
        </Grid>
      </Grid>
    </Box>
  );
}
